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
exports.CopilotController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const copilot_service_1 = require("./copilot.service");
class AskDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AskDto.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AskDto.prototype, "conversationHistory", void 0);
let CopilotController = class CopilotController {
    constructor(svc) {
        this.svc = svc;
    }
    ask(dto) {
        return this.svc.ask(dto.question, dto.conversationHistory ?? []);
    }
    generateReport(rigId) {
        return this.svc.generateRigReport(rigId);
    }
};
exports.CopilotController = CopilotController;
__decorate([
    (0, common_1.Post)('ask'),
    (0, swagger_1.ApiOperation)({ summary: 'Ask a natural language question about rig data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AskDto]),
    __metadata("design:returntype", void 0)
], CopilotController.prototype, "ask", null);
__decorate([
    (0, common_1.Get)('report/:rigId'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate AI executive health report for a rig' }),
    __param(0, (0, common_1.Param)('rigId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CopilotController.prototype, "generateReport", null);
exports.CopilotController = CopilotController = __decorate([
    (0, swagger_1.ApiTags)('AI Copilot'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)({ path: 'copilot', version: '1' }),
    __metadata("design:paramtypes", [copilot_service_1.CopilotService])
], CopilotController);
//# sourceMappingURL=copilot.controller.js.map