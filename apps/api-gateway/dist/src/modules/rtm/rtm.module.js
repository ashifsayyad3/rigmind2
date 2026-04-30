"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtmModule = void 0;
const common_1 = require("@nestjs/common");
const rtm_gateway_1 = require("./rtm.gateway");
const rtm_service_1 = require("./rtm.service");
const rtm_controller_1 = require("./rtm.controller");
const auth_module_1 = require("../auth/auth.module");
let RtmModule = class RtmModule {
};
exports.RtmModule = RtmModule;
exports.RtmModule = RtmModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [rtm_controller_1.RtmController],
        providers: [rtm_gateway_1.RtmGateway, rtm_service_1.RtmService],
        exports: [rtm_service_1.RtmService],
    })
], RtmModule);
//# sourceMappingURL=rtm.module.js.map