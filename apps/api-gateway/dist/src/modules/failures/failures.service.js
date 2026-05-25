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
var FailuresService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailuresService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let FailuresService = FailuresService_1 = class FailuresService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(FailuresService_1.name);
    }
    async findAll(filters, userId, accessibleRigIds) {
        const { rigId, severity, status, failureType, equipmentType, isNPT, dateFrom, dateTo, search, page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc', } = filters;
        const where = {
            isRemoved: false,
            ...(accessibleRigIds && { rigId: { in: accessibleRigIds } }),
            ...(rigId && { rigId }),
            ...(severity && { severity }),
            ...(status && { status }),
            ...(failureType && { failureType }),
            ...(equipmentType && { equipmentType }),
            ...(dateFrom || dateTo
                ? { dateOfFailure: { ...(dateFrom && { gte: dateFrom }), ...(dateTo && { lte: dateTo }) } }
                : {}),
            ...(search && {
                OR: [
                    { description: { contains: search } },
                    { cause: { contains: search } },
                ],
            }),
        };
        const [total, items] = await Promise.all([
            this.prisma.failure.count({ where }),
            this.prisma.failure.findMany({
                where,
                include: {
                    rig: { select: { id: true, name: true } },
                    failureMode: true,
                    correctiveActions: { take: 5 },
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            }),
        ]);
        return {
            items,
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const failure = await this.prisma.failure.findFirst({
            where: { id, isRemoved: false },
            include: {
                rig: true,
                failureMode: true,
                correctiveActions: true,
                failureAttachments: { include: { attachment: true } },
                lessonsLearned: true,
                rcmRecommendationFailureLink: { include: { rcmRecommendations: true } },
            },
        });
        if (!failure)
            throw new common_1.NotFoundException(`Failure ${id} not found`);
        return failure;
    }
    async create(data, userId) {
        const failure = await this.prisma.failure.create({
            data: { ...data, createdById: userId, updatedById: userId, isRemoved: false },
            include: { rig: true, failureMode: true },
        });
        this.logger.log(`Failure created: ${failure.id} by user ${userId}`);
        return failure;
    }
    async update(id, data, userId) {
        await this.findOne(id);
        return this.prisma.failure.update({
            where: { id },
            data: { ...data, updatedById: userId, updatedAt: new Date() },
            include: { rig: true, failureMode: true },
        });
    }
    async remove(id, userId) {
        await this.findOne(id);
        return this.prisma.failure.update({
            where: { id },
            data: { isRemoved: true, updatedById: userId, updatedAt: new Date() },
        });
    }
    async getStats(rigId) {
        const where = {
            isRemoved: false,
            ...(rigId && { rigId }),
        };
        const [total, bySeverity, byStatus, byEquipment, recentTrend] = await Promise.all([
            this.prisma.failure.count({ where }),
            this.prisma.failure.groupBy({
                by: ['severity'],
                where,
                _count: { id: true },
            }),
            this.prisma.failure.groupBy({
                by: ['status'],
                where,
                _count: { id: true },
            }),
            this.prisma.failure.groupBy({
                by: ['equipmentType'],
                where: { ...where, equipmentType: { not: null } },
                _count: { id: true },
                orderBy: { _count: { id: 'desc' } },
                take: 10,
            }),
            this.prisma.$queryRaw `
        SELECT
          FORMAT(dateOfFailure, 'yyyy-MM') as month,
          COUNT(*) as count
        FROM failures
        WHERE isRemoved = 0
          AND dateOfFailure >= DATEADD(MONTH, -12, GETDATE())
          ${rigId ? (0, library_1.sqltag) `AND rigId = ${rigId}` : library_1.empty}
        GROUP BY FORMAT(dateOfFailure, 'yyyy-MM')
        ORDER BY month ASC
      `,
        ]);
        return { total, bySeverity, byStatus, byEquipment, recentTrend };
    }
    async getSimilarFailures(id) {
        const failure = await this.findOne(id);
        return this.prisma.failure.findMany({
            where: {
                isRemoved: false,
                id: { not: id },
                failureModeId: failure.failureModeId ?? undefined,
                componentId: failure.componentId ?? undefined,
            },
            include: { rig: true, failureMode: true },
            take: 5,
        });
    }
    async getTimeline(id) {
        const failure = await this.findOne(id);
        const [correctiveActions, nptEntries] = await Promise.all([
            this.prisma.correctiveAction.findMany({
                where: { failureId: id },
                orderBy: { createdAt: 'asc' },
            }),
            this.prisma.nonProductionTime.findMany({
                where: { sourceType: 'failure', sourceId: id },
            }),
        ]);
        const observations = [];
        const communications = [];
        return {
            failure,
            timeline: [
                { type: 'created', date: failure.createdAt, data: failure },
                ...observations.map((o) => ({ type: 'observation', date: o.createdAt, data: o })),
                ...correctiveActions.map((ca) => ({ type: 'corrective_action', date: ca.createdAt, data: ca })),
                ...communications.map((c) => ({ type: 'communication', date: c.createdAt, data: c })),
            ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
            nptHours: nptEntries.reduce((sum, n) => sum + parseFloat(n.nptHours ?? '0'), 0),
        };
    }
};
exports.FailuresService = FailuresService;
exports.FailuresService = FailuresService = FailuresService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FailuresService);
//# sourceMappingURL=failures.service.js.map