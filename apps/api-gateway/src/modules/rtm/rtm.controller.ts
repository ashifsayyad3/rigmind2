import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RtmService } from './rtm.service';

@ApiTags('RTM Telemetry')
@ApiBearerAuth('JWT')
@Controller({ path: 'rtm', version: '1' })
export class RtmController {
  constructor(private readonly svc: RtmService) {}

  @Get('fleet') getFleetSnapshot() { return this.svc.getFleetSnapshot(); }
  @Get('rig/:id') getRigState(@Param('id', ParseIntPipe) id: number) { return this.svc.getRigRtmState(id); }
  @Get('rig/:id/sensor/:tag') getSensorHistory(
    @Param('id', ParseIntPipe) id: number,
    @Param('tag') tag: string,
    @Query('hours') hours?: number,
  ) { return this.svc.getSensorHistory(id, tag, hours ? Number(hours) : 24); }
  @Get('rig/:id/alarms') getAlarmHistory(@Param('id', ParseIntPipe) id: number) { return this.svc.getAlarmHistory(id); }
}
