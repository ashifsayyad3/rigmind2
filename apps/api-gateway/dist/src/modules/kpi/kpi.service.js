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
exports.KpiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let KpiService = class KpiService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getForRig(rigId, take = 12) {
        return this.prisma.kpi.findMany({
            where: { rigId },
            orderBy: { createdAt: 'desc' },
            take,
        });
    }
    async getFleetKpi() {
        return this.prisma.$queryRaw `
      SELECT
        r.name as rigName,
        AVG(k.availability) as avgAvailability,
        AVG(k.utilizationRate) as avgUtilizationRate,
        SUM(k.nptHours) as totalNptHours,
        SUM(k.failureCount) as totalFailures,
        AVG(k.maintenanceCompliance) as avgMaintenanceCompliance
      FROM KPI k
      JOIN rigs r ON r.id = k.rigId
      WHERE k.createdAt >= DATEADD(MONTH, -3, GETDATE())
      GROUP BY r.name
      ORDER BY avgAvailability DESC
    `;
    }
    async upsert(rigId, period, data) {
        return this.prisma.kpi.upsert({
            where: { id: -1 },
            create: { rigId, period, ...data, createdAt: new Date(), updatedAt: new Date() },
            update: { ...data, updatedAt: new Date() },
        });
    }
};
exports.KpiService = KpiService;
exports.KpiService = KpiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KpiService);
//# sourceMappingURL=kpi.service.js.map