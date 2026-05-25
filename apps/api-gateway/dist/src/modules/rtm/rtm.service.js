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
exports.RtmService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const event_emitter_1 = require("@nestjs/event-emitter");
let RtmService = class RtmService {
    constructor(prisma, eventEmitter) {
        this.prisma = prisma;
        this.eventEmitter = eventEmitter;
    }
    async getFleetSnapshot() {
        const rigs = await this.prisma.rig.findMany({
            where: { visible: true, isRTM: true },
            select: { id: true, name: true, rtmRigId: true, status: true },
        });
        const snapshots = await Promise.all(rigs.map((r) => this.getRigRtmState(r.id)));
        return { rigs: snapshots, timestamp: new Date() };
    }
    async getRigRtmState(rigId) {
        const rig = await this.prisma.rig.findUnique({
            where: { id: rigId },
            select: { id: true, name: true, rtmRigId: true, status: true },
        });
        const [activeAlarms, recentEvents] = await Promise.all([
            this.prisma.rtmAlarmConfiguration.findMany({
                where: { rigId, status: true },
            }),
            this.prisma.rtmEventData.findMany({
                where: { rigId },
                orderBy: { startTime: 'desc' },
                take: 10,
            }),
        ]);
        return { rig, activeAlarms, recentEvents, updatedAt: new Date() };
    }
    async getSensorHistory(rigId, sensorTag, hours = 24) {
        const since = new Date(Date.now() - hours * 60 * 60 * 1000);
        return this.prisma.rtmEventData.findMany({
            where: { rigId, parameterName: sensorTag, startTime: { gte: since } },
            orderBy: { startTime: 'asc' },
        });
    }
    async getAlarmHistory(rigId, take = 50) {
        return this.prisma.rtmEventDataHistory.findMany({
            where: { rigId },
            orderBy: { startTime: 'desc' },
            take,
        });
    }
    async checkAndBroadcastAlarms(rigId) {
        const configs = await this.prisma.rtmAlarmConfiguration.findMany({
            where: { rigId, status: true },
        });
        for (const config of configs) {
            const latest = await this.prisma.rtmEventData.findFirst({
                where: { rigId, parameterName: config.parameterName ?? undefined },
                orderBy: { startTime: 'desc' },
            });
            if (latest) {
                this.eventEmitter.emit('rtm.alarm.triggered', {
                    rigId,
                    parameterName: config.parameterName,
                    alarmType: config.alarmType,
                    alarmName: config.alarmName,
                    event: latest,
                });
            }
        }
    }
};
exports.RtmService = RtmService;
exports.RtmService = RtmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], RtmService);
//# sourceMappingURL=rtm.service.js.map