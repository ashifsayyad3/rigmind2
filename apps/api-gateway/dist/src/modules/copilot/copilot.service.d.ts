import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CopilotService {
    private prisma;
    private config;
    private readonly logger;
    private readonly anthropic;
    constructor(prisma: PrismaService, config: ConfigService);
    private get isConfigured();
    private isSafeQuery;
    ask(question: string, conversationHistory: Array<{
        role: 'user' | 'assistant';
        content: string;
    }>): Promise<{
        answer: string;
        sql: null;
        rows: never[];
        rowCount: number;
        question?: undefined;
        explanation?: undefined;
        intent?: undefined;
        queryError?: undefined;
    } | {
        question: string;
        answer: any;
        sql: string;
        explanation: string;
        intent: string;
        rows: any[];
        rowCount: number;
        queryError: string | null;
    }>;
    generateRigReport(rigId: number): Promise<{
        rigId: number;
        rigName: any;
        report: any;
        dataSnapshot: {
            health: any;
            openFailures: number;
        };
        generatedAt: string;
    }>;
}
