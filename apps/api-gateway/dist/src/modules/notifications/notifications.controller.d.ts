import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly svc;
    constructor(svc: NotificationsService);
    findAll(u: any, unreadOnly?: boolean): Promise<{
        id: number;
        title: string | null;
        message: string | null;
        status: string | null;
        assignedAs: string | null;
        userId: number | null;
        eventId: number | null;
        createdAt: Date;
        updatedAt: Date;
        completeDate: Date | null;
    }[]>;
    getCount(u: any): Promise<number>;
    markAllReadAlias(u: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    markAllRead(u: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    markRead(id: number, u: any): Promise<{
        id: number;
        title: string | null;
        message: string | null;
        status: string | null;
        assignedAs: string | null;
        userId: number | null;
        eventId: number | null;
        createdAt: Date;
        updatedAt: Date;
        completeDate: Date | null;
    }>;
}
