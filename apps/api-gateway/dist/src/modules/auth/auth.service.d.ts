import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
export interface JwtPayload {
    sub: number;
    email: string;
    roleId: number | null;
    roleName: string | null;
    iat?: number;
    exp?: number;
}
export declare class AuthService {
    private prisma;
    private jwtService;
    private config;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService);
    validateUser(email: string, password: string): Promise<{
        role: ({
            rolePermissions: ({
                permission: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    type: string | null;
                    task: string | null;
                    can: string | null;
                };
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                createdById: number | null;
                roleId: number;
                permissionId: number;
            })[];
        } & {
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
        }) | null;
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
    }>;
    login(user: any): Promise<{
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
    refreshToken(token: string): Promise<{
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
    getProfile(userId: number): Promise<({
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
    validateAzureUser(profile: any): Promise<{
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
    }>;
}
