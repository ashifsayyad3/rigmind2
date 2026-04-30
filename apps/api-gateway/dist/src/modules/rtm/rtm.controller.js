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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtmController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rtm_service_1 = require("./rtm.service");
let RtmController = class RtmController {
    constructor(svc) {
        this.svc = svc;
    }
    getFleetSnapshot() { return this.svc.getFleetSnapshot(); }
    getRigState(id) { return this.svc.getRigRtmState(id); }
    getSensorHistory(id, tag, hours) { return this.svc.getSensorHistory(id, tag, hours ? Number(hours) : 24); }
    getAlarmHistory(id) { return this.svc.getAlarmHistory(id); }
};
exports.RtmController = RtmController;
__decorate([
    (0, common_1.Get)('fleet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RtmController.prototype, "getFleetSnapshot", null);
__decorate([
    (0, common_1.Get)('rig/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RtmController.prototype, "getRigState", null);
__decorate([
    (0, common_1.Get)('rig/:id/sensor/:tag'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('tag')),
    __param(2, (0, common_1.Query)('hours')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number]),
    __metadata("design:returntype", void 0)
], RtmController.prototype, "getSensorHistory", null);
__decorate([
    (0, common_1.Get)('rig/:id/alarms'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RtmController.prototype, "getAlarmHistory", null);
exports.RtmController = RtmController = __decorate([
    (0, swagger_1.ApiTags)('RTM Telemetry'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)({ path: 'rtm', version: '1' }),
    __metadata("design:paramtypes", [rtm_service_1.RtmService])
], RtmController);
//# sourceMappingURL=rtm.controller.js.map