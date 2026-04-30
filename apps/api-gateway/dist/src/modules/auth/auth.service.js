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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(prisma, jwtService, config) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.config = config;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findFirst({
            where: { email, deleted: false, enabled: true },
            include: { role: { include: { rolePermissions: { include: { permission: true } } } } },
        });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        return user;
    }
    async login(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            roleId: user.roleId,
            roleName: user.role?.name ?? null,
        };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
        this.logger.log(`User ${user.email} logged in`);
        return {
            accessToken,
            refreshToken,
            expiresIn: 86400,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role?.name,
                canAccessAllRigs: user.canAccessAllRigs,
            },
        };
    }
    async refreshToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
            if (!user || user.deleted)
                throw new common_1.UnauthorizedException();
            return this.login(user);
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async getProfile(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                role: true,
                userRigs: { include: { rig: true } },
            },
        });
    }
    async validateAzureUser(profile) {
        const email = profile._json?.preferred_username ?? profile.upn;
        let user = await this.prisma.user.findFirst({
            where: { email, deleted: false },
            include: { role: true },
        });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    email,
                    firstName: profile.name?.givenName ?? '',
                    lastName: profile.name?.familyName ?? '',
                    enabled: true,
                    deleted: false,
                    canAccessAllRigs: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                include: { role: true },
            });
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map