import {
  Controller, Get, Post, Put, Delete, Body, Param, Query,
  ParseIntPipe, HttpCode, HttpStatus, Version,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { FailuresService, FailureFilterDto } from './failures.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Failures')
@ApiBearerAuth('JWT')
@Controller({ path: 'failures', version: '1' })
export class FailuresController {
  constructor(private readonly svc: FailuresService) {}

  @Get()
  @ApiOperation({ summary: 'List failures with filters and pagination' })
  @ApiQuery({ name: 'rigId', required: false, type: Number })
  @ApiQuery({ name: 'severity', required: false, enum: ['critical', 'high', 'medium', 'low'] })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'isNPT', required: false, type: Boolean })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false })
  findAll(@Query() filters: FailureFilterDto, @CurrentUser() user: any) {
    return this.svc.findAll(filters, user.id, user.accessibleRigIds);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get failure statistics and trends' })
  getStats(@Query('rigId') rigId?: number) {
    return this.svc.getStats(rigId ? Number(rigId) : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get failure detail with full timeline' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Get(':id/similar')
  @ApiOperation({ summary: 'Find similar failures by component/mode' })
  getSimilar(@Param('id', ParseIntPipe) id: number) {
    return this.svc.getSimilarFailures(id);
  }

  @Get(':id/timeline')
  @ApiOperation({ summary: 'Get full failure event timeline' })
  getTimeline(@Param('id', ParseIntPipe) id: number) {
    return this.svc.getTimeline(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new failure record' })
  create(@Body() body: any, @CurrentUser() user: any) {
    return this.svc.create(body, user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a failure record' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @CurrentUser() user: any,
  ) {
    return this.svc.update(id, body, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Soft-delete a failure record' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: any) {
    return this.svc.remove(id, user.id);
  }
}
