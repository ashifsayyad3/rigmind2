"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const cache_manager_1 = require("@nestjs/cache-manager");
const core_1 = require("@nestjs/core");
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
const prisma_module_1 = require("./prisma/prisma.module");
const health_controller_1 = require("./health.controller");
const auth_module_1 = require("./modules/auth/auth.module");
const rigs_module_1 = require("./modules/rigs/rigs.module");
const wells_module_1 = require("./modules/wells/wells.module");
const failures_module_1 = require("./modules/failures/failures.module");
const maintenance_module_1 = require("./modules/maintenance/maintenance.module");
const certificates_module_1 = require("./modules/certificates/certificates.module");
const npt_module_1 = require("./modules/npt/npt.module");
const observations_module_1 = require("./modules/observations/observations.module");
const recommendations_module_1 = require("./modules/recommendations/recommendations.module");
const fleet_module_1 = require("./modules/fleet/fleet.module");
const copilot_module_1 = require("./modules/copilot/copilot.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const rtm_module_1 = require("./modules/rtm/rtm.module");
const bop_module_1 = require("./modules/bop/bop.module");
const kpi_module_1 = require("./modules/kpi/kpi.module");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.local', '.env'] }),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                useFactory: async (config) => {
                    try {
                        const store = await (0, cache_manager_redis_yet_1.redisStore)({
                            socket: { host: config.get('REDIS_HOST', 'localhost'), port: 6379 },
                            ttl: 60 * 5 * 1000,
                        });
                        return { store };
                    }
                    catch {
                        return { ttl: 60 * 5 * 1000 };
                    }
                },
                inject: [config_1.ConfigService],
            }),
            event_emitter_1.EventEmitterModule.forRoot({ wildcard: true, maxListeners: 20 }),
            schedule_1.ScheduleModule.forRoot(),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            rigs_module_1.RigsModule,
            wells_module_1.WellsModule,
            failures_module_1.FailuresModule,
            maintenance_module_1.MaintenanceModule,
            certificates_module_1.CertificatesModule,
            npt_module_1.NptModule,
            observations_module_1.ObservationsModule,
            recommendations_module_1.RecommendationsModule,
            fleet_module_1.FleetModule,
            copilot_module_1.CopilotModule,
            notifications_module_1.NotificationsModule,
            rtm_module_1.RtmModule,
            bop_module_1.BopModule,
            kpi_module_1.KpiModule,
        ],
        controllers: [health_controller_1.HealthController],
        providers: [
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
            { provide: core_1.APP_FILTER, useClass: all_exceptions_filter_1.AllExceptionsFilter },
            { provide: core_1.APP_INTERCEPTOR, useClass: logging_interceptor_1.LoggingInterceptor },
            { provide: core_1.APP_INTERCEPTOR, useClass: transform_interceptor_1.TransformInterceptor },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map