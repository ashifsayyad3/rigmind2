import { Module } from '@nestjs/common';
import { RigsController } from './rigs.controller';
import { RigsService } from './rigs.service';

@Module({
  controllers: [RigsController],
  providers: [RigsService],
  exports: [RigsService],
})
export class RigsModule {}
