import { MaintenanceService } from './maintenance.service';
export declare class MaintenanceController {
    private readonly svc;
    constructor(svc: MaintenanceService);
    getDeferredTasks(f: any): Promise<{
        items: ({
            rig: {
                id: number;
                name: string;
            } | null;
        } & {
            description: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string | null;
            rigId: number | null;
            status: string | null;
            updatedById: number | null;
            isRemoved: boolean;
            createdById: number | null;
            equipmentType: string | null;
            priority: string | null;
            equipmentId: number | null;
            componentName: string | null;
            defermentDate: Date | null;
            plannedCompletionDate: Date | null;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    getStats(rigId?: number): Promise<{
        totalDeferred: number;
        byRig: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.DeferredMaintenanceTaskGroupByOutputType, "rigId"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
    getHistory(id: number): Promise<{
        bop: number | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        rigId: number | null;
        componentId: number | null;
        uniqueComponentNameId: number | null;
        maintenanceDate: Date | null;
        partNo: string | null;
        sn: string | null;
        pressureRating: number | null;
        maintainencePeriod: string | null;
        lastMaintainenceDate: Date | null;
    }[]>;
    closeTask(id: number, u: any): Promise<{
        description: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        rigId: number | null;
        status: string | null;
        updatedById: number | null;
        isRemoved: boolean;
        createdById: number | null;
        equipmentType: string | null;
        priority: string | null;
        equipmentId: number | null;
        componentName: string | null;
        defermentDate: Date | null;
        plannedCompletionDate: Date | null;
    }>;
}
