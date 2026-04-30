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
exports.RigsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rigs_service_1 = require("./rigs.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let RigsController = class RigsController {
    constructor(svc) {
        this.svc = svc;
    }
    findAll(filters, user) {
        return this.svc.findAll(filters, user.accessibleRigIds);
    }
    findOne(id) {
        return this.svc.findOne(id);
    }
    getHealth(id) {
        return this.svc.getHealthSnapshot(id);
    }
    getCurrentWell(id) {
        return this.svc.getCurrentWell(id);
    }
    getStatusHistory(id) {
        return this.svc.getStatusHistory(id);
    }
    update(id, body, user) {
        return this.svc.update(id, body, user.id);
    }
};
exports.RigsController = RigsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all accessible rigs' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RigsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get full rig detail' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RigsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/health'),
    (0, swagger_1.ApiOperation)({ summary: 'Get rig health snapshot' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RigsController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Get)(':id/current-well'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the currently active well for this rig' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RigsController.prototype, "getCurrentWell", null);
__decorate([
    (0, common_1.Get)(':id/status-history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get rig status change history' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RigsController.prototype, "getStatusHistory", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update rig details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], RigsController.prototype, "update", null);
exports.RigsController = RigsController = __decorate([
    (0, swagger_1.ApiTags)('Rigs'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)({ path: 'rigs', version: '1' }),
    __metadata("design:paramtypes", [rigs_service_1.RigsService])
], RigsController);
//# sourceMappingURL=rigs.controller.js.map