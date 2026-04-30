"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RigsModule = void 0;
const common_1 = require("@nestjs/common");
const rigs_controller_1 = require("./rigs.controller");
const rigs_service_1 = require("./rigs.service");
let RigsModule = class RigsModule {
};
exports.RigsModule = RigsModule;
exports.RigsModule = RigsModule = __decorate([
    (0, common_1.Module)({
        controllers: [rigs_controller_1.RigsController],
        providers: [rigs_service_1.RigsService],
        exports: [rigs_service_1.RigsService],
    })
], RigsModule);
//# sourceMappingURL=rigs.module.js.map