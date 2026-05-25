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
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super({
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'event', level: 'error' },
                { emit: 'stdout', level: 'info' },
                { emit: 'stdout', level: 'warn' },
            ],
            errorFormat: 'colorless',
        });
        this.logger = new common_1.Logger(PrismaService_1.name);
        const isRemovedModels = ['Failure', 'Observation', 'NonProductionTime', 'DeferredMaintenanceTask'];
        const isDeletedModels = ['Certificate'];
        this.$use(async (params, next) => {
            const model = params.model;
            const readActions = ['findFirst', 'findUnique', 'findMany', 'count'];
            if (isRemovedModels.includes(model)) {
                if (readActions.includes(params.action)) {
                    params.args = params.args ?? {};
                    params.args.where = { ...params.args.where, isRemoved: false };
                }
                if (params.action === 'delete') {
                    params.action = 'update';
                    params.args.data = { isRemoved: true };
                }
                if (params.action === 'deleteMany') {
                    params.action = 'updateMany';
                    params.args.data = { isRemoved: true };
                }
            }
            if (isDeletedModels.includes(model)) {
                if (readActions.includes(params.action)) {
                    params.args = params.args ?? {};
                    params.args.where = { ...params.args.where, isDeleted: false };
                }
                if (params.action === 'delete') {
                    params.action = 'update';
                    params.args.data = { isDeleted: true };
                }
                if (params.action === 'deleteMany') {
                    params.action = 'updateMany';
                    params.args.data = { isDeleted: true };
                }
            }
            return next(params);
        });
        this.$use(async (params, next) => {
            const before = Date.now();
            const result = await next(params);
            const after = Date.now();
            if (process.env.LOG_QUERIES === 'true') {
                this.logger.debug(`${params.model}.${params.action} — ${after - before}ms`);
            }
            return result;
        });
    }
    async onModuleInit() {
        await this.$connect();
        this.logger.log('✅ Database connected');
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    async healthCheck() {
        try {
            await this.$queryRaw `SELECT 1`;
            return true;
        }
        catch {
            return false;
        }
    }
    async cleanDatabase() {
        if (process.env.NODE_ENV !== 'test') {
            throw new Error('cleanDatabase can only be called in test environment');
        }
        const tables = [
            'notifications', 'events', 'nptFailures', 'nonProductionTimes',
            'correctiveActions', 'failureObservations', 'failures',
            'observations', 'deferredMaintenanceTasks', 'certificates',
            'rcmRecommendations', 'rcmReports',
        ];
        for (const table of tables) {
            await this.$executeRawUnsafe(`DELETE FROM [dbo].[${table}]`);
        }
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map