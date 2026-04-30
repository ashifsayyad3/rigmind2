import { CertificatesService } from './certificates.service';
export declare class CertificatesController {
    private readonly svc;
    constructor(svc: CertificatesService);
    findAll(filters: any): Promise<{
        items: ({
            rig: {
                id: number;
                name: string;
            } | null;
            typeCode: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                bopType: string | null;
                subType: string | null;
            } | null;
            attachments: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                updatedById: number | null;
                createdById: number | null;
                isDeleted: boolean;
                expirationDate: Date | null;
                certificateId: number | null;
                certificateType: string | null;
                attachmentId: number | null;
            }[];
        } & {
            manufacturer: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            rigId: number | null;
            status: string | null;
            serialNumber: string | null;
            equipment: string | null;
            typeCodeId: number | null;
            tag: string | null;
            partNumber: string | null;
            expiryDate: Date | null;
            issuedDate: Date | null;
            isDeleted: boolean;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    getExpiryDashboard(rigId?: number): Promise<{
        expired: number;
        expiring30: number;
        expiring60: number;
        expiring90: number;
        byRig: {
            rigName: string;
            expiringCount: number;
        }[];
    }>;
    findOne(id: number): Promise<{
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
        typeCode: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            bopType: string | null;
            subType: string | null;
        } | null;
        attachments: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            updatedById: number | null;
            createdById: number | null;
            isDeleted: boolean;
            expirationDate: Date | null;
            certificateId: number | null;
            certificateType: string | null;
            attachmentId: number | null;
        }[];
    } & {
        manufacturer: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        rigId: number | null;
        status: string | null;
        serialNumber: string | null;
        equipment: string | null;
        typeCodeId: number | null;
        tag: string | null;
        partNumber: string | null;
        expiryDate: Date | null;
        issuedDate: Date | null;
        isDeleted: boolean;
    }>;
}
