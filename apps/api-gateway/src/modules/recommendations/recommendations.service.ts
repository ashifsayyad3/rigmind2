import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RecommendationsService {
  constructor(private prisma: PrismaService) {}

  async findReports(filters: { rigId?: number; status?: string; page?: number; limit?: number }) {
    const { rigId, page = 1, limit = 20 } = filters;
    const where: Prisma.RcmReportWhereInput = {
      ...(rigId && { rigId }),
    };
    const [total, items] = await Promise.all([
      this.prisma.rcmReport.count({ where }),
      this.prisma.rcmReport.findMany({
        where,
        include: {
          rig: { select: { id: true, name: true } },
          recommendations: {
            include: {
              rcmRecommendationFailureLink: { include: { failures: true } },
              rcmRecommendationObservationLink: { include: { observations: true } },
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOneReport(id: number) {
    const report = await this.prisma.rcmReport.findUnique({
      where: { id },
      include: {
        rig: true,
        recommendations: {
          include: {
            rcmRecommendationFailureLink: {
              include: { failures: true },
            },
            rcmRecommendationObservationLink: { include: { observations: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!report) throw new NotFoundException(`RCM Report ${id} not found`);
    return report;
  }

  async findRecommendations(filters: {
    rigId?: number;
    priority?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const { rigId, page = 1, limit = 25 } = filters;
    // status is Boolean? in schema: null=pending, true=communicated, false=closed
    const where: Prisma.RcmRecommendationWhereInput = {
      ...(rigId && { rcmReport: { rigId } }),
    };
    const [total, items] = await Promise.all([
      this.prisma.rcmRecommendation.count({ where }),
      this.prisma.rcmRecommendation.findMany({
        where,
        include: {
          rcmReport: { include: { rig: { select: { id: true, name: true } } } },
          rcmRecommendationFailureLink: { include: { failures: true } },
          rcmRecommendationObservationLink: { include: { observations: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async updateRecommendationStatus(id: number, status: string, userId: number) {
    // Map string status to Boolean?: 'communicated' -> true, 'closed' -> false, else null
    const boolStatus: boolean | null =
      status === 'communicated' ? true : status === 'closed' ? false : null;
    return this.prisma.rcmRecommendation.update({
      where: { id },
      data: { status: boolStatus, updatedAt: new Date() },
    });
  }

  async getStats(rigId?: number) {
    const where = rigId ? { rcmReport: { rigId } } : {};
    const [total, byCommunicated] = await Promise.all([
      this.prisma.rcmRecommendation.count({ where }),
      this.prisma.rcmRecommendation.groupBy({
        by: ['status'],
        where,
        _count: { id: true },
      }),
    ]);
    return { total, byCommunicated };
  }
}
