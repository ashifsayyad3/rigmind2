import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

export interface RigHealthScore {
  rigId: number;
  rigName: string;
  overallScore: number;
  componentHealth: number;
  maintenanceCompliance: number;
  certificationStatus: number;
  failureFrequency: number;
  nptScore: number;
  openFailures: number;
  openMaintenance: number;
  expiringCerts: number;
  nptHoursLast30d: number;
  trend: 'improving' | 'stable' | 'degrading';
}

@Injectable()
export class FleetService {
  constructor(private prisma: PrismaService) {}

  async getFleetHealthMetrics(): Promise<{
    overallFleetScore: number;
    rigsOnline: number;
    rigsTotal: number;
    criticalFailures: number;
    expiringCerts: number;
    nptHoursMonth: number;
    avgAvailability: number;
  }> {
    const [rigsTotal, rigsOnline, criticalFailures, expiringCerts, nptResult, kpiResult] =
      await Promise.all([
        this.prisma.rig.count({ where: { visible: true } }),
        this.prisma.rig.count({ where: { visible: true, status: { contains: 'active' } } }),
        this.prisma.failure.count({
          where: { isRemoved: false, severity: 'critical', status: { not: 'closed' } },
        }),
        this.prisma.certificateAttachment.count({
          where: {
            expirationDate: {
              gte: new Date(),
              lte: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            },
          },
        }),
        this.prisma.$queryRaw<[{ totalHours: number }]>`
          SELECT ISNULL(SUM(CAST(nptHours AS FLOAT)), 0) as totalHours
          FROM nonProductionTimes
          WHERE isRemoved = 0 AND dateOfNPT >= DATEADD(MONTH, -1, GETDATE())
        `,
        this.prisma.$queryRaw<[{ avgAvailability: number }]>`
          SELECT AVG(availability) as avgAvailability
          FROM KPI
          WHERE createdAt >= DATEADD(MONTH, -1, GETDATE())
        `,
      ]);

    const fleetScore = this.calculateFleetScore(criticalFailures, expiringCerts, rigsTotal);

    return {
      overallFleetScore: fleetScore,
      rigsOnline,
      rigsTotal,
      criticalFailures,
      expiringCerts,
      nptHoursMonth: nptResult[0]?.totalHours ?? 0,
      avgAvailability: kpiResult[0]?.avgAvailability ?? 0,
    };
  }

  private calculateFleetScore(criticalFailures: number, expiringCerts: number, rigsTotal: number) {
    let score = 100;
    score -= Math.min(criticalFailures * 5, 30);
    score -= Math.min(expiringCerts * 1, 20);
    return Math.max(score, 0);
  }

  async getRigHealthScores(accessibleRigIds: number[] | null): Promise<RigHealthScore[]> {
    const where: Prisma.RigWhereInput = {
      visible: true,
      ...(accessibleRigIds && { id: { in: accessibleRigIds } }),
    };

    const rigs = await this.prisma.rig.findMany({
      where,
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    });

    const scores = await Promise.all(rigs.map((rig) => this.scoreRig(rig)));
    return scores;
  }

  private async scoreRig(rig: { id: number; name: string }): Promise<RigHealthScore> {
    const [openFailures, openMaintenance, expiringCerts, nptResult, kpi] = await Promise.all([
      this.prisma.failure.count({
        where: { rigId: rig.id, isRemoved: false, status: { not: 'closed' } },
      }),
      this.prisma.deferredMaintenanceTask.count({
        where: { rigId: rig.id, isRemoved: false },
      }),
      this.prisma.certificateAttachment.count({
        where: {
          certificate: { rigId: rig.id },
          expirationDate: { gte: new Date(), lte: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) },
        },
      }),
      this.prisma.$queryRaw<[{ totalHours: number }]>`
        SELECT ISNULL(SUM(CAST(nptHours AS FLOAT)), 0) as totalHours
        FROM nonProductionTimes
        WHERE rigId = ${rig.id} AND isRemoved = 0
          AND dateOfNPT >= DATEADD(DAY, -30, GETDATE())
      `,
      this.prisma.kpi.findFirst({
        where: { rigId: rig.id },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const nptHours = nptResult[0]?.totalHours ?? 0;

    // Weighted scoring: failures(30%), maintenance(25%), certs(15%), NPT(20%), availability(10%)
    const failureScore = Math.max(100 - openFailures * 10, 0) * 0.30;
    const maintenanceScore = Math.max(100 - openMaintenance * 8, 0) * 0.25;
    const certScore = Math.max(100 - expiringCerts * 5, 0) * 0.15;
    const nptScore = Math.max(100 - nptHours * 2, 0) * 0.20;
    const availabilityScore = (kpi?.availability ?? 80) * 0.10;

    const overallScore = Math.round(failureScore + maintenanceScore + certScore + nptScore + availabilityScore);

    return {
      rigId: rig.id,
      rigName: rig.name ?? '',
      overallScore,
      componentHealth: Math.round(failureScore / 0.30),
      maintenanceCompliance: Math.round(maintenanceScore / 0.25),
      certificationStatus: Math.round(certScore / 0.15),
      failureFrequency: Math.round(failureScore / 0.30),
      nptScore: Math.round(nptScore / 0.20),
      openFailures,
      openMaintenance,
      expiringCerts,
      nptHoursLast30d: nptHours,
      trend: overallScore >= 75 ? 'stable' : overallScore >= 60 ? 'degrading' : 'degrading',
    };
  }
}
