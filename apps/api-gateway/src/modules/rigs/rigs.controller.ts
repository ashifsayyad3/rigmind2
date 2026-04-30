import { Controller, Get, Put, Param, Query, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RigsService } from './rigs.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Rigs')
@ApiBearerAuth('JWT')
@Controller({ path: 'rigs', version: '1' })
export class RigsController {
  constructor(private readonly svc: RigsService) {}

  @Get()
  @ApiOperation({ summary: 'List all accessible rigs' })
  findAll(@Query() filters: any, @CurrentUser() user: any) {
    return this.svc.findAll(filters, user.accessibleRigIds);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get full rig detail' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Get(':id/health')
  @ApiOperation({ summary: 'Get rig health snapshot' })
  getHealth(@Param('id', ParseIntPipe) id: number) {
    return this.svc.getHealthSnapshot(id);
  }

  @Get(':id/current-well')
  @ApiOperation({ summary: 'Get the currently active well for this rig' })
  getCurrentWell(@Param('id', ParseIntPipe) id: number) {
    return this.svc.getCurrentWell(id);
  }

  @Get(':id/status-history')
  @ApiOperation({ summary: 'Get rig status change history' })
  getStatusHistory(@Param('id', ParseIntPipe) id: number) {
    return this.svc.getStatusHistory(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update rig details' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @CurrentUser() user: any,
  ) {
    return this.svc.update(id, body, user.id);
  }
}
