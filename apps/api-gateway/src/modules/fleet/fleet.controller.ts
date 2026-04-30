import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FleetService } from './fleet.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Fleet Intelligence')
@ApiBearerAuth('JWT')
@Controller({ path: 'fleet', version: '1' })
export class FleetController {
  constructor(private readonly svc: FleetService) {}

  @Get('metrics')
  @ApiOperation({ summary: 'Get fleet-wide health metrics for executive dashboard' })
  getMetrics() {
    return this.svc.getFleetHealthMetrics();
  }

  @Get('health-scores')
  @ApiOperation({ summary: 'Get per-rig health scores with 5-dimension scoring' })
  getHealthScores(@CurrentUser() user: any) {
    return this.svc.getRigHealthScores(user.accessibleRigIds);
  }
}
