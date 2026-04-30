import { Controller, Get, Put, Param, Query, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RecommendationsService } from './recommendations.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('RCM Recommendations')
@ApiBearerAuth('JWT')
@Controller({ path: 'recommendations', version: '1' })
export class RecommendationsController {
  constructor(private readonly svc: RecommendationsService) {}

  @Get('reports') findReports(@Query() f: any) { return this.svc.findReports(f); }
  @Get('reports/:id') findOneReport(@Param('id', ParseIntPipe) id: number) { return this.svc.findOneReport(id); }
  @Get() findAll(@Query() f: any) { return this.svc.findRecommendations(f); }
  @Get('stats') getStats(@Query('rigId') rigId?: number) { return this.svc.getStats(rigId ? Number(rigId) : undefined); }
  @Put(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() body: { status: string }, @CurrentUser() user: any) {
    return this.svc.updateRecommendationStatus(id, body.status, user.id);
  }
}
