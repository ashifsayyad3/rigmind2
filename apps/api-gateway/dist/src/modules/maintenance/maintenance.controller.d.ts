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
            description: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            createdById: number | null;
            updatedById: number | null;
            title: string;
            rigId: number | null;
            status: string;
            isRemoved: boolean;
            availability: string;
            equipmentType: string;
            createdByRTOCId: number | null;
            updatedByRTOCId: number | null;
            equipmentId: number;
            componentName: string;
            defermentDate: Date;
            plannedCompletionDate: Date | null;
            equipmentName: string | null;
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
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        createdById: number | null;
        updatedById: number | null;
        title: string;
        rigId: number | null;
        status: string;
        isRemoved: boolean;
        availability: string;
        equipmentType: string;
        createdByRTOCId: number | null;
        updatedByRTOCId: number | null;
        equipmentId: number;
        componentName: string;
        defermentDate: Date;
        plannedCompletionDate: Date | null;
        equipmentName: string | null;
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
        bop: number | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        comments: string | null;
        name: string | null;
        rigId: number;
        uniqueComponentNameId: number;
        partNo: string | null;
        sn: string | null;
        pressureRating: number | null;
        maintainencePeriod: string | null;
        lastMaintainenceDate: Date | null;
        attachmentId: number | null;
    }[]>;
    closeTask(id: number, u: any): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        createdById: number | null;
        updatedById: number | null;
        title: string;
        rigId: number | null;
        status: string;
        isRemoved: boolean;
        availability: string;
        equipmentType: string;
        createdByRTOCId: number | null;
        updatedByRTOCId: number | null;
        equipmentId: number;
        componentName: string;
        defermentDate: Date;
        plannedCompletionDate: Date | null;
        equipmentName: string | null;
    }>;
}
