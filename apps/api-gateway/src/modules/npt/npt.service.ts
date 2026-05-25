import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { sqltag as sql, empty } from '@prisma/client/runtime/library';

@Injectable()
export class NptService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: {
    rigId?: number;
    bopType?: string;
    nptType?: string;
    delayCategory?: string;
    dateFrom?: Date;
    dateTo?: Date;
    availability?: string;
    page?: number;
    limit?: number;
  }) {
    const { rigId, bopType, nptType, delayCategory, dateFrom, dateTo, availability, page = 1, limit = 25 } = filters;

    const where: Prisma.NonProductionTimeWhereInput = {
      isRemoved: false,
      ...(rigId && { rigId }),
      ...(bopType && { bopType }),
      ...(nptType && { nptType }),
      ...(delayCategory && { delayCategory }),
      ...(availability && { availability }),
      ...(dateFrom || dateTo
        ? { dateOfNPT: { ...(dateFrom && { gte: dateFrom }), ...(dateTo && { lte: dateTo }) } }
        : {}),
    };

    const [total, items] = await Promise.all([
      this.prisma.nonProductionTime.count({ where }),
      this.prisma.nonProductionTime.findMany({
        where,
        include: {
          rig: { select: { id: true, name: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { dateOfNPT: 'desc' },
      }),
    ]);

    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async getAnalytics(rigId?: number) {
    const whereBase = rigId ? sql`AND rigId = ${rigId}` : empty;

    const [byCategory, byRig, monthlyTrend, totalStats] = await Promise.all([
      // NPT hours by delay category
      this.prisma.$queryRaw<Array<{ delayCategory: string; totalHours: number; count: number }>>`
        SELECT
          ISNULL(delayCategory, 'Uncategorized') as delayCategory,
          SUM(CAST(nptHours AS FLOAT)) as totalHours,
          COUNT(*) as count
        FROM nonProductionTimes
        WHERE isRemoved = 0 ${whereBase}
        GROUP BY delayCategory
        ORDER BY totalHours DESC
      `,
      // NPT hours by rig
      this.prisma.$queryRaw<Array<{ rigName: string; totalHours: number; eventCount: number }>>`
        SELECT
          r.name as rigName,
          SUM(CAST(n.nptHours AS FLOAT)) as totalHours,
          COUNT(*) as eventCount
        FROM nonProductionTimes n
        JOIN rigs r ON r.id = n.rigId
        WHERE n.isRemoved = 0 ${whereBase}
        GROUP BY r.name
        ORDER BY totalHours DESC
      `,
      // Monthly trend last 12 months
      this.prisma.$queryRaw<Array<{ month: string; totalHours: number; count: number }>>`
        SELECT
          FORMAT(dateOfNPT, 'yyyy-MM') as month,
          SUM(CAST(nptHours AS FLOAT)) as totalHours,
          COUNT(*) as count
        FROM nonProductionTimes
        WHERE isRemoved = 0
          AND dateOfNPT >= DATEADD(MONTH, -12, GETDATE())
          ${whereBase}
        GROUP BY FORMAT(dateOfNPT, 'yyyy-MM')
        ORDER BY month ASC
      `,
      // Overall stats
      this.prisma.$queryRaw<[{ totalHours: number; avgHours: number; eventCount: number }]>`
        SELECT
          SUM(CAST(nptHours AS FLOAT)) as totalHours,
          AVG(CAST(nptHours AS FLOAT)) as avgHours,
          COUNT(*) as eventCount
        FROM nonProductionTimes
        WHERE isRemoved = 0 ${whereBase}
      `,
    ]);

    return {
      totalNptHours: totalStats[0]?.totalHours ?? 0,
      avgNptHours: totalStats[0]?.avgHours ?? 0,
      totalEvents: totalStats[0]?.eventCount ?? 0,
      byCategory,
      byRig,
      monthlyTrend,
    };
  }

  async getSummary(rigId?: number, startDate?: string, endDate?: string) {
    const where: Prisma.NonProductionTimeWhereInput = {
      isRemoved: false,
      ...(rigId && { rigId }),
      ...(startDate && { dateOfNPT: { gte: new Date(startDate) } }),
      ...(endDate && { dateOfNPT: { lte: new Date(endDate) } }),
    };
    const [total, raw] = await Promise.all([
      this.prisma.nonProductionTime.count({ where }),
      this.prisma.$queryRawUnsafe<[{ totalHours: number }]>(
        `SELECT ISNULL(SUM(CAST(nptHours AS FLOAT)), 0) as totalHours FROM nonProductionTimes WHERE isRemoved = 0${rigId ? ` AND rigId = ${rigId}` : ''}`
      ).catch(() => [{ totalHours: 0 }]),
    ]);
    return { total, totalHours: Number(raw[0]?.totalHours ?? 0), totalCost: 0 };
  }

  async getTrend(rigId?: number, months = 6): Promise<Array<{ month: string; hours: number; cost: number }>> {
    const sql = `SELECT FORMAT(dateOfNPT, 'yyyy-MM') as month, ISNULL(SUM(CAST(nptHours AS FLOAT)), 0) as hours FROM nonProductionTimes WHERE isRemoved = 0 AND dateOfNPT >= DATEADD(MONTH, -${Number(months)}, GETDATE())${rigId ? ` AND rigId = ${Number(rigId)}` : ''} GROUP BY FORMAT(dateOfNPT, 'yyyy-MM') ORDER BY month ASC`;
    const result = await this.prisma.$queryRawUnsafe<Array<Record<string, unknown>>>(sql).catch(() => []);
    return result.map(r => ({ month: String(r['month'] ?? ''), hours: Number(r['hours'] ?? 0), cost: 0 }));
  }

  async getByCategory(): Promise<Array<{ category: string; hours: number; pct: number }>> {
    type Row = { category: string; hours: unknown };
    const rows: Row[] = await this.prisma.$queryRawUnsafe<Row[]>(
      `SELECT ISNULL(delayCategory, 'Uncategorized') as category, ISNULL(SUM(CAST(nptHours AS FLOAT)), 0) as hours FROM nonProductionTimes WHERE isRemoved = 0 GROUP BY delayCategory ORDER BY hours DESC`
    ).catch((): Row[] => []);
    const totalHours = rows.reduce((s, r) => s + Number(r.hours ?? 0), 0) || 1;
    return rows.map(r => ({
      category: String(r.category ?? ''),
      hours: Number(r.hours ?? 0),
      pct: Math.round((Number(r.hours ?? 0) / totalHours) * 100),
    }));
  }

  async getMoaDelays(filters: { rigId?: number; page?: number; limit?: number }) {
    const { rigId, page = 1, limit = 20 } = filters;
    const where: Prisma.MoaDelayWhereInput = { ...(rigId && { moa: { rigId } }) };

    const [total, items] = await Promise.all([
      this.prisma.moaDelay.count({ where }),
      this.prisma.moaDelay.findMany({
        where,
        include: { moa: { include: { rig: true } } },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { items, total, page, limit };
  }
}
