import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BopService } from './bop.service';

@ApiTags('BOP Management')
@ApiBearerAuth('JWT')
@Controller({ path: 'bop', version: '1' })
export class BopController {
  constructor(private readonly svc: BopService) {}
  @Get() findAll(@Query() f: any) { return this.svc.findAll(f); }
  @Get('events') getEvents(@Query('rigId') rigId?: number, @Query('bopId') bopId?: number) { return this.svc.getEvents(rigId ? Number(rigId) : undefined, bopId ? Number(bopId) : undefined); }
  @Get('changes') getChanges(@Query('rigId') rigId?: number) { return this.svc.getChanges(rigId ? Number(rigId) : undefined); }
  @Get('active-assignments') getActive(@Query('rigId') rigId?: number) { return this.svc.getActiveAssignments(rigId ? Number(rigId) : undefined); }
}
