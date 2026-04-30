import { PrismaService } from '../../prisma/prisma.service';
export declare class KpiService {
    private prisma;
    constructor(prisma: PrismaService);
    getForRig(rigId: number, take?: number): Promise<{
        id: number;
        createdAt: Date;
        rigId: number | null;
        testsequenceid: bigint | null;
        rigtypeid: number | null;
        number_tests_CP: number | null;
        availability: number | null;
        utilizationRate: number | null;
        starttime: Date | null;
        endtime: Date | null;
        total_time: string | null;
        time_between_tests: string | null;
        time_passed_tests: string | null;
        time_failed_tests: string | null;
    }[]>;
    getFleetKpi(): Promise<unknown>;
    upsert(rigId: number, period: string, data: any): Promise<{
        id: number;
        createdAt: Date;
        rigId: number | null;
        testsequenceid: bigint | null;
        rigtypeid: number | null;
        number_tests_CP: number | null;
        availability: number | null;
        utilizationRate: number | null;
        starttime: Date | null;
        endtime: Date | null;
        total_time: string | null;
        time_between_tests: string | null;
        time_passed_tests: string | null;
        time_failed_tests: string | null;
    }>;
}
