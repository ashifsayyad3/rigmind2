import { PrismaService } from '../../prisma/prisma.service';
export declare class NptService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters: {
        rigId?: number;
        bopType?: string;
        nptType?: string;
        delayCategory?: string;
        dateFrom?: Date;
        dateTo?: Date;
        availability?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: ({
            rig: {
                id: number;
                name: string;
            } | null;
            well: {
                id: number;
                name: string;
                field: string | null;
            } | null;
        } & {
            comment: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            rigId: number | null;
            isRemoved: boolean;
            wellId: number | null;
            nptHours: string | null;
            bopType: string | null;
            delayCategory: string | null;
            operation: string | null;
            nptType: string | null;
            sourceType: string | null;
            sourceId: number | null;
            dateOfNPT: Date | null;
            startTime: Date | null;
            endTime: Date | null;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    getAnalytics(rigId?: number): Promise<{
        totalNptHours: number;
        avgNptHours: number;
        totalEvents: number;
        byCategory: {
            delayCategory: string;
            totalHours: number;
            count: number;
        }[];
        byRig: {
            rigName: string;
            totalHours: number;
            eventCount: number;
        }[];
        monthlyTrend: {
            month: string;
            totalHours: number;
            count: number;
        }[];
    }>;
    getMoaDelays(filters: {
        rigId?: number;
        page?: number;
        limit?: number;
    }): Promise<{
        items: ({
            moa: ({
                rig: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    status: string | null;
                    isRTM: boolean;
                    onContract: boolean;
                    category: string | null;
                    operatorId: number | null;
                    offContractDate: Date | null;
                    operationStart: Date | null;
                    projectedUnLatchDate: Date | null;
                    bop1Id: number | null;
                    bop2Id: number | null;
                    visible: boolean;
                    rtmRigId: string | null;
                    updatedById: number | null;
                } | null;
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                rigId: number | null;
                updatedById: number | null;
                createdById: number | null;
                bopType: string | null;
                startDateTime: Date | null;
                expectedReadyDateTime: Date | null;
                targetDateTime: Date | null;
                startComment: string | null;
                stopDateTime: Date | null;
                stopComment: string | null;
            }) | null;
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            category: string | null;
            failureId: number | null;
            moaId: number | null;
            delayHours: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
}
