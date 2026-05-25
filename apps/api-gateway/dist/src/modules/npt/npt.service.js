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
exports.NptService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let NptService = class NptService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
        const { rigId, bopType, nptType, delayCategory, dateFrom, dateTo, availability, page = 1, limit = 25 } = filters;
        const where = {
            isRemoved: false,
            ...(rigId && { rigId }),
            ...(bopType && { bopType }),
            ...(nptType && { nptType }),
            ...(delayCategory && { delayCategory }),
            ...(availability && { availability }),
            ...(dateFrom || dateTo
                ? { dateOfNPT: { ...(dateFrom && { gte: dateFrom }), ...(dateTo && { lte: dateTo }) } }
                : {}),
        };
        const [total, items] = await Promise.all([
            this.prisma.nonProductionTime.count({ where }),
            this.prisma.nonProductionTime.findMany({
                where,
                include: {
                    rig: { select: { id: true, name: true } },
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { dateOfNPT: 'desc' },
            }),
        ]);
        return { items, total, page, limit, pages: Math.ceil(total / limit) };
    }
    async getAnalytics(rigId) {
        const whereBase = rigId ? (0, library_1.sqltag) `AND rigId = ${rigId}` : library_1.empty;
        const [byCategory, byRig, monthlyTrend, totalStats] = await Promise.all([
            this.prisma.$queryRaw `
        SELECT
          ISNULL(delayCategory, 'Uncategorized') as delayCategory,
          SUM(CAST(nptHours AS FLOAT)) as totalHours,
          COUNT(*) as count
        FROM nonProductionTimes
        WHERE isRemoved = 0 ${whereBase}
        GROUP BY delayCategory
        ORDER BY totalHours DESC
      `,
            this.prisma.$queryRaw `
        SELECT
          r.name as rigName,
          SUM(CAST(n.nptHours AS FLOAT)) as totalHours,
          COUNT(*) as eventCount
        FROM nonProductionTimes n
        JOIN rigs r ON r.id = n.rigId
        WHERE n.isRemoved = 0 ${whereBase}
        GROUP BY r.name
        ORDER BY totalHours DESC
      `,
            this.prisma.$queryRaw `
        SELECT
          FORMAT(dateOfNPT, 'yyyy-MM') as month,
          SUM(CAST(nptHours AS FLOAT)) as totalHours,
          COUNT(*) as count
        FROM nonProductionTimes
        WHERE isRemoved = 0
          AND dateOfNPT >= DATEADD(MONTH, -12, GETDATE())
          ${whereBase}
        GROUP BY FORMAT(dateOfNPT, 'yyyy-MM')
        ORDER BY month ASC
      `,
            this.prisma.$queryRaw `
        SELECT
          SUM(CAST(nptHours AS FLOAT)) as totalHours,
          AVG(CAST(nptHours AS FLOAT)) as avgHours,
          COUNT(*) as eventCount
        FROM nonProductionTimes
        WHERE isRemoved = 0 ${whereBase}
      `,
        ]);
        return {
            totalNptHours: totalStats[0]?.totalHours ?? 0,
            avgNptHours: totalStats[0]?.avgHours ?? 0,
            totalEvents: totalStats[0]?.eventCount ?? 0,
            byCategory,
            byRig,
            monthlyTrend,
        };
    }
    async getSummary(rigId, startDate, endDate) {
        const where = {
            isRemoved: false,
            ...(rigId && { rigId }),
            ...(startDate && { dateOfNPT: { gte: new Date(startDate) } }),
            ...(endDate && { dateOfNPT: { lte: new Date(endDate) } }),
        };
        const [total, raw] = await Promise.all([
            this.prisma.nonProductionTime.count({ where }),
            this.prisma.$queryRawUnsafe(`SELECT ISNULL(SUM(CAST(nptHours AS FLOAT)), 0) as totalHours FROM nonProductionTimes WHERE isRemoved = 0${rigId ? ` AND rigId = ${rigId}` : ''}`).catch(() => [{ totalHours: 0 }]),
        ]);
        return { total, totalHours: Number(raw[0]?.totalHours ?? 0), totalCost: 0 };
    }
    async getTrend(rigId, months = 6) {
        const sql = `SELECT FORMAT(dateOfNPT, 'yyyy-MM') as month, ISNULL(SUM(CAST(nptHours AS FLOAT)), 0) as hours FROM nonProductionTimes WHERE isRemoved = 0 AND dateOfNPT >= DATEADD(MONTH, -${Number(months)}, GETDATE())${rigId ? ` AND rigId = ${Number(rigId)}` : ''} GROUP BY FORMAT(dateOfNPT, 'yyyy-MM') ORDER BY month ASC`;
        const result = await this.prisma.$queryRawUnsafe(sql).catch(() => []);
        return result.map(r => ({ month: String(r['month'] ?? ''), hours: Number(r['hours'] ?? 0), cost: 0 }));
    }
    async getByCategory() {
        const rows = await this.prisma.$queryRawUnsafe(`SELECT ISNULL(delayCategory, 'Uncategorized') as category, ISNULL(SUM(CAST(nptHours AS FLOAT)), 0) as hours FROM nonProductionTimes WHERE isRemoved = 0 GROUP BY delayCategory ORDER BY hours DESC`).catch(() => []);
        const totalHours = rows.reduce((s, r) => s + Number(r.hours ?? 0), 0) || 1;
        return rows.map(r => ({
            category: String(r.category ?? ''),
            hours: Number(r.hours ?? 0),
            pct: Math.round((Number(r.hours ?? 0) / totalHours) * 100),
        }));
    }
    async getMoaDelays(filters) {
        const { rigId, page = 1, limit = 20 } = filters;
        const where = { ...(rigId && { moa: { rigId } }) };
        const [total, items] = await Promise.all([
            this.prisma.moaDelay.count({ where }),
            this.prisma.moaDelay.findMany({
                where,
                include: { moa: { include: { rig: true } } },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
        ]);
        return { items, total, page, limit };
    }
};
exports.NptService = NptService;
exports.NptService = NptService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NptService);
//# sourceMappingURL=npt.service.js.map