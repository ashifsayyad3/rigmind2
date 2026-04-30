import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { KpiService } from './kpi.service';

@ApiTags('KPI')
@ApiBearerAuth('JWT')
@Controller({ path: 'kpi', version: '1' })
export class KpiController {
  constructor(private readonly svc: KpiService) {}
  @Get('fleet') getFleet() { return this.svc.getFleetKpi(); }
  @Get('rig/:id') getRig(@Param('id', ParseIntPipe) id: number) { return this.svc.getForRig(id); }
}
