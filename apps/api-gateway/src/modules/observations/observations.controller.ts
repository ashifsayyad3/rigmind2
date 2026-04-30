import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ObservationsService } from './observations.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Observations')
@ApiBearerAuth('JWT')
@Controller({ path: 'observations', version: '1' })
export class ObservationsController {
  constructor(private readonly svc: ObservationsService) {}

  @Get() findAll(@Query() filters: any) { return this.svc.findAll(filters); }
  @Get('stats') getStats() { return this.svc.getStats(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.svc.findOne(id); }
  @Post() create(@Body() body: any, @CurrentUser() user: any) { return this.svc.create(body, user.id); }
  @Put(':id') update(@Param('id', ParseIntPipe) id: number, @Body() body: any, @CurrentUser() user: any) { return this.svc.update(id, body, user.id); }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: any) { return this.svc.remove(id, user.id); }
}
