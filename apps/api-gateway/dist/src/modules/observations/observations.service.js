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
exports.ObservationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ObservationsService = class ObservationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
        const { rigId: _rigId, status, type, dateFrom, dateTo, search, page = 1, limit = 25 } = filters;
        const where = {
            isRemoved: false,
            ...(status && { status }),
            ...(type && { type }),
            ...(dateFrom || dateTo
                ? { dateOfObservation: { ...(dateFrom && { gte: dateFrom }), ...(dateTo && { lte: dateTo }) } }
                : {}),
            ...(search && {
                OR: [
                    { title: { contains: search } },
                    { description: { contains: search } },
                    { correctionDescription: { contains: search } },
                ],
            }),
        };
        const [total, items] = await Promise.all([
            this.prisma.observation.count({ where }),
            this.prisma.observation.findMany({
                where,
                include: {
                    components: { select: { id: true, uniqueComponentName: true } },
                    bops: { select: { id: true } },
                    wells: { select: { id: true, name: true } },
                    observationAttachments: { take: 3 },
                    rcmRecommendationObservationLink: {
                        include: { rcmRecommendations: true },
                    },
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { dateOfObservation: 'desc' },
            }),
        ]);
        return { items, total, page, limit, pages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const obs = await this.prisma.observation.findFirst({
            where: { id, isRemoved: false },
            include: {
                components: true,
                bops: true,
                wells: true,
                observationAttachments: { include: { attachment: true } },
                rcmRecommendationObservationLink: { include: { rcmRecommendations: true } },
            },
        });
        if (!obs)
            throw new common_1.NotFoundException(`Observation ${id} not found`);
        return obs;
    }
    async create(data, userId) {
        return this.prisma.observation.create({
            data: { ...data, createdById: userId, isRemoved: false },
        });
    }
    async update(id, data, userId) {
        await this.findOne(id);
        return this.prisma.observation.update({
            where: { id },
            data: { ...data, updatedById: userId, updatedAt: new Date() },
        });
    }
    async remove(id, userId) {
        await this.findOne(id);
        return this.prisma.observation.update({
            where: { id },
            data: { isRemoved: true, updatedById: userId, updatedAt: new Date() },
        });
    }
    async getStats() {
        const [total, byStatus, byType, withLinkedRecommendations] = await Promise.all([
            this.prisma.observation.count({ where: { isRemoved: false } }),
            this.prisma.observation.groupBy({
                by: ['status'],
                where: { isRemoved: false },
                _count: { id: true },
            }),
            this.prisma.observation.groupBy({
                by: ['type'],
                where: { isRemoved: false, type: { not: null } },
                _count: { id: true },
            }),
            this.prisma.rcmRecommendationObservationLink.count(),
        ]);
        return { total, byStatus, byType, withLinkedRecommendations };
    }
};
exports.ObservationsService = ObservationsService;
exports.ObservationsService = ObservationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ObservationsService);
//# sourceMappingURL=observations.service.js.map