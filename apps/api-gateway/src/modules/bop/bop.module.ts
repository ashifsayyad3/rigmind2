import { Module } from '@nestjs/common';
import { BopController } from './bop.controller';
import { BopService } from './bop.service';

@Module({ controllers: [BopController], providers: [BopService], exports: [BopService] })
export class BopModule {}
