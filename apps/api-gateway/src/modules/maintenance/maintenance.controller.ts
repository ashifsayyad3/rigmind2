import { Controller, Get, Put, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MaintenanceService } from './maintenance.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Maintenance')
@ApiBearerAuth('JWT')
@Controller({ path: 'maintenance', version: '1' })
export class MaintenanceController {
  constructor(private readonly svc: MaintenanceService) {}
  @Get('deferred') getDeferredTasks(@Query() f: any) { return this.svc.getDeferredTasks(f); }
  @Get('overdue') getOverdue(@Query('rigId') rigId?: number) { return this.svc.getOverdueTasks(rigId ? Number(rigId) : undefined); }
  @Get('stats') getStats(@Query('rigId') rigId?: number) { return this.svc.getStats(rigId ? Number(rigId) : undefined); }
  @Get('history/component/:id') getHistory(@Param('id', ParseIntPipe) id: number) { return this.svc.getMaintenanceHistory(id); }
  @Put('deferred/:id/close') closeTask(@Param('id', ParseIntPipe) id: number, @CurrentUser() u: any) { return this.svc.closeDeferredTask(id, u.id); }
}
