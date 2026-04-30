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
    getMaintenanceHistory(componentId: number, take?: number): Promise<{
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
    closeDeferredTask(id: number, userId: number): Promise<{
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
    getStats(rigId?: number): Promise<{
        totalDeferred: number;
        byRig: (Prisma.PickEnumerable<Prisma.DeferredMaintenanceTaskGroupByOutputType, "rigId"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
}
