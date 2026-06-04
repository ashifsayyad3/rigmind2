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
            typeCode: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string | null;
                bopType: string | null;
                subType: string | null;
            } | null;
            attachments: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                createdById: number | null;
                updatedById: number | null;
                attachmentId: number;
                expirationDate: Date;
                certificateId: number;
                certificateType: string | null;
                isDeleted: boolean;
            }[];
        } & {
            manufacturer: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            rigId: number;
            installationDate: Date | null;
            equipment: string | null;
            typeCodeId: number | null;
            serialNumber: string | null;
            tag: string | null;
            partNumber: string | null;
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
            manufacturer: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            rigId: number;
            installationDate: Date | null;
            equipment: string | null;
            typeCodeId: number | null;
            serialNumber: string | null;
            tag: string | null;
            partNumber: string | null;
            rigCertificateComponentId: number | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        createdById: number | null;
        updatedById: number | null;
        attachmentId: number;
        expirationDate: Date;
        certificateId: number;
        certificateType: string | null;
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
        typeCode: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            bopType: string | null;
            subType: string | null;
        } | null;
        attachments: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            createdById: number | null;
            updatedById: number | null;
            attachmentId: number;
            expirationDate: Date;
            certificateId: number;
            certificateType: string | null;
            isDeleted: boolean;
        }[];
    } & {
        manufacturer: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        rigId: number;
        installationDate: Date | null;
        equipment: string | null;
        typeCodeId: number | null;
        serialNumber: string | null;
        tag: string | null;
        partNumber: string | null;
        rigCertificateComponentId: number | null;
    }>;
}
