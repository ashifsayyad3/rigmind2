import { FleetService } from './fleet.service';
export declare class FleetController {
    private readonly svc;
    constructor(svc: FleetService);
    getHealth(): Promise<{
        overallFleetScore: number;
        rigsOnline: number;
        rigsTotal: number;
        criticalFailures: number;
        expiringCerts: number;
        nptHoursMonth: number;
        avgAvailability: number;
    }>;
    getMetrics(): Promise<{
        overallFleetScore: number;
        rigsOnline: number;
        rigsTotal: number;
        criticalFailures: number;
        expiringCerts: number;
        nptHoursMonth: number;
        avgAvailability: number;
    }>;
    getMap(): Promise<{
        id: number;
        name: string;
        status: string;
        healthScore: number;
    }[]>;
    getHealthHistory(days?: number): Promise<{
        date: string;
        score: number;
    }[]>;
    getPredictions(): Promise<{
        rigId: number;
        rigName: string;
        probability: number;
        component: string;
        daysUntilFailure: number;
    }[]>;
    getHealthScores(user: any): Promise<import("./fleet.service").RigHealthScore[]>;
}
