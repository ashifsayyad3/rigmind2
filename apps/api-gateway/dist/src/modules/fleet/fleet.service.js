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
exports.FleetService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let FleetService = class FleetService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFleetHealthMetrics() {
        const [rigsTotal, rigsOnline, criticalFailures, expiringCerts, nptResult, kpiResult] = await Promise.all([
            this.prisma.rig.count(),
            this.prisma.rig.count({ where: { status: { contains: 'Operations' } } }),
            this.prisma.failure.count({
                where: { isRemoved: false, severity: 'critical', status: { not: 'closed' } },
            }),
            this.prisma.certificateAttachment.count({
                where: {
                    expirationDate: {
                        gte: new Date(),
                        lte: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
                    },
                },
            }),
            this.prisma.$queryRaw `
          SELECT ISNULL(SUM(CAST(nptHours AS FLOAT)), 0) as totalHours
          FROM nonProductionTimes
          WHERE isRemoved = 0 AND dateOfNPT >= DATEADD(MONTH, -1, GETDATE())
        `,
            Promise.resolve([{ avgAvailability: 0 }]),
        ]);
        const fleetScore = this.calculateFleetScore(criticalFailures, expiringCerts, rigsTotal);
        return {
            overallFleetScore: fleetScore,
            rigsOnline,
            rigsTotal,
            criticalFailures,
            expiringCerts,
            nptHoursMonth: nptResult[0]?.totalHours ?? 0,
            avgAvailability: kpiResult[0]?.avgAvailability ?? 0,
        };
    }
    calculateFleetScore(criticalFailures, expiringCerts, rigsTotal) {
        let score = 100;
        score -= Math.min(criticalFailures * 5, 30);
        score -= Math.min(expiringCerts * 1, 20);
        return Math.max(score, 0);
    }
    async getGlobalMap() {
        const rigs = await this.prisma.rig.findMany({
            select: { id: true, name: true, status: true },
            orderBy: { name: 'asc' },
        });
        return rigs.map((r, i) => ({
            id: r.id,
            name: r.name ?? '',
            status: r.status ?? 'unknown',
            healthScore: 70 + Math.floor((r.id * 7) % 25),
            lat: -10 + (i % 20) * 3,
            lng: -80 + (i % 30) * 5,
        }));
    }
    async getHealthHistory(days = 30) {
        const result = [];
        for (let d = days; d >= 0; d--) {
            const date = new Date(Date.now() - d * 24 * 60 * 60 * 1000);
            result.push({
                date: date.toISOString().split('T')[0],
                score: 72 + Math.floor(Math.sin(d * 0.3) * 8),
            });
        }
        return result;
    }
    async getFailurePredictions() {
        const rigs = await this.prisma.rig.findMany({
            select: { id: true, name: true },
            take: 10,
            orderBy: { name: 'asc' },
        });
        return rigs.slice(0, 5).map((r) => ({
            rigId: r.id,
            rigName: r.name ?? '',
            probability: 0.55 + ((r.id * 13) % 40) / 100,
            component: ['BOP', 'Drawworks', 'Top Drive', 'Mud Pump', 'Riser'][r.id % 5],
            daysUntilFailure: 7 + (r.id % 30),
        }));
    }
    async getRigHealthScores(accessibleRigIds) {
        const where = {
            ...(accessibleRigIds && { id: { in: accessibleRigIds } }),
        };
        const rigs = await this.prisma.rig.findMany({
            where,
            select: { id: true, name: true },
            orderBy: { name: 'asc' },
        });
        const scores = await Promise.all(rigs.map((rig) => this.scoreRig(rig)));
        return scores;
    }
    async scoreRig(rig) {
        const [openFailures, openMaintenance, expiringCerts, nptResult, kpi] = await Promise.all([
            this.prisma.failure.count({
                where: { rigId: rig.id, isRemoved: false, status: { not: 'closed' } },
            }),
            this.prisma.deferredMaintenanceTask.count({
                where: { rigId: rig.id, isRemoved: false },
            }),
            this.prisma.certificateAttachment.count({
                where: {
                    certificate: { rigId: rig.id },
                    expirationDate: { gte: new Date(), lte: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) },
                },
            }),
            this.prisma.$queryRaw `
        SELECT ISNULL(SUM(CAST(nptHours AS FLOAT)), 0) as totalHours
        FROM nonProductionTimes
        WHERE rigId = ${rig.id} AND isRemoved = 0
          AND dateOfNPT >= DATEADD(DAY, -30, GETDATE())
      `,
            Promise.resolve(null),
        ]);
        const nptHours = nptResult[0]?.totalHours ?? 0;
        const failureScore = Math.max(100 - openFailures * 10, 0) * 0.30;
        const maintenanceScore = Math.max(100 - openMaintenance * 8, 0) * 0.25;
        const certScore = Math.max(100 - expiringCerts * 5, 0) * 0.15;
        const nptScore = Math.max(100 - nptHours * 2, 0) * 0.20;
        const availabilityScore = 80 * 0.10;
        const overallScore = Math.round(failureScore + maintenanceScore + certScore + nptScore + availabilityScore);
        return {
            rigId: rig.id,
            rigName: rig.name ?? '',
            overallScore,
            componentHealth: Math.round(failureScore / 0.30),
            maintenanceCompliance: Math.round(maintenanceScore / 0.25),
            certificationStatus: Math.round(certScore / 0.15),
            failureFrequency: Math.round(failureScore / 0.30),
            nptScore: Math.round(nptScore / 0.20),
            openFailures,
            openMaintenance,
            expiringCerts,
            nptHoursLast30d: nptHours,
            trend: overallScore >= 75 ? 'stable' : overallScore >= 60 ? 'degrading' : 'degrading',
        };
    }
};
exports.FleetService = FleetService;
exports.FleetService = FleetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FleetService);
//# sourceMappingURL=fleet.service.js.map