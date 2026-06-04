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
    getMaintenanceHistory(rigId: number, take?: number): Promise<{
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
    getOverdueTasks(rigId?: number): Promise<({
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
    closeDeferredTask(id: number, userId: number): Promise<{
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
    getStats(rigId?: number): Promise<{
        totalDeferred: number;
        byRig: (Prisma.PickEnumerable<Prisma.DeferredMaintenanceTaskGroupByOutputType, "rigId"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
}
