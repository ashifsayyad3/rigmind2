import { FleetService } from './fleet.service';
export declare class FleetController {
    private readonly svc;
    constructor(svc: FleetService);
    getMetrics(): Promise<{
        overallFleetScore: number;
        rigsOnline: number;
        rigsTotal: number;
        criticalFailures: number;
        expiringCerts: number;
        nptHoursMonth: number;
        avgAvailability: number;
    }>;
    getHealthScores(user: any): Promise<import("./fleet.service").RigHealthScore[]>;
}
