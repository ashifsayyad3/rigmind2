import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { BearerStrategy } from 'passport-azure-ad';
import { AuthService } from '../auth.service';

@Injectable()
export class AzureAdStrategy extends PassportStrategy(BearerStrategy, 'azure-ad') {
  constructor(config: ConfigService, private authService: AuthService) {
    super({
      identityMetadata: `https://login.microsoftonline.com/${config.get('AZURE_TENANT_ID')}/v2.0/.well-known/openid-configuration`,
      clientID: config.get('AZURE_CLIENT_ID'),
      audience: config.get('AZURE_CLIENT_ID'),
      loggingLevel: 'error',
      validateIssuer: true,
      passReqToCallback: false,
    });
  }

  async validate(profile: any) {
    return this.authService.validateAzureUser(profile);
  }
}
