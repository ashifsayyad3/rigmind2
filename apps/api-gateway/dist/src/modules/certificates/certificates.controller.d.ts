import { CertificatesService } from './certificates.service';
export declare class CertificatesController {
    private readonly svc;
    constructor(svc: CertificatesService);
    findAll(filters: any): Promise<{
        items: ({
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
            rig: {
                id: number;
                name: string | null;
            };
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
            rigId: number;
            equipment: string | null;
            typeCodeId: number | null;
            serialNumber: string | null;
            tag: string | null;
            manufacturer: string | null;
            createdAt: Date;
            updatedAt: Date;
            partNumber: string | null;
            installationDate: Date | null;
            rigCertificateComponentId: number | null;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    getExpiring(days?: number): Promise<({
        certificate: {
            rig: {
                id: number;
                name: string | null;
            };
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
            rigId: number;
            equipment: string | null;
            typeCodeId: number | null;
            serialNumber: string | null;
            tag: string | null;
            manufacturer: string | null;
            createdAt: Date;
            updatedAt: Date;
            partNumber: string | null;
            installationDate: Date | null;
            rigCertificateComponentId: number | null;
        };
    } & {
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
    })[]>;
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
        rig: {
            id: number;
            manufacturer: string | null;
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
            createdById: number | null;
            updatedById: number | null;
        };
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
        rigId: number;
        equipment: string | null;
        typeCodeId: number | null;
        serialNumber: string | null;
        tag: string | null;
        manufacturer: string | null;
        createdAt: Date;
        updatedAt: Date;
        partNumber: string | null;
        installationDate: Date | null;
        rigCertificateComponentId: number | null;
    }>;
}
