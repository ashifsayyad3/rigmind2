import { PrismaService } from '../../prisma/prisma.service';
export declare class BopService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters: {
        rigId?: number;
        type?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: ({
            _count: {
                bopEvents: number;
            };
        } & {
            id: number;
            location: string | null;
            onDeckDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            installationDate: Date | null;
            vendorOEM: string | null;
            state: string | null;
            splashDate: Date | null;
            latchTestStartDate: Date | null;
            latchUpCompleteDate: Date | null;
            maintenanceStartDate: Date | null;
            plannedReadyDate: Date | null;
            actualReadyDate: Date | null;
            plannedSplashDate: Date | null;
            preservationDate: Date | null;
            lastStumpDate: Date | null;
            maintenancePercent: number | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    getEvents(rigId?: number, bopId?: number, take?: number): Promise<({
        bop: {
            id: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        bopId: number;
        equipment: string;
        bopStatus: string | null;
        projectedOnDeckDate: Date | null;
        actualOnDeckDate: Date | null;
        projectedMaintenanceStartDate: Date | null;
        actualMaintenanceStartDate: Date | null;
        projectedMaintenanceCompleteDate: Date | null;
        actualMaintenanceCompleteDate: Date | null;
        projectedSplashDate: Date | null;
        actualSplashDate: Date | null;
        projectedLatchDate: Date | null;
        actualLatchDate: Date | null;
        projectedLatchTestCompleteDate: Date | null;
        actualLatchTestCompleteDate: Date | null;
        projectedUnLatchDate: Date | null;
        actualUnLatchDate: Date | null;
    })[]>;
    getChanges(bopId?: number, take?: number): Promise<({
        bop: {
            id: number;
        } | null;
    } & {
        id: number;
        location: string | null;
        onDeckDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        state: string | null;
        splashDate: Date | null;
        latchTestStartDate: Date | null;
        latchUpCompleteDate: Date | null;
        maintenanceStartDate: Date | null;
        plannedReadyDate: Date | null;
        actualReadyDate: Date | null;
        plannedSplashDate: Date | null;
        preservationDate: Date | null;
        bopId: number | null;
    })[]>;
    getActiveAssignments(rigId?: number): Promise<({
        rig: {
            id: number;
            name: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        rigId: number;
        rtmRigId: string;
        startDate: Date;
        endDate: Date | null;
        createdById: number;
        updatedById: number | null;
    })[]>;
}
