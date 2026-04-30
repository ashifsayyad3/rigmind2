import { ConfigService } from '@nestjs/config';
import { BearerStrategy } from 'passport-azure-ad';
import { AuthService } from '../auth.service';
declare const AzureAdStrategy_base: new (...args: any[]) => BearerStrategy;
export declare class AzureAdStrategy extends AzureAdStrategy_base {
    private authService;
    constructor(config: ConfigService, authService: AuthService);
    validate(profile: any): Promise<{
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
export {};
