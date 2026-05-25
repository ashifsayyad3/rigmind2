import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

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

    // Soft-delete middleware
    // isRemoved models
    const isRemovedModels = ['Failure', 'Observation', 'NonProductionTime', 'DeferredMaintenanceTask'];
    // isDeleted models (Certificate uses isDeleted)
    const isDeletedModels = ['Certificate'];

    this.$use(async (params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => Promise<unknown>) => {
      const model = params.model as string;
      const readActions = ['findFirst', 'findUnique', 'findMany', 'count'];

      if (isRemovedModels.includes(model)) {
        if (readActions.includes(params.action)) {
          params.args = params.args ?? {};
          params.args.where = { ...params.args.where, isRemoved: false };
        }
        if (params.action === 'delete') { params.action = 'update'; params.args.data = { isRemoved: true }; }
        if (params.action === 'deleteMany') { params.action = 'updateMany'; params.args.data = { isRemoved: true }; }
      }

      if (isDeletedModels.includes(model)) {
        if (readActions.includes(params.action)) {
          params.args = params.args ?? {};
          params.args.where = { ...params.args.where, isDeleted: false };
        }
        if (params.action === 'delete') { params.action = 'update'; params.args.data = { isDeleted: true }; }
        if (params.action === 'deleteMany') { params.action = 'updateMany'; params.args.data = { isDeleted: true }; }
      }

      return next(params);
    });

    // Audit logging middleware
    this.$use(async (params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => Promise<unknown>) => {
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

  async healthCheck(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }

  /** Clean test database — only for test environment */
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
}
