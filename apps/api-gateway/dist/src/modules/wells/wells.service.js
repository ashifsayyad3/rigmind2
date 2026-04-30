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
exports.WellsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let WellsService = class WellsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
        const { availability, region, field, page = 1, limit = 25 } = filters;
        const where = {
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
    async findOne(id) {
        const well = await this.prisma.well.findFirst({
            where: { id, isRemoved: false },
            include: {
                rigWellChanges: { orderBy: { date: 'desc' }, take: 5, include: { rig: true } },
                wellSessions: { orderBy: { wellSessionStartDate: 'desc' }, take: 5 },
            },
        });
        if (!well)
            throw new common_1.NotFoundException(`Well ${id} not found`);
        return well;
    }
};
exports.WellsService = WellsService;
exports.WellsService = WellsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WellsService);
//# sourceMappingURL=wells.service.js.map