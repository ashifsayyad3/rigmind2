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
        userRigs: ({
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
            userId: number;
        })[];
        role: {
            log: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            createdById: number | null;
            updatedById: number | null;
            enabled: boolean;
            title: string | null;
            access: string | null;
            position: number | null;
            canAccessAdminPanel: boolean;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        createdById: number | null;
        updatedById: number | null;
        enabled: boolean;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        phoneNumber: string | null;
        roleId: number | null;
        canAccessAllRigs: boolean;
        lastActive: Date | null;
        company: string | null;
        taggable: boolean;
        notify: boolean;
        deleted: boolean;
        isSurveyor: boolean;
    }) | null>;
}
export {};
