import { NptService } from './npt.service';
export declare class NptController {
    private readonly svc;
    constructor(svc: NptService);
    findAll(filters: any): Promise<{
        items: ({
            rig: {
                id: number;
                name: string | null;
            };
        } & {
            comment: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            createdById: number;
            updatedById: number | null;
            rigId: number;
            bopType: string;
            isRemoved: boolean;
            availability: string;
            createdByRTOCId: number | null;
            updatedByRTOCId: number | null;
            delayCategory: string | null;
            operation: string | null;
            nptHours: string | null;
            nptType: string | null;
            sourceType: string | null;
            sourceId: number | null;
            dateOfNPT: Date | null;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    getSummary(rigId?: number, startDate?: string, endDate?: string): Promise<{
        total: number;
        totalHours: number;
        totalCost: number;
    }>;
    getTrend(rigId?: number, months?: number): Promise<{
        month: string;
        hours: number;
        cost: number;
    }[]>;
    getByCategory(): Promise<{
        category: string;
        hours: number;
        pct: number;
    }[]>;
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
    getMoaDelays(filters: any): Promise<{
        items: ({
            moa: {
                rig: {
                    manufacturer: string | null;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    createdById: number | null;
                    updatedById: number | null;
                    name: string | null;
                    status: string | null;
                    isRTM: boolean;
                    onContract: boolean | null;
                    category: string | null;
                    operatorId: number | null;
                    offContractDate: Date;
                    projectedUnLatchDate: Date | null;
                    operationStart: Date | null;
                    bop1Id: number | null;
                    bop2Id: number | null;
                    surfaceEquipmentId: number | null;
                    interventionStackId: number | null;
                    contractorId: number | null;
                    meetingId: number | null;
                    model: string | null;
                    visible: boolean;
                    manufacturerId: number | null;
                    bopType: string;
                    ezChartIPAddress: string | null;
                    projectedShipyardEndDate: Date | null;
                    actualShipyardEndDate: Date | null;
                    color: string | null;
                    piRigName: string | null;
                    canAccessPressureTest: boolean;
                    canAccessBRV: boolean | null;
                    rtmRigId: string | null;
                    sendStaleNotifications: boolean;
                    mpdId: number | null;
                    dhwId: number | null;
                    annularHealthConstantId: number | null;
                    mpdTypesId: number | null;
                    mpdManufacturersId: number | null;
                    hasDiverter: boolean | null;
                };
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                createdById: number;
                updatedById: number | null;
                rigId: number;
                bopType: string;
                isRemoved: boolean;
                availability: string;
                createdByRTOCId: number | null;
                updatedByRTOCId: number | null;
                failureId: number | null;
                delayCategory: string | null;
                startDateTime: Date;
                expectedReadyDateTime: Date | null;
                targetDateTime: Date | null;
                startComment: string | null;
                stopDateTime: Date | null;
                stopComment: string | null;
                percentage: string | null;
                adjustedPercentage: string | null;
                numberOfDelays: number;
                totalDelayHours: number;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            category: string | null;
            failureId: number | null;
            moaId: number;
            delayHours: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
}
