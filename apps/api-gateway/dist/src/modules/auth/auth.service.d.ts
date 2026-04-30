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
                    task: string | null;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    type: string | null;
                    can: string | null;
                } | null;
            } & {
                id: number;
                roleId: number | null;
                createdAt: Date;
                updatedAt: Date;
                createdById: number | null;
                permissionId: number | null;
            })[];
        } & {
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
        }) | null;
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
    validateAzureUser(profile: any): Promise<{
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
    }>;
}
