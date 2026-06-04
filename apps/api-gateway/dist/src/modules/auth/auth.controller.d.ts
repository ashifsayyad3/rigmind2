import { AuthService } from './auth.service';
declare class LoginDto {
    email: string;
    password: string;
}
declare class RefreshTokenDto {
    refreshToken: string;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
            canAccessAllRigs: any;
        };
    }>;
    refresh(dto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
            canAccessAllRigs: any;
        };
    }>;
    getProfile(user: any): Promise<({
        role: {
            log: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            enabled: boolean;
            createdById: number | null;
            updatedById: number | null;
            name: string | null;
            title: string | null;
            access: string | null;
            position: number | null;
            canAccessAdminPanel: boolean;
        } | null;
        userRigs: ({
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
            userId: number;
            rigId: number;
        })[];
    } & {
        id: number;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        phoneNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
        roleId: number | null;
        canAccessAllRigs: boolean;
        lastActive: Date | null;
        enabled: boolean;
        company: string | null;
        taggable: boolean;
        notify: boolean;
        deleted: boolean;
        isSurveyor: boolean;
        createdById: number | null;
        updatedById: number | null;
    }) | null>;
}
export {};
