import { Controller, Get, Put, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Notifications')
@ApiBearerAuth('JWT')
@Controller({ path: 'notifications', version: '1' })
export class NotificationsController {
  constructor(private readonly svc: NotificationsService) {}
  @Get()
  findAll(@CurrentUser() u: any, @Query('unreadOnly') unreadOnly?: boolean) {
    return this.svc.findForUser(u?.id ?? 1, unreadOnly);
  }
  @Get('unread-count')
  getCount(@CurrentUser() u: any) { return this.svc.getUnreadCount(u?.id ?? 1); }
  // mark-all-read MUST be before :id/read to avoid route conflict
  @Put('read-all')
  markAllReadAlias(@CurrentUser() u: any) { return this.svc.markAllRead(u?.id ?? 1); }
  @Put('mark-all-read')
  markAllRead(@CurrentUser() u: any) { return this.svc.markAllRead(u?.id ?? 1); }
  @Put(':id/read')
  markRead(@Param('id', ParseIntPipe) id: number, @CurrentUser() u: any) { return this.svc.markRead(id, u?.id ?? 1); }
}
