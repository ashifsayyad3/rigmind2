import { KpiService } from './kpi.service';
export declare class KpiController {
    private readonly svc;
    constructor(svc: KpiService);
    getFleet(): Promise<unknown>;
    getRig(id: number): Promise<{
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
}
