import { PrismaService } from '../../prisma/prisma.service';
export declare class WellsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters: {
        availability?: string;
        region?: string;
        field?: string;
        page?: number;
        limit?: number;
    }): Promise<{
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
            name: string;
            createdById: number | null;
            updatedById: number | null;
            availability: string;
            isRemoved: boolean;
            depth: number | null;
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
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string | null;
                projectedUnLatchDate: Date | null;
                rtmRigId: string | null;
                createdById: number | null;
                updatedById: number | null;
                onContract: boolean | null;
                offContractDate: Date;
                status: string | null;
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
            rigId: number;
            createdById: number;
            updatedById: number | null;
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
        name: string;
        createdById: number | null;
        updatedById: number | null;
        availability: string;
        isRemoved: boolean;
        depth: number | null;
        region: string | null;
        field: string | null;
    }>;
}
