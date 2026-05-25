import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BopService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: { rigId?: number; type?: string; page?: number; limit?: number }) {
    const { rigId, page = 1, limit = 20 } = filters;
    const where: any = {
      ...(rigId && {
        OR: [
          { rigs_rigs_bop1IdTobops: { some: { id: rigId } } },
          { rigs_rigs_bop2IdTobops: { some: { id: rigId } } },
        ],
      }),
    };
    const [total, items] = await Promise.all([
      this.prisma.bop.count({ where }),
      this.prisma.bop.findMany({
        where,
        include: {
          _count: { select: { bopEvents: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);
    return { items, total, page, limit };
  }

  async getEvents(rigId?: number, bopId?: number, take = 50) {
    return this.prisma.bopEvent.findMany({
      where: {
        ...(bopId && { bopId }),
      },
      include: {
        bop: { select: { id: true } },
      },
      orderBy: { createdAt: 'desc' },
      take,
    });
  }

  async getChanges(bopId?: number, take = 20) {
    return this.prisma.bopChange.findMany({
      where: { ...(bopId && { bopId }) },
      include: {
        bop: { select: { id: true } },
      },
      orderBy: { createdAt: 'desc' },
      take,
    });
  }

  async getActiveAssignments(rigId?: number) {
    return this.prisma.activeBOPAssignment.findMany({
      where: { ...(rigId && { rigId }) },
      include: {
        rig: { select: { id: true, name: true } },
      },
    });
  }
}
