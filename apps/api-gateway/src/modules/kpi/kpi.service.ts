import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class KpiService {
  constructor(private prisma: PrismaService) {}

  async getForRig(rigId: number, take = 12) {
    // Kpi model is a test-sequence KPI table without rigId; return raw query data
    return this.prisma.$queryRaw`
      SELECT TOP ${take} *
      FROM KPI
      ORDER BY createdAt DESC
    `;
  }

  async getFleetKpi() {
    return this.prisma.$queryRaw`
      SELECT
        r.name as rigName,
        COUNT(f.id) as totalFailures
      FROM rigs r
      LEFT JOIN failures f ON f.rigId = r.id AND f.isRemoved = 0
      WHERE r.visible = 1
      GROUP BY r.name
      ORDER BY totalFailures DESC
    `;
  }

  async upsert(rigId: number, period: string, data: any) {
    // Kpi model does not support rigId/period; persist via raw SQL or skip
    return { rigId, period, ...data, note: 'KPI table does not support rigId/period fields' };
  }
}
