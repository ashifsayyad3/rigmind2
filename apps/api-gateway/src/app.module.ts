import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-yet';

import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health.controller';
import { AuthModule } from './modules/auth/auth.module';
import { RigsModule } from './modules/rigs/rigs.module';
import { WellsModule } from './modules/wells/wells.module';
import { FailuresModule } from './modules/failures/failures.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { NptModule } from './modules/npt/npt.module';
import { ObservationsModule } from './modules/observations/observations.module';
import { RecommendationsModule } from './modules/recommendations/recommendations.module';
import { FleetModule } from './modules/fleet/fleet.module';
import { CopilotModule } from './modules/copilot/copilot.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { RtmModule } from './modules/rtm/rtm.module';
import { BopModule } from './modules/bop/bop.module';
import { KpiModule } from './modules/kpi/kpi.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.local', '.env'] }),

    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),

    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (config: ConfigService) => {
        try {
          const store = await redisStore({
            socket: { host: config.get('REDIS_HOST', 'localhost'), port: 6379 },
            ttl: 60 * 5 * 1000,
          });
          return { store };
        } catch {
          // Redis unavailable — fall back to in-memory cache for local dev
          return { ttl: 60 * 5 * 1000 };
        }
      },
      inject: [ConfigService],
    }),

    EventEmitterModule.forRoot({ wildcard: true, maxListeners: 20 }),
    ScheduleModule.forRoot(),

    PrismaModule,
    AuthModule,
    RigsModule,
    WellsModule,
    FailuresModule,
    MaintenanceModule,
    CertificatesModule,
    NptModule,
    ObservationsModule,
    RecommendationsModule,
    FleetModule,
    CopilotModule,
    NotificationsModule,
    RtmModule,
    BopModule,
    KpiModule,
  ],
  controllers: [HealthController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class AppModule {}
