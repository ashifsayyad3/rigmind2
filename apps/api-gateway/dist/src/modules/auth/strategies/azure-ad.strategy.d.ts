import { ConfigService } from '@nestjs/config';
import { BearerStrategy } from 'passport-azure-ad';
import { AuthService } from '../auth.service';
declare const AzureAdStrategy_base: new (...args: any[]) => BearerStrategy;
export declare class AzureAdStrategy extends AzureAdStrategy_base {
    private authService;
    private static readonly logger;
    constructor(config: ConfigService, authService: AuthService);
    validate(profile: any): Promise<{
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
    }>;
}
export {};
