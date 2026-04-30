import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { WellsService } from './wells.service';

@ApiTags('Wells')
@ApiBearerAuth('JWT')
@Controller({ path: 'wells', version: '1' })
export class WellsController {
  constructor(private readonly svc: WellsService) {}
  @Get() findAll(@Query() f: any) { return this.svc.findAll(f); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.svc.findOne(id); }
}
