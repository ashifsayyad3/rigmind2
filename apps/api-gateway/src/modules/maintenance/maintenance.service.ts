import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) {}

  async getDeferredTasks(filters: { rigId?: number; page?: number; limit?: number }) {
    const { rigId, page = 1, limit = 25 } = filters;
    const where: Prisma.DeferredMaintenanceTaskWhereInput = {
      isRemoved: false,
      ...(rigId && { rigId }),
    };
    const [total, items] = await Promise.all([
      this.prisma.deferredMaintenanceTask.count({ where }),
      this.prisma.deferredMaintenanceTask.findMany({
        where,
        include: {
          rig: { select: { id: true, name: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async getMaintenanceHistory(rigId: number, take = 20) {
    return this.prisma.componentMaintainanceHistory.findMany({
      where: { rigId },
      orderBy: { lastMaintainenceDate: 'desc' },
      take,
    });
  }

  async closeDeferredTask(id: number, userId: number) {
    return this.prisma.deferredMaintenanceTask.update({
      where: { id },
      data: { isRemoved: true, updatedAt: new Date() },
    });
  }

  async getStats(rigId?: number) {
    const where: Prisma.DeferredMaintenanceTaskWhereInput = {
      isRemoved: false,
      ...(rigId && { rigId }),
    };
    const [total, byRig] = await Promise.all([
      this.prisma.deferredMaintenanceTask.count({ where }),
      this.prisma.deferredMaintenanceTask.groupBy({
        by: ['rigId'],
        where: { isRemoved: false },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10,
      }),
    ]);
    return { totalDeferred: total, byRig };
  }
}
