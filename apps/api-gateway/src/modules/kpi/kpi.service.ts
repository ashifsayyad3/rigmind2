import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class KpiService {
  constructor(private prisma: PrismaService) {}

  async getForRig(rigId: number, take = 12) {
    return this.prisma.kpi.findMany({
      where: { rigId },
      orderBy: { createdAt: 'desc' },
      take,
    });
  }

  async getFleetKpi() {
    return this.prisma.$queryRaw`
      SELECT
        r.name as rigName,
        AVG(k.availability) as avgAvailability,
        AVG(k.utilizationRate) as avgUtilizationRate,
        SUM(k.nptHours) as totalNptHours,
        SUM(k.failureCount) as totalFailures,
        AVG(k.maintenanceCompliance) as avgMaintenanceCompliance
      FROM KPI k
      JOIN rigs r ON r.id = k.rigId
      WHERE k.createdAt >= DATEADD(MONTH, -3, GETDATE())
      GROUP BY r.name
      ORDER BY avgAvailability DESC
    `;
  }

  async upsert(rigId: number, period: string, data: any) {
    return this.prisma.kpi.upsert({
      where: { id: -1 }, // force create via create path
      create: { rigId, period, ...data, createdAt: new Date(), updatedAt: new Date() },
      update: { ...data, updatedAt: new Date() },
    });
  }
}
