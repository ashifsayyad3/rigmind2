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
exports.MaintenanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const maintenance_service_1 = require("./maintenance.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let MaintenanceController = class MaintenanceController {
    constructor(svc) {
        this.svc = svc;
    }
    getDeferredTasks(f) { return this.svc.getDeferredTasks(f); }
    getOverdue(rigId) { return this.svc.getOverdueTasks(rigId ? Number(rigId) : undefined); }
    getStats(rigId) { return this.svc.getStats(rigId ? Number(rigId) : undefined); }
    getHistory(id) { return this.svc.getMaintenanceHistory(id); }
    closeTask(id, u) { return this.svc.closeDeferredTask(id, u.id); }
};
exports.MaintenanceController = MaintenanceController;
__decorate([
    (0, common_1.Get)('deferred'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MaintenanceController.prototype, "getDeferredTasks", null);
__decorate([
    (0, common_1.Get)('overdue'),
    __param(0, (0, common_1.Query)('rigId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MaintenanceController.prototype, "getOverdue", null);
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Query)('rigId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MaintenanceController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('history/component/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MaintenanceController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Put)('deferred/:id/close'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], MaintenanceController.prototype, "closeTask", null);
exports.MaintenanceController = MaintenanceController = __decorate([
    (0, swagger_1.ApiTags)('Maintenance'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)({ path: 'maintenance', version: '1' }),
    __metadata("design:paramtypes", [maintenance_service_1.MaintenanceService])
], MaintenanceController);
//# sourceMappingURL=maintenance.controller.js.map