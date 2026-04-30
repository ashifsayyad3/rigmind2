import { PrismaService } from './prisma/prisma.service';
export declare class HealthController {
    private prisma;
    constructor(prisma: PrismaService);
    check(): Promise<{
        status: string;
        service: string;
        version: string;
        environment: string;
        database: string;
        timestamp: string;
        uptime: number;
    }>;
}
