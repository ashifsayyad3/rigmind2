import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ObservationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: {
    rigId?: number;
    status?: string;
    type?: string;
    dateFrom?: Date;
    dateTo?: Date;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const { rigId, status, type, dateFrom, dateTo, search, page = 1, limit = 25 } = filters;

    const where: Prisma.ObservationWhereInput = {
      isRemoved: false,
      ...(rigId && { rigId }),
      ...(status && { status }),
      ...(type && { type }),
      ...(dateFrom || dateTo
        ? { dateOfObservation: { ...(dateFrom && { gte: dateFrom }), ...(dateTo && { lte: dateTo }) } }
        : {}),
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { correctionDescription: { contains: search } },
        ],
      }),
    };

    const [total, items] = await Promise.all([
      this.prisma.observation.count({ where }),
      this.prisma.observation.findMany({
        where,
        include: {
          components: { select: { id: true, uniqueComponentName: true } },
          bops: { select: { id: true, name: true } },
          wells: { select: { id: true, name: true } },
          observationAttachments: { take: 3 },
          observationCommunications: { include: { communication: true }, take: 3 },
          rcmRecommendationObservationLink: {
            include: { rcmRecommendations: true },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { dateOfObservation: 'desc' },
      }),
    ]);

    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const obs = await this.prisma.observation.findFirst({
      where: { id, isRemoved: false },
      include: {
        components: true,
        bops: true,
        wells: true,
        observationAttachments: { include: { attachment: true } },
        observationCommunications: { include: { communication: true } },
        rcmRecommendationObservationLink: { include: { rcmRecommendations: true } },
      },
    });
    if (!obs) throw new NotFoundException(`Observation ${id} not found`);
    return obs;
  }

  async create(data: Prisma.ObservationCreateInput, userId: number) {
    return this.prisma.observation.create({
      data: { ...data, createdById: userId, isRemoved: false },
    });
  }

  async update(id: number, data: Prisma.ObservationUpdateInput, userId: number) {
    await this.findOne(id);
    return this.prisma.observation.update({
      where: { id },
      data: { ...data, updatedById: userId, updatedAt: new Date() },
    });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id);
    return this.prisma.observation.update({
      where: { id },
      data: { isRemoved: true, updatedById: userId, updatedAt: new Date() },
    });
  }

  async getStats() {
    const [total, byStatus, byType, withLinkedRecommendations] = await Promise.all([
      this.prisma.observation.count({ where: { isRemoved: false } }),
      this.prisma.observation.groupBy({
        by: ['status'],
        where: { isRemoved: false },
        _count: { id: true },
      }),
      this.prisma.observation.groupBy({
        by: ['type'],
        where: { isRemoved: false, type: { not: null } },
        _count: { id: true },
      }),
      this.prisma.rcmRecommendationObservationLink.count(),
    ]);
    return { total, byStatus, byType, withLinkedRecommendations };
  }
}
