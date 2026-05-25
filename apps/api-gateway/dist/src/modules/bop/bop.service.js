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
exports.BopService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let BopService = class BopService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
        const { rigId, page = 1, limit = 20 } = filters;
        const where = {
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
    async getEvents(rigId, bopId, take = 50) {
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
    async getChanges(bopId, take = 20) {
        return this.prisma.bopChange.findMany({
            where: { ...(bopId && { bopId }) },
            include: {
                bop: { select: { id: true } },
            },
            orderBy: { createdAt: 'desc' },
            take,
        });
    }
    async getActiveAssignments(rigId) {
        return this.prisma.activeBOPAssignment.findMany({
            where: { ...(rigId && { rigId }) },
            include: {
                rig: { select: { id: true, name: true } },
            },
        });
    }
};
exports.BopService = BopService;
exports.BopService = BopService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BopService);
//# sourceMappingURL=bop.service.js.map