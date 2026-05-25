import { MaintenanceService } from './maintenance.service';
export declare class MaintenanceController {
    private readonly svc;
    constructor(svc: MaintenanceService);
    getDeferredTasks(f: any): Promise<{
        items: ({
            rig: {
                id: number;
                name: string | null;
            } | null;
        } & {
            id: number;
            equipmentId: number;
            equipmentType: string;
            title: string;
            description: string;
            componentName: string;
            defermentDate: Date;
            plannedCompletionDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            rigId: number | null;
            equipmentName: string | null;
            status: string;
            createdById: number | null;
            updatedById: number | null;
            createdByRTOCId: number | null;
            updatedByRTOCId: number | null;
            availability: string;
            isRemoved: boolean;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    getOverdue(rigId?: number): Promise<({
        rig: {
            id: number;
            name: string | null;
        } | null;
    } & {
        id: number;
        equipmentId: number;
        equipmentType: string;
        title: string;
        description: string;
        componentName: string;
        defermentDate: Date;
        plannedCompletionDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        rigId: number | null;
        equipmentName: string | null;
        status: string;
        createdById: number | null;
        updatedById: number | null;
        createdByRTOCId: number | null;
        updatedByRTOCId: number | null;
        availability: string;
        isRemoved: boolean;
    })[]>;
    getStats(rigId?: number): Promise<{
        totalDeferred: number;
        byRig: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.DeferredMaintenanceTaskGroupByOutputType, "rigId"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
    getHistory(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        rigId: number;
        name: string | null;
        uniqueComponentNameId: number;
        partNo: string | null;
        sn: string | null;
        pressureRating: number | null;
        bop: number | null;
        maintainencePeriod: string | null;
        lastMaintainenceDate: Date | null;
        comments: string | null;
        attachmentId: number | null;
    }[]>;
    closeTask(id: number, u: any): Promise<{
        id: number;
        equipmentId: number;
        equipmentType: string;
        title: string;
        description: string;
        componentName: string;
        defermentDate: Date;
        plannedCompletionDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        rigId: number | null;
        equipmentName: string | null;
        status: string;
        createdById: number | null;
        updatedById: number | null;
        createdByRTOCId: number | null;
        updatedByRTOCId: number | null;
        availability: string;
        isRemoved: boolean;
    }>;
}
