import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { sqltag as sql, empty } from '@prisma/client/runtime/library';

@Injectable()
export class CertificatesService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: {
    rigId?: number;
    status?: string;
    expiringInDays?: number;
    typeCodeId?: number;
    page?: number;
    limit?: number;
  }) {
    const { rigId, status, expiringInDays, typeCodeId, page = 1, limit = 25 } = filters;

    const expiryFilter = expiringInDays
      ? {
          attachments: {
            some: {
              expirationDate: {
                lte: new Date(Date.now() + expiringInDays * 24 * 60 * 60 * 1000),
                gte: new Date(),
              },
            },
          },
        }
      : {};

    const where: Prisma.CertificateWhereInput = {
      ...(rigId && { rigId }),
      ...(typeCodeId && { typeCodeId }),
      ...expiryFilter,
    };

    const [total, items] = await Promise.all([
      this.prisma.certificate.count({ where }),
      this.prisma.certificate.findMany({
        where,
        include: {
          rig: { select: { id: true, name: true } },
          typeCode: true,
          attachments: {
            orderBy: { expirationDate: 'desc' },
            take: 3,
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async getExpiringSoon(days = 60) {
    const cutoff = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    // Expiry dates are on CertificateAttachment, not Certificate
    const attachments = await this.prisma.certificateAttachment.findMany({
      where: {
        expirationDate: { gte: new Date(), lte: cutoff },
      },
      include: {
        certificate: {
          include: { rig: { select: { id: true, name: true } }, typeCode: true },
        },
      },
      orderBy: { expirationDate: 'asc' },
      take: 100,
    });
    return attachments;
  }

  async findOne(id: number) {
    const cert = await this.prisma.certificate.findUnique({
      where: { id },
      include: {
        rig: true,
        typeCode: true,
        attachments: { orderBy: { createdAt: 'desc' } },
      },
    });
    if (!cert) throw new NotFoundException(`Certificate ${id} not found`);
    return cert;
  }

  async getExpiryDashboard(rigId?: number) {
    const now = new Date();
    const in30d = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const in60d = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
    const in90d = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

    const baseWhere = rigId ? { certificate: { rigId } } : {};

    const [expired, expiring30, expiring60, expiring90, byRig] = await Promise.all([
      this.prisma.certificateAttachment.count({
        where: { ...baseWhere, expirationDate: { lt: now } },
      }),
      this.prisma.certificateAttachment.count({
        where: { ...baseWhere, expirationDate: { gte: now, lte: in30d } },
      }),
      this.prisma.certificateAttachment.count({
        where: { ...baseWhere, expirationDate: { gte: now, lte: in60d } },
      }),
      this.prisma.certificateAttachment.count({
        where: { ...baseWhere, expirationDate: { gte: now, lte: in90d } },
      }),
      this.prisma.$queryRaw<Array<{ rigName: string; expiringCount: number }>>`
        SELECT r.name as rigName, COUNT(*) as expiringCount
        FROM certificateAttachments ca
        JOIN certificates c ON c.id = ca.certificateId
        JOIN rigs r ON r.id = c.rigId
        WHERE ca.expiryDate >= GETDATE()
          AND ca.expiryDate <= DATEADD(DAY, 90, GETDATE())
          ${rigId ? sql`AND c.rigId = ${rigId}` : empty}
        GROUP BY r.name
        ORDER BY expiringCount DESC
      `,
    ]);

    return { expired, expiring30, expiring60, expiring90, byRig };
  }
}
