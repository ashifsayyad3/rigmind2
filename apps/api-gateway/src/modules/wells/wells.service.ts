import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WellsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: { availability?: string; region?: string; field?: string; page?: number; limit?: number }) {
    const { availability, region, field } = filters;
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 25;
    const where: Prisma.WellWhereInput = {
      isRemoved: false,
      ...(availability && { availability }),
      ...(region && { region: { contains: region } }),
      ...(field && { field: { contains: field } }),
    };
    const [total, items] = await Promise.all([
      this.prisma.well.count({ where }),
      this.prisma.well.findMany({
        where,
        include: {
          rigWellChanges: {
            orderBy: { date: 'desc' },
            take: 1,
            include: { rig: { select: { id: true, name: true } } },
          },
          _count: { select: { rigWellChanges: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: 'asc' },
      }),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const well = await this.prisma.well.findFirst({
      where: { id, isRemoved: false },
      include: {
        rigWellChanges: { orderBy: { date: 'desc' }, take: 5, include: { rig: true } },
        wellSessions: { orderBy: { wellSessionStartDate: 'desc' }, take: 5 },
      },
    });
    if (!well) throw new NotFoundException(`Well ${id} not found`);
    return well;
  }
}
