import { PrismaService } from '../../prisma/prisma.service';
export declare class KpiService {
    private prisma;
    constructor(prisma: PrismaService);
    getForRig(rigId: number, take?: number): Promise<unknown>;
    getFleetKpi(): Promise<unknown>;
    upsert(rigId: number, period: string, data: any): Promise<any>;
}
