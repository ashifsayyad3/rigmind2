"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const fleet_service_1 = require("../fleet.service");
const prisma_service_1 = require("../../../prisma/prisma.service");
const mockPrisma = {
    rigs: { count: jest.fn(), findMany: jest.fn() },
    failures: { count: jest.fn() },
    certificateAttachments: { count: jest.fn() },
    deferredMaintenanceTasks: { count: jest.fn() },
    KPI: { findFirst: jest.fn() },
    $queryRaw: jest.fn(),
};
describe('FleetService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                fleet_service_1.FleetService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(fleet_service_1.FleetService);
        jest.clearAllMocks();
    });
    describe('getFleetHealthMetrics', () => {
        it('should aggregate fleet metrics correctly', async () => {
            mockPrisma.rigs.count
                .mockResolvedValueOnce(12)
                .mockResolvedValueOnce(10);
            mockPrisma.failures.count.mockResolvedValue(3);
            mockPrisma.certificateAttachments.count.mockResolvedValue(7);
            mockPrisma.$queryRaw
                .mockResolvedValueOnce([{ totalHours: 245.5 }])
                .mockResolvedValueOnce([{ avgAvailability: 87.3 }]);
            const result = await service.getFleetHealthMetrics();
            expect(result.rigsTotal).toBe(12);
            expect(result.rigsOnline).toBe(10);
            expect(result.criticalFailures).toBe(3);
            expect(result.expiringCerts).toBe(7);
            expect(result.nptHoursMonth).toBe(245.5);
            expect(result.overallFleetScore).toBeGreaterThanOrEqual(0);
            expect(result.overallFleetScore).toBeLessThanOrEqual(100);
        });
        it('should handle zero values gracefully', async () => {
            mockPrisma.rigs.count.mockResolvedValue(0);
            mockPrisma.failures.count.mockResolvedValue(0);
            mockPrisma.certificateAttachments.count.mockResolvedValue(0);
            mockPrisma.$queryRaw
                .mockResolvedValueOnce([{ totalHours: 0 }])
                .mockResolvedValueOnce([{ avgAvailability: 0 }]);
            const result = await service.getFleetHealthMetrics();
            expect(result.overallFleetScore).toBe(100);
        });
    });
    describe('getRigHealthScores', () => {
        it('should return health scores for all accessible rigs', async () => {
            mockPrisma.rigs.findMany.mockResolvedValue([
                { id: 1, name: 'Rig Alpha' },
                { id: 2, name: 'Rig Beta' },
            ]);
            mockPrisma.failures.count.mockResolvedValue(2);
            mockPrisma.deferredMaintenanceTasks.count.mockResolvedValue(1);
            mockPrisma.certificateAttachments.count.mockResolvedValue(0);
            mockPrisma.$queryRaw.mockResolvedValue([{ totalHours: 5.0 }]);
            mockPrisma.KPI.findFirst.mockResolvedValue({ availability: 90 });
            const result = await service.getRigHealthScores(null);
            expect(result).toHaveLength(2);
            result.forEach((rig) => {
                expect(rig).toHaveProperty('rigId');
                expect(rig).toHaveProperty('overallScore');
                expect(rig.overallScore).toBeGreaterThanOrEqual(0);
                expect(rig.overallScore).toBeLessThanOrEqual(100);
                expect(rig).toHaveProperty('trend');
                expect(['improving', 'stable', 'degrading']).toContain(rig.trend);
            });
        });
        it('should filter to accessible rig IDs when provided', async () => {
            mockPrisma.rigs.findMany.mockResolvedValue([{ id: 3, name: 'Rig Gamma' }]);
            mockPrisma.failures.count.mockResolvedValue(0);
            mockPrisma.deferredMaintenanceTasks.count.mockResolvedValue(0);
            mockPrisma.certificateAttachments.count.mockResolvedValue(0);
            mockPrisma.$queryRaw.mockResolvedValue([{ totalHours: 0 }]);
            mockPrisma.KPI.findFirst.mockResolvedValue(null);
            await service.getRigHealthScores([3]);
            expect(mockPrisma.rigs.findMany).toHaveBeenCalledWith(expect.objectContaining({
                where: expect.objectContaining({ id: { in: [3] } }),
            }));
        });
    });
});
//# sourceMappingURL=fleet.service.spec.js.map