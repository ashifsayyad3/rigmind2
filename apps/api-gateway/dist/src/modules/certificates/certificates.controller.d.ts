import { CertificatesService } from './certificates.service';
export declare class CertificatesController {
    private readonly svc;
    constructor(svc: CertificatesService);
    findAll(filters: any): Promise<{
        items: ({
            rig: {
                id: number;
                name: string | null;
            };
            attachments: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                createdById: number | null;
                updatedById: number | null;
                expirationDate: Date;
                certificateId: number;
                certificateType: string | null;
                attachmentId: number;
                isDeleted: boolean;
            }[];
            typeCode: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string | null;
                bopType: string | null;
                subType: string | null;
            } | null;
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            rigId: number;
            installationDate: Date | null;
            equipment: string | null;
            manufacturer: string | null;
            partNumber: string | null;
            serialNumber: string | null;
            typeCodeId: number | null;
            tag: string | null;
            rigCertificateComponentId: number | null;
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
        attachments: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            createdById: number | null;
            updatedById: number | null;
            expirationDate: Date;
            certificateId: number;
            certificateType: string | null;
            attachmentId: number;
            isDeleted: boolean;
        }[];
        typeCode: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            bopType: string | null;
            subType: string | null;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        rigId: number;
        installationDate: Date | null;
        equipment: string | null;
        manufacturer: string | null;
        partNumber: string | null;
        serialNumber: string | null;
        typeCodeId: number | null;
        tag: string | null;
        rigCertificateComponentId: number | null;
    }>;
}
