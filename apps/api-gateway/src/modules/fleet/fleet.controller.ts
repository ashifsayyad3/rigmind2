import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FleetService } from './fleet.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Fleet Intelligence')
@ApiBearerAuth('JWT')
@Controller({ path: 'fleet', version: '1' })
export class FleetController {
  constructor(private readonly svc: FleetService) {}

  // GET /api/v1/fleet/health — main dashboard metrics
  @Get('health')
  @ApiOperation({ summary: 'Get fleet-wide health metrics' })
  getHealth() {
    return this.svc.getFleetHealthMetrics();
  }

  // GET /api/v1/fleet/metrics — alias
  @Get('metrics')
  @ApiOperation({ summary: 'Get fleet-wide health metrics (alias)' })
  getMetrics() {
    return this.svc.getFleetHealthMetrics();
  }

  // GET /api/v1/fleet/map — rig positions for globe map
  @Get('map')
  @ApiOperation({ summary: 'Get rig positions for global map' })
  getMap() {
    return this.svc.getGlobalMap();
  }

  // GET /api/v1/fleet/health-history — trend data
  @Get('health-history')
  @ApiOperation({ summary: 'Get fleet health score history' })
  getHealthHistory(@Query('days') days = 30) {
    return this.svc.getHealthHistory(+days);
  }

  // GET /api/v1/fleet/predictions — AI failure predictions
  @Get('predictions')
  @ApiOperation({ summary: 'Get fleet failure predictions' })
  getPredictions() {
    return this.svc.getFailurePredictions();
  }

  // GET /api/v1/fleet/health-scores — per-rig scores
  @Get('health-scores')
  @ApiOperation({ summary: 'Get per-rig health scores' })
  getHealthScores(@CurrentUser() user: any) {
    return this.svc.getRigHealthScores(user?.accessibleRigIds ?? null);
  }
}
