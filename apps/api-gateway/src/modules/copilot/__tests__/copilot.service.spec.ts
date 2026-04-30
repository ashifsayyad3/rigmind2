import { Test, TestingModule } from '@nestjs/testing';
import { CopilotService } from '../copilot.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';


const mockPrisma = { $queryRawUnsafe: jest.fn(), $queryRaw: jest.fn() };
const mockConfig = { getOrThrow: jest.fn().mockReturnValue('test-key') };

jest.mock('@anthropic-ai/sdk', () => ({
  default: jest.fn().mockImplementation(() => ({
    messages: {
      create: jest.fn().mockResolvedValue({
        content: [{ text: '{"sql": "SELECT TOP 10 * FROM failures", "explanation": "Get failures", "intent": "list failures", "answer": "Found 10 failures."}' }],
      }),
    },
  })),
}));

describe('CopilotService — SQL Safety Guardrails', () => {
  let service: CopilotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CopilotService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ConfigService, useValue: mockConfig },
      ],
    }).compile();
    service = module.get<CopilotService>(CopilotService);
    jest.clearAllMocks();
  });

  describe('isSafeQuery', () => {
    const safe = [
      'SELECT * FROM failures',
      'SELECT TOP 50 f.id, r.name FROM failures f JOIN rigs r ON r.id = f.rigId',
      'SELECT COUNT(*) FROM nonProductionTimes WHERE isRemoved = 0',
      '  SELECT  id FROM rigs  ', // whitespace
    ];

    const unsafe = [
      'INSERT INTO failures VALUES (1)',
      'UPDATE failures SET severity = "critical"',
      'DELETE FROM failures WHERE id = 1',
      'DROP TABLE failures',
      'TRUNCATE TABLE failures',
      'ALTER TABLE failures ADD COLUMN test INT',
      'CREATE TABLE new_table (id INT)',
      'EXEC sp_test',
      'EXECUTE master..xp_cmdshell',
      'MERGE failures USING src ON ...',
      'GRANT ALL ON failures TO PUBLIC',
      'REVOKE SELECT ON failures FROM user',
      '; INSERT INTO failures VALUES (1)-- injection attempt',
    ];

    safe.forEach((sql) => {
      it(`should allow: ${sql.slice(0, 50)}`, () => {
        expect((service as any).isSafeQuery(sql)).toBe(true);
      });
    });

    unsafe.forEach((sql) => {
      it(`should block: ${sql.slice(0, 60)}`, () => {
        expect((service as any).isSafeQuery(sql)).toBe(false);
      });
    });
  });

  describe('ask', () => {
    it('should execute safe queries and return results', async () => {
      mockPrisma.$queryRawUnsafe.mockResolvedValue([
        { id: 1, name: 'Rig Alpha', openFailures: 3 },
      ]);

      const result = await (service as any).ask('How many open failures?', []);

      expect(result).toHaveProperty('answer');
      expect(result).toHaveProperty('sql');
      expect(result).toHaveProperty('rows');
    });

    it('should handle query execution errors gracefully', async () => {
      mockPrisma.$queryRawUnsafe.mockRejectedValue(new Error('SQL syntax error'));

      const result = await (service as any).ask('Invalid question', []);
      expect(result.queryError).toBeTruthy();
    });
  });
});
