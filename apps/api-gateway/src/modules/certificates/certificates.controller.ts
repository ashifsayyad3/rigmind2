import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CertificatesService } from './certificates.service';

@ApiTags('Certificates')
@ApiBearerAuth('JWT')
@Controller({ path: 'certificates', version: '1' })
export class CertificatesController {
  constructor(private readonly svc: CertificatesService) {}

  @Get()
  @ApiOperation({ summary: 'List certificates with expiry filters' })
  findAll(@Query() filters: any) {
    return this.svc.findAll(filters);
  }

  @Get('expiring')
  @ApiOperation({ summary: 'Get certificates expiring within N days' })
  getExpiring(@Query('days') days = 60) {
    return this.svc.getExpiringSoon(+days);
  }

  @Get('expiry-dashboard')
  @ApiOperation({ summary: 'Certificate expiry heatmap dashboard' })
  getExpiryDashboard(@Query('rigId') rigId?: number) {
    return this.svc.getExpiryDashboard(rigId ? Number(rigId) : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get certificate detail with attachments' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }
}
