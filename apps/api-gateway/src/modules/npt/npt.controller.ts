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
