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
var AzureAdStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureAdStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const passport_azure_ad_1 = require("passport-azure-ad");
const auth_service_1 = require("../auth.service");
const PLACEHOLDER = 'your-';
let AzureAdStrategy = AzureAdStrategy_1 = class AzureAdStrategy extends (0, passport_1.PassportStrategy)(passport_azure_ad_1.BearerStrategy, 'azure-ad') {
    constructor(config, authService) {
        const clientID = config.get('AZURE_AD_CLIENT_ID') ?? '';
        const tenantID = config.get('AZURE_AD_TENANT_ID') ?? 'common';
        const configured = clientID && !clientID.startsWith(PLACEHOLDER);
        if (!configured) {
            AzureAdStrategy_1.logger.warn('AZURE_AD_CLIENT_ID not configured — Azure AD SSO disabled');
        }
        super({
            identityMetadata: `https://login.microsoftonline.com/${tenantID}/v2.0/.well-known/openid-configuration`,
            clientID: configured ? clientID : 'disabled',
            audience: configured ? clientID : 'disabled',
            loggingLevel: 'error',
            validateIssuer: configured,
            passReqToCallback: false,
        });
        this.authService = authService;
    }
    async validate(profile) {
        return this.authService.validateAzureUser(profile);
    }
};
exports.AzureAdStrategy = AzureAdStrategy;
AzureAdStrategy.logger = new common_1.Logger(AzureAdStrategy_1.name);
exports.AzureAdStrategy = AzureAdStrategy = AzureAdStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, auth_service_1.AuthService])
], AzureAdStrategy);
//# sourceMappingURL=azure-ad.strategy.js.map