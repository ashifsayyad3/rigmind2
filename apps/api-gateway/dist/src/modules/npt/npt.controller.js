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
exports.NptController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const npt_service_1 = require("./npt.service");
let NptController = class NptController {
    constructor(svc) {
        this.svc = svc;
    }
    findAll(filters) {
        return this.svc.findAll(filters);
    }
    getAnalytics(rigId) {
        return this.svc.getAnalytics(rigId ? Number(rigId) : undefined);
    }
    getMoaDelays(filters) {
        return this.svc.getMoaDelays(filters);
    }
};
exports.NptController = NptController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List NPT events with filters' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NptController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'NPT analytics: trends, by category, by rig' }),
    __param(0, (0, common_1.Query)('rigId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NptController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Get)('moa-delays'),
    (0, swagger_1.ApiOperation)({ summary: 'List MOA delays' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NptController.prototype, "getMoaDelays", null);
exports.NptController = NptController = __decorate([
    (0, swagger_1.ApiTags)('NPT Intelligence'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)({ path: 'npt', version: '1' }),
    __metadata("design:paramtypes", [npt_service_1.NptService])
], NptController);
//# sourceMappingURL=npt.controller.js.map