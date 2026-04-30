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
                    name: string;
                } | null;
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                rigId: number | null;
                wellId: number | null;
                date: Date | null;
                wellSessionId: number | null;
                operationStartDate: Date | null;
            })[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            rigId: number | null;
            isRemoved: boolean;
            createdById: number | null;
            availability: string | null;
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
            wellId: number | null;
            date: Date | null;
            wellSessionId: number | null;
            operationStartDate: Date | null;
        })[];
        wellSessions: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            rigId: number | null;
            updatedById: number | null;
            createdById: number | null;
            wellId: number | null;
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
        rigId: number | null;
        isRemoved: boolean;
        createdById: number | null;
        availability: string | null;
        depth: number | null;
        region: string | null;
        field: string | null;
    }>;
}
