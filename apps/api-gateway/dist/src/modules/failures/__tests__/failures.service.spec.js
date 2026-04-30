"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const failures_service_1 = require("../failures.service");
const prisma_service_1 = require("../../../prisma/prisma.service");
const mockPrisma = {
    failures: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        groupBy: jest.fn(),
    },
    failureObservations: { findMany: jest.fn() },
    correctiveActions: { findMany: jest.fn() },
    failureCommunications: { findMany: jest.fn() },
    nonProductionTimes: { findMany: jest.fn() },
    $queryRaw: jest.fn(),
};
describe('FailuresService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                failures_service_1.FailuresService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(failures_service_1.FailuresService);
        jest.clearAllMocks();
    });
    describe('findAll', () => {
        it('should return paginated failures', async () => {
            const mockItems = [
                { id: 1, title: 'BOP Seal Failure', severity: 'critical', rigId: 1, rigs: { name: 'Rig Alpha' } },
                { id: 2, title: 'Hydraulic Leak', severity: 'high', rigId: 2, rigs: { name: 'Rig Beta' } },
            ];
            mockPrisma.failures.count.mockResolvedValue(2);
            mockPrisma.failures.findMany.mockResolvedValue(mockItems);
            const result = await service.findAll({ page: 1, limit: 25 }, 1, null);
            expect(result.items).toHaveLength(2);
            expect(result.total).toBe(2);
            expect(result.page).toBe(1);
            expect(mockPrisma.failures.findMany).toHaveBeenCalledWith(expect.objectContaining({ skip: 0, take: 25 }));
        });
        it('should apply rigId filter when user has restricted access', async () => {
            mockPrisma.failures.count.mockResolvedValue(1);
            mockPrisma.failures.findMany.mockResolvedValue([]);
            await service.findAll({}, 1, [3, 5]);
            expect(mockPrisma.failures.findMany).toHaveBeenCalledWith(expect.objectContaining({
                where: expect.objectContaining({ rigId: { in: [3, 5] } }),
            }));
        });
        it('should filter by severity', async () => {
            mockPrisma.failures.count.mockResolvedValue(0);
            mockPrisma.failures.findMany.mockResolvedValue([]);
            await service.findAll({ severity: 'critical' }, 1, null);
            expect(mockPrisma.failures.findMany).toHaveBeenCalledWith(expect.objectContaining({
                where: expect.objectContaining({ severity: 'critical' }),
            }));
        });
        it('should apply search filter across title, description, cause', async () => {
            mockPrisma.failures.count.mockResolvedValue(0);
            mockPrisma.failures.findMany.mockResolvedValue([]);
            await service.findAll({ search: 'BOP' }, 1, null);
            const call = mockPrisma.failures.findMany.mock.calls[0][0];
            expect(call.where.OR).toBeDefined();
            expect(call.where.OR.length).toBeGreaterThan(0);
        });
    });
    describe('findOne', () => {
        it('should return failure by id', async () => {
            const mockFailure = { id: 1, title: 'Test failure', isRemoved: false };
            mockPrisma.failures.findFirst.mockResolvedValue(mockFailure);
            const result = await service.findOne(1);
            expect(result).toEqual(mockFailure);
            expect(mockPrisma.failures.findFirst).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 1, isRemoved: false } }));
        });
        it('should throw NotFoundException when failure not found', async () => {
            mockPrisma.failures.findFirst.mockResolvedValue(null);
            await expect(service.findOne(999)).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('create', () => {
        it('should create a failure with creator audit fields', async () => {
            const mockCreated = { id: 5, title: 'New failure', createdById: 1 };
            mockPrisma.failures.create.mockResolvedValue(mockCreated);
            const result = await service.create({ title: 'New failure' }, 1);
            expect(mockPrisma.failures.create).toHaveBeenCalledWith(expect.objectContaining({
                data: expect.objectContaining({ createdById: 1, isRemoved: false }),
            }));
            expect(result).toEqual(mockCreated);
        });
    });
    describe('remove (soft-delete)', () => {
        it('should soft-delete by setting isRemoved=true', async () => {
            const mockFailure = { id: 1, title: 'Test', isRemoved: false };
            mockPrisma.failures.findFirst.mockResolvedValue(mockFailure);
            mockPrisma.failures.update.mockResolvedValue({ ...mockFailure, isRemoved: true });
            await service.remove(1, 1);
            expect(mockPrisma.failures.update).toHaveBeenCalledWith(expect.objectContaining({
                where: { id: 1 },
                data: expect.objectContaining({ isRemoved: true }),
            }));
        });
        it('should throw NotFoundException when trying to delete non-existent failure', async () => {
            mockPrisma.failures.findFirst.mockResolvedValue(null);
            await expect(service.remove(999, 1)).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('getStats', () => {
        it('should return failure statistics', async () => {
            mockPrisma.failures.count.mockResolvedValue(42);
            mockPrisma.failures.groupBy
                .mockResolvedValueOnce([{ severity: 'critical', _count: { id: 5 } }])
                .mockResolvedValueOnce([{ status: 'open', _count: { id: 20 } }])
                .mockResolvedValueOnce([]);
            mockPrisma.$queryRaw.mockResolvedValue([]);
            const result = await service.getStats();
            expect(result.total).toBe(42);
            expect(result.bySeverity).toBeDefined();
        });
    });
});
//# sourceMappingURL=failures.service.spec.js.map