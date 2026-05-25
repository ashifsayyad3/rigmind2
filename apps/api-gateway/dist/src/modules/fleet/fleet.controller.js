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
exports.FleetController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fleet_service_1 = require("./fleet.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let FleetController = class FleetController {
    constructor(svc) {
        this.svc = svc;
    }
    getHealth() {
        return this.svc.getFleetHealthMetrics();
    }
    getMetrics() {
        return this.svc.getFleetHealthMetrics();
    }
    getMap() {
        return this.svc.getGlobalMap();
    }
    getHealthHistory(days = 30) {
        return this.svc.getHealthHistory(+days);
    }
    getPredictions() {
        return this.svc.getFailurePredictions();
    }
    getHealthScores(user) {
        return this.svc.getRigHealthScores(user?.accessibleRigIds ?? null);
    }
};
exports.FleetController = FleetController;
__decorate([
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({ summary: 'Get fleet-wide health metrics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FleetController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get fleet-wide health metrics (alias)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FleetController.prototype, "getMetrics", null);
__decorate([
    (0, common_1.Get)('map'),
    (0, swagger_1.ApiOperation)({ summary: 'Get rig positions for global map' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FleetController.prototype, "getMap", null);
__decorate([
    (0, common_1.Get)('health-history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get fleet health score history' }),
    __param(0, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FleetController.prototype, "getHealthHistory", null);
__decorate([
    (0, common_1.Get)('predictions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get fleet failure predictions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FleetController.prototype, "getPredictions", null);
__decorate([
    (0, common_1.Get)('health-scores'),
    (0, swagger_1.ApiOperation)({ summary: 'Get per-rig health scores' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FleetController.prototype, "getHealthScores", null);
exports.FleetController = FleetController = __decorate([
    (0, swagger_1.ApiTags)('Fleet Intelligence'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)({ path: 'fleet', version: '1' }),
    __metadata("design:paramtypes", [fleet_service_1.FleetService])
], FleetController);
//# sourceMappingURL=fleet.controller.js.map