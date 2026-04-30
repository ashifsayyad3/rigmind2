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
exports.BopController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bop_service_1 = require("./bop.service");
let BopController = class BopController {
    constructor(svc) {
        this.svc = svc;
    }
    findAll(f) { return this.svc.findAll(f); }
    getEvents(rigId, bopId) { return this.svc.getEvents(rigId ? Number(rigId) : undefined, bopId ? Number(bopId) : undefined); }
    getChanges(rigId) { return this.svc.getChanges(rigId ? Number(rigId) : undefined); }
    getActive(rigId) { return this.svc.getActiveAssignments(rigId ? Number(rigId) : undefined); }
};
exports.BopController = BopController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BopController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('events'),
    __param(0, (0, common_1.Query)('rigId')),
    __param(1, (0, common_1.Query)('bopId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], BopController.prototype, "getEvents", null);
__decorate([
    (0, common_1.Get)('changes'),
    __param(0, (0, common_1.Query)('rigId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BopController.prototype, "getChanges", null);
__decorate([
    (0, common_1.Get)('active-assignments'),
    __param(0, (0, common_1.Query)('rigId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BopController.prototype, "getActive", null);
exports.BopController = BopController = __decorate([
    (0, swagger_1.ApiTags)('BOP Management'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)({ path: 'bop', version: '1' }),
    __metadata("design:paramtypes", [bop_service_1.BopService])
], BopController);
//# sourceMappingURL=bop.controller.js.map