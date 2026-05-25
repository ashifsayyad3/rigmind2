import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NptService } from './npt.service';

@ApiTags('NPT Intelligence')
@ApiBearerAuth('JWT')
@Controller({ path: 'npt', version: '1' })
export class NptController {
  constructor(private readonly svc: NptService) {}

  @Get()
  @ApiOperation({ summary: 'List NPT events with filters' })
  findAll(@Query() filters: any) {
    return this.svc.findAll(filters);
  }

  // Frontend: /api/v1/npt/summary
  @Get('summary')
  @ApiOperation({ summary: 'NPT summary totals' })
  getSummary(@Query('rigId') rigId?: number, @Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.svc.getSummary(rigId ? Number(rigId) : undefined, startDate, endDate);
  }

  // Frontend: /api/v1/npt/trend
  @Get('trend')
  @ApiOperation({ summary: 'NPT trend by month' })
  getTrend(@Query('rigId') rigId?: number, @Query('months') months = 6) {
    return this.svc.getTrend(rigId ? Number(rigId) : undefined, +months);
  }

  // Frontend: /api/v1/npt/by-category
  @Get('by-category')
  @ApiOperation({ summary: 'NPT hours grouped by category' })
  getByCategory() {
    return this.svc.getByCategory();
  }

  @Get('analytics')
  @ApiOperation({ summary: 'NPT analytics: trends, by category, by rig' })
  getAnalytics(@Query('rigId') rigId?: number) {
    return this.svc.getAnalytics(rigId ? Number(rigId) : undefined);
  }

  @Get('moa-delays')
  @ApiOperation({ summary: 'List MOA delays' })
  getMoaDelays(@Query() filters: any) {
    return this.svc.getMoaDelays(filters);
  }
}
