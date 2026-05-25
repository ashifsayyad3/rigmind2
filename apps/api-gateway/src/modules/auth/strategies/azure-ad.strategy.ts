import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { BearerStrategy } from 'passport-azure-ad';
import { AuthService } from '../auth.service';

const PLACEHOLDER = 'your-';

@Injectable()
export class AzureAdStrategy extends PassportStrategy(BearerStrategy, 'azure-ad') {
  private static readonly logger = new Logger(AzureAdStrategy.name);

  constructor(config: ConfigService, private authService: AuthService) {
    const clientID = config.get<string>('AZURE_AD_CLIENT_ID') ?? '';
    const tenantID = config.get<string>('AZURE_AD_TENANT_ID') ?? 'common';
    const configured = clientID && !clientID.startsWith(PLACEHOLDER);

    if (!configured) {
      AzureAdStrategy.logger.warn('AZURE_AD_CLIENT_ID not configured — Azure AD SSO disabled');
    }

    super({
      identityMetadata: `https://login.microsoftonline.com/${tenantID}/v2.0/.well-known/openid-configuration`,
      clientID: configured ? clientID : 'disabled',
      audience:  configured ? clientID : 'disabled',
      loggingLevel: 'error',
      validateIssuer: configured,
      passReqToCallback: false,
    });
  }

  async validate(profile: any) {
    return this.authService.validateAzureUser(profile);
  }
}
