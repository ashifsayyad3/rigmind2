import { WellsService } from './wells.service';
export declare class WellsController {
    private readonly svc;
    constructor(svc: WellsService);
    findAll(f: any): Promise<{
        items: ({
            _count: {
                rigWellChanges: number;
            };
            rigWellChanges: ({
                rig: {
                    id: number;
                    name: string | null;
                };
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                rigId: number;
                wellId: number | null;
                date: Date;
                wellSessionId: number | null;
                operationStartDate: Date | null;
            })[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            createdById: number | null;
            updatedById: number | null;
            name: string;
            isRemoved: boolean;
            depth: number | null;
            availability: string;
            region: string | null;
            field: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: number): Promise<{
        rigWellChanges: ({
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
            rigId: number;
            wellId: number | null;
            date: Date;
            wellSessionId: number | null;
            operationStartDate: Date | null;
        })[];
        wellSessions: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            createdById: number;
            updatedById: number | null;
            rigId: number;
            wellId: number;
            wellSessionStartDate: Date | null;
            hasWellSessionEnded: boolean;
            wellSessionEndDate: Date | null;
            hasWellHopEvent: boolean;
            initialEquipment: string | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        createdById: number | null;
        updatedById: number | null;
        name: string;
        isRemoved: boolean;
        depth: number | null;
        availability: string;
        region: string | null;
        field: string | null;
    }>;
}
