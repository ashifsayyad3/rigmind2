import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly svc;
    constructor(svc: NotificationsService);
    findAll(u: any, unreadOnly?: boolean): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: string | null;
        eventId: number | null;
        title: string | null;
        message: string | null;
        assignedAs: string | null;
        userId: number | null;
        completeDate: Date | null;
    }[]>;
    getCount(u: any): Promise<number>;
    markRead(id: number, u: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: string | null;
        eventId: number | null;
        title: string | null;
        message: string | null;
        assignedAs: string | null;
        userId: number | null;
        completeDate: Date | null;
    }>;
    markAllRead(u: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
