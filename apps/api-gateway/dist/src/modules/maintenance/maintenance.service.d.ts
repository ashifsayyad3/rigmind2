import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class MaintenanceService {
    private prisma;
    constructor(prisma: PrismaService);
    getDeferredTasks(filters: {
        rigId?: number;
        page?: number;
        limit?: number;
    }): Promise<{
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
    getMaintenanceHistory(rigId: number, take?: number): Promise<{
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
    getOverdueTasks(rigId?: number): Promise<({
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
    closeDeferredTask(id: number, userId: number): Promise<{
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
    getStats(rigId?: number): Promise<{
        totalDeferred: number;
        byRig: (Prisma.PickEnumerable<Prisma.DeferredMaintenanceTaskGroupByOutputType, "rigId"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
}
