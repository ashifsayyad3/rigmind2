"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let CertificatesService = class CertificatesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
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
        const where = {
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
    async findOne(id) {
        const cert = await this.prisma.certificate.findUnique({
            where: { id },
            include: {
                rig: true,
                typeCode: true,
                attachments: { orderBy: { createdAt: 'desc' } },
            },
        });
        if (!cert)
            throw new common_1.NotFoundException(`Certificate ${id} not found`);
        return cert;
    }
    async getExpiryDashboard(rigId) {
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
            this.prisma.$queryRaw `
        SELECT r.name as rigName, COUNT(*) as expiringCount
        FROM certificateAttachments ca
        JOIN certificates c ON c.id = ca.certificateId
        JOIN rigs r ON r.id = c.rigId
        WHERE ca.expiryDate >= GETDATE()
          AND ca.expiryDate <= DATEADD(DAY, 90, GETDATE())
          ${rigId ? (0, library_1.sqltag) `AND c.rigId = ${rigId}` : library_1.empty}
        GROUP BY r.name
        ORDER BY expiringCount DESC
      `,
        ]);
        return { expired, expiring30, expiring60, expiring90, byRig };
    }
};
exports.CertificatesService = CertificatesService;
exports.CertificatesService = CertificatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CertificatesService);
//# sourceMappingURL=certificates.service.js.map