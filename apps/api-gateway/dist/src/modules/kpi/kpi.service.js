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
        return this.prisma.$queryRaw `
      SELECT TOP ${take} *
      FROM KPI
      ORDER BY createdAt DESC
    `;
    }
    async getFleetKpi() {
        return this.prisma.$queryRaw `
      SELECT
        r.name as rigName,
        COUNT(f.id) as totalFailures
      FROM rigs r
      LEFT JOIN failures f ON f.rigId = r.id AND f.isRemoved = 0
      WHERE r.visible = 1
      GROUP BY r.name
      ORDER BY totalFailures DESC
    `;
    }
    async upsert(rigId, period, data) {
        return { rigId, period, ...data, note: 'KPI table does not support rigId/period fields' };
    }
};
exports.KpiService = KpiService;
exports.KpiService = KpiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KpiService);
//# sourceMappingURL=kpi.service.js.map