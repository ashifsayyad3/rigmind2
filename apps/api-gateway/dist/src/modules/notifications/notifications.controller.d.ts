import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly svc;
    constructor(svc: NotificationsService);
    findAll(u: any, unreadOnly?: boolean): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        userId: number | null;
        status: string | null;
        message: string | null;
        assignedAs: string | null;
        eventId: number | null;
        completeDate: Date | null;
    }[]>;
    getCount(u: any): Promise<number>;
    markAllReadAlias(u: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    markAllRead(u: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    markRead(id: number, u: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        userId: number | null;
        status: string | null;
        message: string | null;
        assignedAs: string | null;
        eventId: number | null;
        completeDate: Date | null;
    }>;
}
