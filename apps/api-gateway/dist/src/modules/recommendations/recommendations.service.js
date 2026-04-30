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
exports.RecommendationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let RecommendationsService = class RecommendationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findReports(filters) {
        const { rigId, status, page = 1, limit = 20 } = filters;
        const where = {
            ...(rigId && { rigId }),
            ...(status && { status }),
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
    async findOneReport(id) {
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
                    orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
                },
            },
        });
        if (!report)
            throw new common_1.NotFoundException(`RCM Report ${id} not found`);
        return report;
    }
    async findRecommendations(filters) {
        const { rigId, priority, status, page = 1, limit = 25 } = filters;
        const where = {
            ...(priority && { priority }),
            ...(status && { status }),
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
                orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
            }),
        ]);
        return { items, total, page, limit, pages: Math.ceil(total / limit) };
    }
    async updateRecommendationStatus(id, status, userId) {
        return this.prisma.rcmRecommendation.update({
            where: { id },
            data: { status, updatedAt: new Date() },
        });
    }
    async getStats(rigId) {
        const where = rigId ? { rcmReport: { rigId } } : {};
        const [total, byPriority, byStatus, overdue] = await Promise.all([
            this.prisma.rcmRecommendation.count({ where }),
            this.prisma.rcmRecommendation.groupBy({
                by: ['priority'],
                where,
                _count: { id: true },
            }),
            this.prisma.rcmRecommendation.groupBy({
                by: ['status'],
                where,
                _count: { id: true },
            }),
            this.prisma.rcmRecommendation.count({
                where: {
                    ...where,
                    dueDate: { lt: new Date() },
                    status: { not: 'closed' },
                },
            }),
        ]);
        return { total, byPriority, byStatus, overdue };
    }
};
exports.RecommendationsService = RecommendationsService;
exports.RecommendationsService = RecommendationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecommendationsService);
//# sourceMappingURL=recommendations.service.js.map