import { Module } from '@nestjs/common';
import { RtmGateway } from './rtm.gateway';
import { RtmService } from './rtm.service';
import { RtmController } from './rtm.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [RtmController],
  providers: [RtmGateway, RtmService],
  exports: [RtmService],
})
export class RtmModule {}
