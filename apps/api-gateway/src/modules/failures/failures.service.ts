import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { sqltag as sql, empty } from '@prisma/client/runtime/library';

export interface FailureFilterDto {
  rigId?: number;
  severity?: string;
  status?: string;
  failureType?: string;
  equipmentType?: string;
  isNPT?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

@Injectable()
export class FailuresService {
  private readonly logger = new Logger(FailuresService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(filters: FailureFilterDto, userId: number, accessibleRigIds: number[] | null) {
    const {
      rigId, severity, status, failureType, equipmentType, isNPT,
      dateFrom, dateTo, search,
      page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc',
    } = filters;

    const where: Prisma.FailureWhereInput = {
      isRemoved: false,
      ...(accessibleRigIds && { rigId: { in: accessibleRigIds } }),
      ...(rigId && { rigId }),
      ...(severity && { severity }),
      ...(status && { status }),
      ...(failureType && { failureType }),
      ...(equipmentType && { equipmentType }),
      ...(dateFrom || dateTo
        ? { dateOfFailure: { ...(dateFrom && { gte: dateFrom }), ...(dateTo && { lte: dateTo }) } }
        : {}),
      ...(search && {
        OR: [
          { description: { contains: search } },
          { cause: { contains: search } },
        ],
      }),
    };

    const [total, items] = await Promise.all([
      this.prisma.failure.count({ where }),
      this.prisma.failure.findMany({
        where,
        include: {
          rig: { select: { id: true, name: true } },
          failureMode: true,
          correctiveActions: { take: 5 },
          failureObservations: { take: 3 },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const failure = await this.prisma.failure.findFirst({
      where: { id, isRemoved: false },
      include: {
        rig: true,
        failureMode: true,
        correctiveActions: true,
        failureObservations: true,
        failureCommunications: { include: { communication: true } },
        failureAttachments: { include: { attachment: true } },
        linkedFailures1: true,
        linkedFailures2: true,
        lessonsLearned: true,
        rcmRecommendationFailureLink: { include: { rcmRecommendations: true } },
      },
    });
    if (!failure) throw new NotFoundException(`Failure ${id} not found`);
    return failure;
  }

  async create(data: Prisma.FailureCreateInput, userId: number) {
    const failure = await this.prisma.failure.create({
      data: { ...data, createdById: userId, updatedById: userId, isRemoved: false },
      include: { rig: true, failureMode: true },
    });
    this.logger.log(`Failure created: ${failure.id} by user ${userId}`);
    return failure;
  }

  async update(id: number, data: Prisma.FailureUpdateInput, userId: number) {
    await this.findOne(id);
    return this.prisma.failure.update({
      where: { id },
      data: { ...data, updatedById: userId, updatedAt: new Date() },
      include: { rig: true, failureMode: true },
    });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id);
    return this.prisma.failure.update({
      where: { id },
      data: { isRemoved: true, updatedById: userId, updatedAt: new Date() },
    });
  }

  async getStats(rigId?: number) {
    const where: Prisma.FailureWhereInput = {
      isRemoved: false,
      ...(rigId && { rigId }),
    };

    const [total, bySeverity, byStatus, byEquipment, recentTrend] = await Promise.all([
      this.prisma.failure.count({ where }),
      this.prisma.failure.groupBy({
        by: ['severity'],
        where,
        _count: { id: true },
      }),
      this.prisma.failure.groupBy({
        by: ['status'],
        where,
        _count: { id: true },
      }),
      this.prisma.failure.groupBy({
        by: ['equipmentType'],
        where: { ...where, equipmentType: { not: null } },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10,
      }),
      // Last 12 months trend
      this.prisma.$queryRaw<Array<{ month: string; count: number }>>`
        SELECT
          FORMAT(dateOfFailure, 'yyyy-MM') as month,
          COUNT(*) as count
        FROM failures
        WHERE isRemoved = 0
          AND dateOfFailure >= DATEADD(MONTH, -12, GETDATE())
          ${rigId ? sql`AND rigId = ${rigId}` : empty}
        GROUP BY FORMAT(dateOfFailure, 'yyyy-MM')
        ORDER BY month ASC
      `,
    ]);

    return { total, bySeverity, byStatus, byEquipment, recentTrend };
  }

  async getSimilarFailures(id: number) {
    const failure = await this.findOne(id);
    return this.prisma.failure.findMany({
      where: {
        isRemoved: false,
        id: { not: id },
        failureModeId: failure.failureModeId ?? undefined,
        componentId: failure.componentId ?? undefined,
      },
      include: { rig: true, failureMode: true },
      take: 5,
    });
  }

  async getTimeline(id: number) {
    const failure = await this.findOne(id);
    const [observations, correctiveActions, communications, nptEntries] = await Promise.all([
      this.prisma.failureObservation.findMany({
        where: { failureId: id },
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.correctiveAction.findMany({
        where: { failureId: id },
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.failureCommunication.findMany({
        where: { failureId: id },
        include: { communication: true },
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.nonProductionTime.findMany({
        where: { sourceType: 'failure', sourceId: id },
      }),
    ]);

    return {
      failure,
      timeline: [
        { type: 'created', date: failure.createdAt, data: failure },
        ...observations.map((o: any) => ({ type: 'observation', date: o.createdAt, data: o })),
        ...correctiveActions.map((ca: any) => ({ type: 'corrective_action', date: ca.createdAt, data: ca })),
        ...communications.map((c: any) => ({ type: 'communication', date: c.createdAt, data: c })),
      ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
      nptHours: nptEntries.reduce((sum: number, n: any) => sum + parseFloat(n.nptHours ?? '0'), 0),
    };
  }
}
