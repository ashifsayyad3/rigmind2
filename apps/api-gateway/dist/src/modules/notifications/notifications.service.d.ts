import { PrismaService } from '../../prisma/prisma.service';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findForUser(userId: number, unreadOnly?: boolean): Promise<{
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
    markRead(id: number, userId: number): Promise<{
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
    markAllRead(userId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getUnreadCount(userId: number): Promise<number>;
}
