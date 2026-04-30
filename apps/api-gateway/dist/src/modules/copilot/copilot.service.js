"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CopilotService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopilotService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../prisma/prisma.service");
const sdk_1 = require("@anthropic-ai/sdk");
const SCHEMA_CONTEXT = `
DATABASE: Azure SQL — offshore oil & gas rig management platform (Aquila Engineering)

CORE TABLES:
rigs(id INT PK, name NVARCHAR, status NVARCHAR, onContract BIT, isRTM BIT, bopType NVARCHAR,
     operatorId INT FK→operators, bop1Id INT FK→bops, bop2Id INT FK→bops,
     manufacturer NVARCHAR, model NVARCHAR, category NVARCHAR, color NVARCHAR,
     operationStart DATETIMEOFFSET, offContractDate DATETIMEOFFSET, visible BIT,
     createdAt DATETIMEOFFSET, updatedAt DATETIMEOFFSET)

users(id INT PK, firstName NVARCHAR, lastName NVARCHAR, email NVARCHAR, roleId INT FK→roles,
      canAccessAllRigs BIT, enabled BIT, deleted BIT, lastActive DATETIMEOFFSET,
      company NVARCHAR, isSurveyor BIT)

roles(id INT PK, name NVARCHAR)
operators(id INT PK, name NVARCHAR, country NVARCHAR, contactId INT)
wells(id INT PK, name NVARCHAR, depth FLOAT, region NVARCHAR, field NVARCHAR,
      availability NVARCHAR, isRemoved BIT)
userRigs(id INT PK, userId INT FK→users, rigId INT FK→rigs)

FAILURES & ROOT CAUSE:
failures(id INT PK, rigId INT FK→rigs, title NVARCHAR, description NVARCHAR,
         cause NVARCHAR, mechanism NVARCHAR, failureType NVARCHAR, severity NVARCHAR,
         status NVARCHAR, dateOfFailure DATETIMEOFFSET, resolvedDate DATETIMEOFFSET,
         bopId INT FK→bops, componentId INT FK→components, failureModeId INT FK→failureModes,
         subUnitId INT FK→subUnits, wellId INT FK→wells, isNPT BIT, isRemoved BIT,
         availability NVARCHAR, equipmentType NVARCHAR, vendorOEM NVARCHAR,
         partNumber NVARCHAR, serialNumber NVARCHAR, repairLocation NVARCHAR,
         impactedFunctions NVARCHAR, indicationsSymptoms NVARCHAR,
         createdAt DATETIMEOFFSET, updatedAt DATETIMEOFFSET,
         createdById INT FK→users, updatedById INT FK→users)

failureModes(id INT PK, name NVARCHAR, category NVARCHAR)
failureObservations(id INT PK, failureId INT FK→failures, description NVARCHAR,
                    title NVARCHAR, status NVARCHAR, createdAt DATETIMEOFFSET)
correctiveActions(id INT PK, failureId INT FK→failures, description NVARCHAR,
                  status NVARCHAR, dueDate DATETIMEOFFSET, isRemoved BIT,
                  closedDate DATETIMEOFFSET, createdAt DATETIMEOFFSET)
linkedFailures(id INT PK, failure1Id INT FK→failures, failure2Id INT FK→failures)
lessonsLearned(id INT PK, failureId INT FK→failures, description NVARCHAR,
               createdAt DATETIMEOFFSET)

MAINTENANCE:
deferredMaintenanceTasks(id INT PK, rigId INT FK→rigs, issueId INT, issueType NVARCHAR,
                          isRemoved BIT, createdAt DATETIMEOFFSET, updatedAt DATETIMEOFFSET)
maintenanceTasks(id INT PK, componentName NVARCHAR, issueId INT, issueType NVARCHAR,
                 createdAt DATETIMEOFFSET)
componentMaintainanceHistory(id INT PK, componentId INT FK→components,
                              maintenanceDate DATETIMEOFFSET, description NVARCHAR)

BOP (Blowout Preventer):
bops(id INT PK, name NVARCHAR, type NVARCHAR, manufacturer NVARCHAR)
bopEvents(id INT PK, rigId INT FK→rigs, bopId INT FK→bops, eventType NVARCHAR,
          description NVARCHAR, createdAt DATETIMEOFFSET)
bopChanges(id INT PK, rigId INT FK→rigs, oldBopId INT FK→bops, newBopId INT FK→bops,
           changedAt DATETIMEOFFSET, reason NVARCHAR)
activeBOPAssignments(id INT PK, rigId INT FK→rigs, bopId INT FK→bops, isActive BIT,
                     assignedAt DATETIMEOFFSET)

NPT (Non-Production Time):
nonProductionTimes(id INT PK, rigId INT FK→rigs, bopType NVARCHAR,
                   delayCategory NVARCHAR, operation NVARCHAR, nptHours NVARCHAR,
                   comment NVARCHAR, nptType NVARCHAR, sourceType NVARCHAR,
                   sourceId INT, dateOfNPT DATETIMEOFFSET, availability NVARCHAR, isRemoved BIT,
                   createdById INT FK→users, updatedById INT FK→users)
nptFailures(id INT PK, nptId INT FK→nonProductionTimes, failureId INT FK→failures)
moas(id INT PK, rigId INT FK→rigs, description NVARCHAR, createdAt DATETIMEOFFSET)
moaDelays(id INT PK, moaId INT FK→moas, description NVARCHAR, hours FLOAT,
          createdAt DATETIMEOFFSET)

CERTIFICATES:
certificates(id INT PK, rigId INT FK→rigs, equipment NVARCHAR, serialNumber NVARCHAR,
             tag NVARCHAR, manufacturer NVARCHAR, typeCodeId INT FK→typeCodes,
             installationDate DATETIMEOFFSET, rigCertificateComponentId INT FK→rigCertificateComponents,
             createdAt DATETIMEOFFSET)
certificateAttachments(id INT PK, certificateId INT FK→certificates, fileName NVARCHAR,
                       fileUrl NVARCHAR, expiryDate DATETIMEOFFSET, issueDate DATETIMEOFFSET,
                       status NVARCHAR, createdAt DATETIMEOFFSET)
typeCodes(id INT PK, name NVARCHAR, code NVARCHAR, description NVARCHAR)
rigCertificateComponents(id INT PK, rigId INT FK→rigs, system NVARCHAR, subSystem NVARCHAR,
                          equipment NVARCHAR, component NVARCHAR, fleet NVARCHAR, included BIT)

COMPONENTS & EQUIPMENT:
components(id INT PK, name NVARCHAR, type NVARCHAR, manufacturer NVARCHAR,
           description NVARCHAR)
rigComponents(id INT PK, rigId INT FK→rigs, componentId INT FK→components,
              installDate DATETIMEOFFSET, isActive BIT)
subUnits(id INT PK, name NVARCHAR, componentId INT FK→components)
items(id INT PK, name NVARCHAR, subUnitId INT FK→subUnits)
parts(id INT PK, name NVARCHAR, itemId INT FK→items, partNumber NVARCHAR)
uniqueComponentNames(id INT PK, name NVARCHAR)

OBSERVATIONS:
observations(id INT PK, title NVARCHAR, description NVARCHAR, status NVARCHAR,
             dateOfObservation DATETIMEOFFSET, bopId INT FK→bops, componentId INT FK→components,
             wellId INT FK→wells, type NVARCHAR, correctionMethod NVARCHAR,
             correctionDescription NVARCHAR, availability NVARCHAR, isRemoved BIT,
             createdById INT FK→users)

RCM RECOMMENDATIONS:
rcmReports(id INT PK, rigId INT FK→rigs, title NVARCHAR, status NVARCHAR,
           createdAt DATETIMEOFFSET)
rcmRecommendations(id INT PK, reportId INT FK→rcmReports, description NVARCHAR,
                   priority NVARCHAR, status NVARCHAR, dueDate DATETIMEOFFSET)
rcmRecommendationFailureLink(id INT PK, recommendationId INT, failureId INT FK→failures)
rcmRecommendationObservationLink(id INT PK, recommendationId INT, observationId INT FK→observations)

KPI & ANALYTICS:
KPI(id INT PK, rigId INT FK→rigs, period NVARCHAR, availability FLOAT,
    utilizationRate FLOAT, nptHours FLOAT, failureCount INT,
    maintenanceCompliance FLOAT, createdAt DATETIMEOFFSET)
wellSessions(id INT PK, rigId INT FK→rigs, wellId INT FK→wells,
             startDate DATETIMEOFFSET, endDate DATETIMEOFFSET)
rigStatusChanges(id INT PK, rigId INT FK→rigs, oldStatus NVARCHAR, newStatus NVARCHAR,
                 createdAt DATETIMEOFFSET)
rigWellChanges(id INT PK, rigId INT FK→rigs, wellId INT FK→wells,
               date DATETIMEOFFSET, operationStartDate DATETIMEOFFSET)

RTM (Real-Time Monitoring):
rtm_EventData(id INT PK, rtmRigId VARCHAR, sensorId NVARCHAR, value FLOAT,
              timestamp DATETIMEOFFSET, eventType NVARCHAR, unit NVARCHAR)
rtm_EventData_History(id INT PK, rtmRigId VARCHAR, sensorId NVARCHAR, value FLOAT,
                       timestamp DATETIMEOFFSET)
rtm_AlarmConfiguration(id INT PK, rigId INT FK→rigs, sensorId NVARCHAR,
                        threshold FLOAT, alarmType NVARCHAR, enabled BIT)
sensorReadings(id INT PK, rigId INT FK→rigs, sensorTag NVARCHAR, value FLOAT,
               unit NVARCHAR, timestamp DATETIMEOFFSET, quality NVARCHAR)

USEFUL VIEWS:
currentWells — joins rigs to their most recent well from rigWellChanges
nonProductionTimeViews — nonProductionTimes enriched with rig name and user names

KEY ENUMERATIONS:
failures.severity: 'critical', 'high', 'medium', 'low'
failures.status: 'open', 'in_progress', 'closed', 'deferred'
observations.status: 'open', 'closed', 'in_progress'
nonProductionTimes.nptType: 'NPT', 'BOP_Maintenance', 'BOP_Test'
nonProductionTimes.availability: 'Available', 'Unavailable'
wells.availability: 'Available', 'Unavailable'
failures.availability: 'Available', 'Unavailable'
rcmRecommendations.priority: 'critical', 'high', 'medium', 'low'
`.trim();
const BLOCKED_KEYWORDS = [
    'INSERT', 'UPDATE', 'DELETE', 'DROP', 'TRUNCATE',
    'ALTER', 'CREATE', 'EXEC', 'EXECUTE', 'MERGE',
    'GRANT', 'REVOKE', 'SP_', 'XP_',
];
let CopilotService = CopilotService_1 = class CopilotService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
        this.logger = new common_1.Logger(CopilotService_1.name);
        const apiKey = config.get('ANTHROPIC_API_KEY');
        this.anthropic = new sdk_1.default({ apiKey: apiKey ?? 'placeholder' });
        if (!apiKey) {
            this.logger.warn('ANTHROPIC_API_KEY not set — Copilot endpoints will return 503');
        }
    }
    get isConfigured() {
        return !!this.config.get('ANTHROPIC_API_KEY');
    }
    isSafeQuery(sql) {
        const upper = sql.toUpperCase().trim();
        if (!upper.startsWith('SELECT'))
            return false;
        return !BLOCKED_KEYWORDS.some((kw) => upper.includes(kw));
    }
    async ask(question, conversationHistory) {
        if (!this.isConfigured)
            throw new common_1.ServiceUnavailableException('Copilot unavailable: ANTHROPIC_API_KEY not configured');
        const messages = [
            ...conversationHistory.slice(-10),
            { role: 'user', content: question },
        ];
        const sqlResponse = await this.anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1500,
            system: `You are a senior SQL analyst for an offshore oil & gas rig management platform (Aquila Engineering).
You have deep expertise in Azure SQL and the following database schema.

SCHEMA:
${SCHEMA_CONTEXT}

RULES:
1. Return ONLY valid JSON: {"sql": "...", "explanation": "...", "intent": "..."}
2. sql: A safe Azure SQL SELECT query. Always use TOP N (default 50) unless user asks for all.
3. explanation: 1-sentence description of what the query retrieves.
4. intent: 1-sentence description of what the user is trying to learn.
5. If the question cannot be answered from this schema, set sql to null and explain in explanation.
6. Use table aliases. Add NOLOCK hints for performance: WITH (NOLOCK).
7. For date filters use DATEADD/DATEDIFF. All dates are DATETIMEOFFSET.
8. NEVER generate INSERT, UPDATE, DELETE, DROP, EXEC or any write operation.
9. Return raw JSON only — no markdown, no backticks, no preamble.`,
            messages,
        });
        let sqlPayload;
        try {
            const raw = (sqlResponse.content[0]?.text ?? '').replace(/```json|```/g, '').trim();
            sqlPayload = JSON.parse(raw);
        }
        catch {
            sqlPayload = { sql: null, explanation: sqlResponse.content[0]?.text ?? '', intent: question };
        }
        if (!sqlPayload.sql) {
            return { answer: sqlPayload.explanation, sql: null, rows: [], rowCount: 0 };
        }
        if (!this.isSafeQuery(sqlPayload.sql)) {
            this.logger.warn(`Blocked unsafe query attempt: ${sqlPayload.sql.slice(0, 100)}`);
            throw new common_1.BadRequestException('Query blocked: only SELECT operations are permitted');
        }
        let rows = [];
        let queryError = null;
        try {
            rows = await this.prisma.$queryRawUnsafe(sqlPayload.sql);
        }
        catch (err) {
            queryError = err.message ?? 'Query execution failed';
            this.logger.error(`Query failed: ${queryError}\nSQL: ${sqlPayload.sql}`);
        }
        const answerResponse = await this.anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 600,
            system: `You are a drilling data analyst for Aquila Engineering's offshore rig fleet.
Summarize query results in 2-4 clear, specific sentences. Be precise with numbers.
If there was an error, explain it simply and suggest a rephrased question.
Highlight the most operationally significant finding first.`,
            messages: [
                {
                    role: 'user',
                    content: queryError
                        ? `The query failed: "${queryError}". Original question: "${question}". SQL attempted: ${sqlPayload.sql}`
                        : `Question: "${question}"\nSQL: ${sqlPayload.sql}\nResults (${rows.length} rows): ${JSON.stringify(rows.slice(0, 20))}`,
                },
            ],
        });
        return {
            question,
            answer: answerResponse.content[0]?.text ?? '',
            sql: sqlPayload.sql,
            explanation: sqlPayload.explanation,
            intent: sqlPayload.intent,
            rows: rows.slice(0, 100),
            rowCount: rows.length,
            queryError,
        };
    }
    async generateRigReport(rigId) {
        if (!this.isConfigured)
            throw new common_1.ServiceUnavailableException('Copilot unavailable: ANTHROPIC_API_KEY not configured');
        const [health, recentFailures, nptStats] = await Promise.all([
            this.prisma.$queryRaw `
        SELECT r.name, r.status, r.category, o.name as operator,
               COUNT(DISTINCT f.id) as openFailures,
               SUM(CAST(n.nptHours AS FLOAT)) as totalNptHours
        FROM rigs r
        LEFT JOIN operators o ON o.id = r.operatorId
        LEFT JOIN failures f ON f.rigId = r.id AND f.isRemoved = 0 AND f.status != 'closed'
        LEFT JOIN nonProductionTimes n ON n.rigId = r.id AND n.isRemoved = 0
          AND n.dateOfNPT >= DATEADD(MONTH, -3, GETDATE())
        WHERE r.id = ${rigId}
        GROUP BY r.name, r.status, r.category, o.name
      `,
            this.prisma.failure.findMany({
                where: { rigId, isRemoved: false, status: { not: 'closed' } },
                orderBy: [{ severity: 'asc' }, { dateOfFailure: 'desc' }],
                take: 5,
                include: { failureMode: true },
            }),
            this.prisma.nonProductionTime.findMany({
                where: {
                    rigId,
                    isRemoved: false,
                    dateOfNPT: { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) },
                },
                take: 10,
            }),
        ]);
        const report = await this.anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1500,
            system: 'You are a senior drilling reliability engineer writing an executive rig health report. Be concise, specific, and action-oriented. Use engineering terminology.',
            messages: [
                {
                    role: 'user',
                    content: `Generate a concise executive health report for this rig.
Rig data: ${JSON.stringify(health[0])}
Open failures (${recentFailures.length}): ${JSON.stringify(recentFailures.map((f) => ({ title: f.title, severity: f.severity, component: f.components?.name })))}
NPT events last 90 days (${nptStats.length}): ${JSON.stringify(nptStats.map((n) => ({ hours: n.nptHours, category: n.delayCategory, type: n.nptType })))}

Structure as: Executive Summary, Key Risks (top 3), Recommended Actions (top 3), KPI Outlook.`,
                },
            ],
        });
        return {
            rigId,
            rigName: health[0]?.name,
            report: report.content[0]?.text ?? '',
            dataSnapshot: { health: health[0], openFailures: recentFailures.length },
            generatedAt: new Date().toISOString(),
        };
    }
};
exports.CopilotService = CopilotService;
exports.CopilotService = CopilotService = CopilotService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], CopilotService);
//# sourceMappingURL=copilot.service.js.map