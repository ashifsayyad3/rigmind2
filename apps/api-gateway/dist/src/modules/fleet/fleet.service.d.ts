import { PrismaService } from '../../prisma/prisma.service';
export interface RigHealthScore {
    rigId: number;
    rigName: string;
    overallScore: number;
    componentHealth: number;
    maintenanceCompliance: number;
    certificationStatus: number;
    failureFrequency: number;
    nptScore: number;
    openFailures: number;
    openMaintenance: number;
    expiringCerts: number;
    nptHoursLast30d: number;
    trend: 'improving' | 'stable' | 'degrading';
}
export declare class FleetService {
    private prisma;
    constructor(prisma: PrismaService);
    getFleetHealthMetrics(): Promise<{
        overallFleetScore: number;
        rigsOnline: number;
        rigsTotal: number;
        criticalFailures: number;
        expiringCerts: number;
        nptHoursMonth: number;
        avgAvailability: number;
    }>;
    private calculateFleetScore;
    getRigHealthScores(accessibleRigIds: number[] | null): Promise<RigHealthScore[]>;
    private scoreRig;
}
