import { Module } from '@nestjs/common';
import { NptController } from './npt.controller';
import { NptService } from './npt.service';

@Module({
  controllers: [NptController],
  providers: [NptService],
  exports: [NptService],
})
export class NptModule {}
