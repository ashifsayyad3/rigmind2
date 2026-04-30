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
            activeBOPAssignments: ({
                rig: {
                    id: number;
                    name: string;
                } | null;
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string | null;
                rigId: number | null;
                rtmRigId: string | null;
                updatedById: number | null;
                isActive: boolean;
                bopId: number | null;
                startDate: Date | null;
                endDate: Date | null;
                createdById: number | null;
            })[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            type: string | null;
            location: string | null;
            onDeckDate: Date | null;
            splashDate: Date | null;
            latchTestStartDate: Date | null;
            latchUpCompleteDate: Date | null;
            installationDate: Date | null;
            vendorOEM: string | null;
            state: string | null;
            serialNumber: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    getEvents(rigId?: number, bopId?: number, take?: number): Promise<({
        bop: {
            id: number;
            name: string | null;
            type: string | null;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        bopId: number | null;
        equipment: string | null;
        bopStatus: string | null;
        projectedOnDeckDate: Date | null;
        actualOnDeckDate: Date | null;
        projectedMaintenanceStartDate: Date | null;
        actualMaintenanceStartDate: Date | null;
        projectedMaintenanceCompleteDate: Date | null;
        actualMaintenanceCompleteDate: Date | null;
    })[]>;
    getChanges(bopId?: number, take?: number): Promise<({
        bop: {
            id: number;
            name: string | null;
            type: string | null;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        location: string | null;
        onDeckDate: Date | null;
        splashDate: Date | null;
        latchTestStartDate: Date | null;
        latchUpCompleteDate: Date | null;
        state: string | null;
        bopId: number | null;
        maintenanceStartDate: Date | null;
        plannedReadyDate: Date | null;
        actualReadyDate: Date | null;
    })[]>;
    getActiveAssignments(rigId?: number): Promise<({
        rig: {
            id: number;
            name: string;
        } | null;
        bop: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            type: string | null;
            location: string | null;
            onDeckDate: Date | null;
            splashDate: Date | null;
            latchTestStartDate: Date | null;
            latchUpCompleteDate: Date | null;
            installationDate: Date | null;
            vendorOEM: string | null;
            state: string | null;
            serialNumber: string | null;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        rigId: number | null;
        rtmRigId: string | null;
        updatedById: number | null;
        isActive: boolean;
        bopId: number | null;
        startDate: Date | null;
        endDate: Date | null;
        createdById: number | null;
    })[]>;
}
