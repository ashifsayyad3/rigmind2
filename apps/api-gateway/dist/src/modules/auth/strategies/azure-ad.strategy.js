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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureAdStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const passport_azure_ad_1 = require("passport-azure-ad");
const auth_service_1 = require("../auth.service");
let AzureAdStrategy = class AzureAdStrategy extends (0, passport_1.PassportStrategy)(passport_azure_ad_1.BearerStrategy, 'azure-ad') {
    constructor(config, authService) {
        super({
            identityMetadata: `https://login.microsoftonline.com/${config.get('AZURE_TENANT_ID')}/v2.0/.well-known/openid-configuration`,
            clientID: config.get('AZURE_CLIENT_ID'),
            audience: config.get('AZURE_CLIENT_ID'),
            loggingLevel: 'error',
            validateIssuer: true,
            passReqToCallback: false,
        });
        this.authService = authService;
    }
    async validate(profile) {
        return this.authService.validateAzureUser(profile);
    }
};
exports.AzureAdStrategy = AzureAdStrategy;
exports.AzureAdStrategy = AzureAdStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, auth_service_1.AuthService])
], AzureAdStrategy);
//# sourceMappingURL=azure-ad.strategy.js.map