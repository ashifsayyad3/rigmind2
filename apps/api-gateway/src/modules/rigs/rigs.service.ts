import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RigsService {
  private readonly logger = new Logger(RigsService.name);
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
        select: {
          id: true,
          name: true,
          status: true,
          onContract: true,
          isRTM: true,
          category: true,
          operatorId: true,
          createdAt: true,
          updatedAt: true,
          bops_rigs_bop1IdTobops: { select: { id: true } },
          bops_rigs_bop2IdTobops: { select: { id: true } },
          _count: {
            select: {
              failures: true,
              deferredMaintenanceTasks: true,
              certificates: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: 'asc' },
      }),
    ]).catch((err) => {
      this.logger.error(`findAll query failed: ${err.message}`, err.stack);
      throw err;
    });

    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const rig = await this.prisma.rig.findUnique({
      where: { id },
      include: {
        bops_rigs_bop1IdTobops: true,
        bops_rigs_bop2IdTobops: true,
        activeBOPAssignments: true,
        userRigs: { include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } } },
        rigLandings: { take: 10, orderBy: { createdAt: 'desc' } },
        rigFeatures: { include: { feature: true } },
        rigCertificateComponents: { take: 20 },
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

    return {
      rigId: id,
      openFailures: failureCount,
      openMaintenanceTasks: openMaintenance,
      expiringCertificates: expiringCerts,
      nptHoursLast30d: nptHoursLast30d[0]?.totalNptHours ?? 0,
      availability: null,
      utilizationRate: null,
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
