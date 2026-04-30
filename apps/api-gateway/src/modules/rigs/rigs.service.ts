import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RigsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: {
    status?: string;
    isRTM?: boolean;
    onContract?: boolean;
    category?: string;
    operatorId?: number;
    page?: number;
    limit?: number;
  }, accessibleRigIds: number[] | null) {
    const { status, isRTM, onContract, category, operatorId, page = 1, limit = 50 } = filters;

    const where: Prisma.RigWhereInput = {
      visible: true,
      ...(accessibleRigIds && { id: { in: accessibleRigIds } }),
      ...(status && { status }),
      ...(typeof isRTM === 'boolean' && { isRTM }),
      ...(typeof onContract === 'boolean' && { onContract }),
      ...(category && { category }),
      ...(operatorId && { operatorId }),
    };

    const [total, items] = await Promise.all([
      this.prisma.rig.count({ where }),
      this.prisma.rig.findMany({
        where,
        include: {
          bops_rigs_bop1IdTobops: { select: { id: true, name: true, type: true } },
          bops_rigs_bop2IdTobops: { select: { id: true, name: true, type: true } },
          activeBOPAssignments: {
            include: { bop: true },
            where: { isActive: true },
          },
          _count: {
            select: {
              failures: { where: { isRemoved: false, status: { not: 'closed' } } },
              deferredMaintenanceTasks: { where: { isRemoved: false } },
              certificates: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: 'asc' },
      }),
    ]);

    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const rig = await this.prisma.rig.findUnique({
      where: { id },
      include: {
        bops_rigs_bop1IdTobops: true,
        bops_rigs_bop2IdTobops: true,
        activeBOPAssignments: { include: { bop: true } },
        userRigs: { include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } } },
        rigLandings: { take: 10, orderBy: { createdAt: 'desc' } },
        rigFeatures: { include: { feature: true } },
        rigCertificateComponents: { take: 20 },
        kpis: { take: 12, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!rig) throw new NotFoundException(`Rig ${id} not found`);
    return rig;
  }

  async update(id: number, data: Prisma.RigUpdateInput, userId: number) {
    await this.findOne(id);
    return this.prisma.rig.update({
      where: { id },
      data: { ...data, updatedById: userId, updatedAt: new Date() },
    });
  }

  async getHealthSnapshot(id: number) {
    const [failureCount, openMaintenance, expiringCerts, nptHoursLast30d] = await Promise.all([
      this.prisma.failure.count({
        where: { rigId: id, isRemoved: false, status: { not: 'closed' } },
      }),
      this.prisma.deferredMaintenanceTask.count({
        where: { rigId: id, isRemoved: false },
      }),
      this.prisma.certificateAttachment.count({
        where: {
          certificate: { rigId: id },
          expirationDate: {
            lte: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            gte: new Date(),
          },
        },
      }),
      this.prisma.$queryRaw<[{ totalNptHours: number }]>`
        SELECT ISNULL(SUM(CAST(nptHours AS FLOAT)), 0) as totalNptHours
        FROM nonProductionTimes
        WHERE rigId = ${id}
          AND isRemoved = 0
          AND dateOfNPT >= DATEADD(DAY, -30, GETDATE())
      `,
    ]);

    const kpi = await this.prisma.kpi.findFirst({
      where: { rigId: id },
      orderBy: { createdAt: 'desc' },
    });

    return {
      rigId: id,
      openFailures: failureCount,
      openMaintenanceTasks: openMaintenance,
      expiringCertificates: expiringCerts,
      nptHoursLast30d: nptHoursLast30d[0]?.totalNptHours ?? 0,
      availability: kpi?.availability ?? null,
      utilizationRate: kpi?.utilizationRate ?? null,
      updatedAt: new Date(),
    };
  }

  async getCurrentWell(rigId: number) {
    return this.prisma.$queryRaw`
      SELECT TOP 1 w.*, rwc.date as wellChangeDate
      FROM rigWellChanges rwc
      JOIN wells w ON w.id = rwc.wellId
      WHERE rwc.rigId = ${rigId}
      ORDER BY rwc.date DESC
    `;
  }

  async getStatusHistory(rigId: number, take = 20) {
    return this.prisma.rigStatusChange.findMany({
      where: { rigId },
      orderBy: { createdAt: 'desc' },
      take,
    });
  }
}
