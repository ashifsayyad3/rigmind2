import { CopilotService } from './copilot.service';
declare class AskDto {
    question: string;
    conversationHistory?: Array<{
        role: 'user' | 'assistant';
        content: string;
    }>;
}
export declare class CopilotController {
    private readonly svc;
    constructor(svc: CopilotService);
    ask(dto: AskDto): Promise<{
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
    generateReport(rigId: number): Promise<{
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
export {};
