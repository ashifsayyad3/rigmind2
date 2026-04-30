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
            enabled: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            title: string | null;
            access: string | null;
            position: number;
            canAccessAdminPanel: boolean;
        } | null;
        userRigs: ({
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
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string | null;
        roleId: number | null;
        canAccessAllRigs: boolean;
        lastActive: Date | null;
        deleted: boolean;
        enabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
}
export {};
