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
            id: number;
            rigId: number;
            bopType: string;
            delayCategory: string | null;
            operation: string | null;
            nptHours: string | null;
            comment: string | null;
            nptType: string | null;
            sourceType: string | null;
            sourceId: number | null;
            createdById: number;
            updatedById: number | null;
            createdByRTOCId: number | null;
            updatedByRTOCId: number | null;
            createdAt: Date;
            updatedAt: Date;
            dateOfNPT: Date | null;
            availability: string;
            isRemoved: boolean;
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
    getMoaDelays(filters: any): Promise<{
        items: ({
            moa: {
                rig: {
                    id: number;
                    bopType: string;
                    createdById: number | null;
                    updatedById: number | null;
                    createdAt: Date;
                    updatedAt: Date;
                    onContract: boolean | null;
                    offContractDate: Date;
                    name: string | null;
                    status: string | null;
                    projectedUnLatchDate: Date | null;
                    operationStart: Date | null;
                    bop1Id: number | null;
                    bop2Id: number | null;
                    surfaceEquipmentId: number | null;
                    interventionStackId: number | null;
                    contractorId: number | null;
                    meetingId: number | null;
                    manufacturer: string | null;
                    model: string | null;
                    visible: boolean;
                    manufacturerId: number | null;
                    ezChartIPAddress: string | null;
                    projectedShipyardEndDate: Date | null;
                    actualShipyardEndDate: Date | null;
                    isRTM: boolean;
                    color: string | null;
                    piRigName: string | null;
                    category: string | null;
                    canAccessPressureTest: boolean;
                    canAccessBRV: boolean | null;
                    rtmRigId: string | null;
                    sendStaleNotifications: boolean;
                    mpdId: number | null;
                    operatorId: number | null;
                    dhwId: number | null;
                    annularHealthConstantId: number | null;
                    mpdTypesId: number | null;
                    mpdManufacturersId: number | null;
                    hasDiverter: boolean | null;
                };
            } & {
                id: number;
                rigId: number;
                bopType: string;
                delayCategory: string | null;
                createdById: number;
                updatedById: number | null;
                createdByRTOCId: number | null;
                updatedByRTOCId: number | null;
                createdAt: Date;
                updatedAt: Date;
                availability: string;
                isRemoved: boolean;
                failureId: number | null;
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
            moaId: number;
            delayHours: string | null;
            failureId: number | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
}
