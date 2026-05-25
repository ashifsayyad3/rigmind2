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
exports.MaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let MaintenanceService = class MaintenanceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDeferredTasks(filters) {
        const { rigId, page = 1, limit = 25 } = filters;
        const where = {
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
    async getMaintenanceHistory(rigId, take = 20) {
        return this.prisma.componentMaintainanceHistory.findMany({
            where: { rigId },
            orderBy: { lastMaintainenceDate: 'desc' },
            take,
        });
    }
    async closeDeferredTask(id, userId) {
        return this.prisma.deferredMaintenanceTask.update({
            where: { id },
            data: { isRemoved: true, updatedAt: new Date() },
        });
    }
    async getStats(rigId) {
        const where = {
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
};
exports.MaintenanceService = MaintenanceService;
exports.MaintenanceService = MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MaintenanceService);
//# sourceMappingURL=maintenance.service.js.map