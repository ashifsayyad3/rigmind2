import { WellsService } from './wells.service';
export declare class WellsController {
    private readonly svc;
    constructor(svc: WellsService);
    findAll(f: any): Promise<{
        items: ({
            rigWellChanges: ({
                rig: {
                    id: number;
                    name: string | null;
                };
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                date: Date;
                wellId: number | null;
                rigId: number;
                wellSessionId: number | null;
                operationStartDate: Date | null;
            })[];
            _count: {
                rigWellChanges: number;
            };
        } & {
            id: number;
            name: string;
            depth: number | null;
            region: string | null;
            createdAt: Date;
            updatedAt: Date;
            field: string | null;
            availability: string;
            isRemoved: boolean;
            createdById: number | null;
            updatedById: number | null;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: number): Promise<{
        rigWellChanges: ({
            rig: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date;
                createdById: number | null;
                updatedById: number | null;
                onContract: boolean | null;
                offContractDate: Date;
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
                bopType: string;
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
            createdAt: Date;
            updatedAt: Date;
            date: Date;
            wellId: number | null;
            rigId: number;
            wellSessionId: number | null;
            operationStartDate: Date | null;
        })[];
        wellSessions: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            createdById: number;
            updatedById: number | null;
            wellId: number;
            rigId: number;
            wellSessionStartDate: Date | null;
            hasWellSessionEnded: boolean;
            wellSessionEndDate: Date | null;
            hasWellHopEvent: boolean;
            initialEquipment: string | null;
        }[];
    } & {
        id: number;
        name: string;
        depth: number | null;
        region: string | null;
        createdAt: Date;
        updatedAt: Date;
        field: string | null;
        availability: string;
        isRemoved: boolean;
        createdById: number | null;
        updatedById: number | null;
    }>;
}
