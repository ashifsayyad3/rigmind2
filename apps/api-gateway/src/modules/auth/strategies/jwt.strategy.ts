import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { JwtPayload } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
      issuer: 'rigmind-ai',
      audience: 'rigmind-web',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: {
        role: {
          include: {
            rolePermissions: { include: { permission: true } },
            roleFeatures: { include: { feature: true } },
          },
        },
        userRigs: { select: { rigId: true } },
      },
    });

    if (!user || user.deleted || !user.enabled) {
      throw new UnauthorizedException('User account is disabled or deleted');
    }

    const u = user as any;
    return {
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      roleId: u.roleId,
      role: u.role,
      canAccessAllRigs: u.canAccessAllRigs,
      accessibleRigIds: u.canAccessAllRigs
        ? null
        : (u.userRigs ?? []).map((ur: { rigId: number }) => ur.rigId),
      permissions: (u.role?.rolePermissions ?? []).map((rp: any) => rp.permission?.name) ?? [],
    };
  }
}
