import { KpiService } from './kpi.service';
export declare class KpiController {
    private readonly svc;
    constructor(svc: KpiService);
    getFleet(): Promise<unknown>;
    getRig(id: number): Promise<unknown>;
}
