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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RtmGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtmGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const event_emitter_1 = require("@nestjs/event-emitter");
const rtm_service_1 = require("./rtm.service");
let RtmGateway = RtmGateway_1 = class RtmGateway {
    constructor(jwtService, rtmService, eventEmitter) {
        this.jwtService = jwtService;
        this.rtmService = rtmService;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(RtmGateway_1.name);
        this.subscriptions = new Map();
    }
    afterInit(server) {
        this.logger.log('RTM WebSocket Gateway initialized');
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth?.token ?? client.handshake.headers?.authorization?.split(' ')[1];
            if (!token) {
                client.disconnect();
                return;
            }
            const payload = this.jwtService.verify(token);
            client.data.user = payload;
            this.subscriptions.set(client.id, new Set());
            this.logger.log(`Client connected: ${client.id} (user: ${payload.sub})`);
            const snapshot = await this.rtmService.getFleetSnapshot();
            client.emit('fleet:snapshot', snapshot);
        }
        catch {
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        this.subscriptions.delete(client.id);
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleRigSubscribe(data, client) {
        const subs = this.subscriptions.get(client.id) ?? new Set();
        subs.add(data.rigId);
        this.subscriptions.set(client.id, subs);
        client.join(`rig:${data.rigId}`);
        this.logger.debug(`${client.id} subscribed to rig ${data.rigId}`);
        this.rtmService.getRigRtmState(data.rigId).then((state) => {
            client.emit('rig:state', state);
        });
        return { subscribed: true, rigId: data.rigId };
    }
    handleRigUnsubscribe(data, client) {
        const subs = this.subscriptions.get(client.id);
        subs?.delete(data.rigId);
        client.leave(`rig:${data.rigId}`);
        return { unsubscribed: true, rigId: data.rigId };
    }
    handleSensorReading(payload) {
        this.server.to(`rig:${payload.rigId}`).emit('sensor:reading', payload);
    }
    handleAlarm(payload) {
        this.server.to(`rig:${payload.rigId}`).emit('alarm:triggered', payload);
        this.server.emit('fleet:alarm', payload);
    }
    handleNewFailure(payload) {
        this.server.to(`rig:${payload.rigId}`).emit('failure:new', payload.failure);
        this.server.emit('fleet:failure', payload.failure);
    }
    handleCertExpiry(payload) {
        this.server.to(`rig:${payload.rigId}`).emit('certificate:expiring', payload);
    }
};
exports.RtmGateway = RtmGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], RtmGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('rig:subscribe'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], RtmGateway.prototype, "handleRigSubscribe", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('rig:unsubscribe'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], RtmGateway.prototype, "handleRigUnsubscribe", null);
__decorate([
    (0, event_emitter_1.OnEvent)('rtm.sensor.reading'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RtmGateway.prototype, "handleSensorReading", null);
__decorate([
    (0, event_emitter_1.OnEvent)('rtm.alarm.triggered'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RtmGateway.prototype, "handleAlarm", null);
__decorate([
    (0, event_emitter_1.OnEvent)('failure.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RtmGateway.prototype, "handleNewFailure", null);
__decorate([
    (0, event_emitter_1.OnEvent)('certificate.expiring'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RtmGateway.prototype, "handleCertExpiry", null);
exports.RtmGateway = RtmGateway = RtmGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: process.env.CORS_ORIGINS?.split(',') ?? '*', credentials: true },
        namespace: '/rtm',
        transports: ['websocket', 'polling'],
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        rtm_service_1.RtmService,
        event_emitter_1.EventEmitter2])
], RtmGateway);
//# sourceMappingURL=rtm.gateway.js.map