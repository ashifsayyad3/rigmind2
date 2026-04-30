import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export interface JwtPayload {
  sub: number;
  email: string;
  roleId: number | null;
  roleName: string | null;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email, deleted: false, enabled: true },
      include: { role: { include: { rolePermissions: { include: { permission: true } } } } },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    // In production: verify against hashed password or Azure AD
    return user;
  }

  async login(user: any) {
    const payload: JwtPayload = {
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

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
      if (!user || user.deleted) throw new UnauthorizedException();
      return this.login(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getProfile(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: true,
        userRigs: { include: { rig: true } },
      },
    });
  }

  async validateAzureUser(profile: any) {
    const email = profile._json?.preferred_username ?? profile.upn;
    let user = await this.prisma.user.findFirst({
      where: { email, deleted: false },
      include: { role: true },
    });
    if (!user) {
      // Auto-provision Azure AD user
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
}
