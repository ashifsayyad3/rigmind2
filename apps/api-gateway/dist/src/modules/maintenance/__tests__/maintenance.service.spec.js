"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const maintenance_service_1 = require("../maintenance.service");
const prisma_service_1 = require("../../../prisma/prisma.service");
const mockPrisma = {
    deferredMaintenanceTasks: { count: jest.fn(), findMany: jest.fn(), update: jest.fn(), groupBy: jest.fn() },
    componentMaintainanceHistory: { findMany: jest.fn() },
};
describe('MaintenanceService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                maintenance_service_1.MaintenanceService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(maintenance_service_1.MaintenanceService);
        jest.clearAllMocks();
    });
    it('getDeferredTasks returns paginated results', async () => {
        mockPrisma.deferredMaintenanceTasks.count.mockResolvedValue(5);
        mockPrisma.deferredMaintenanceTasks.findMany.mockResolvedValue([
            { id: 1, rigId: 1, issueId: 10, issueType: 'failure', isRemoved: false },
        ]);
        const result = await service.getDeferredTasks({ page: 1, limit: 25 });
        expect(result.total).toBe(5);
        expect(result.items).toHaveLength(1);
    });
    it('closeDeferredTask sets isRemoved=true', async () => {
        mockPrisma.deferredMaintenanceTasks.update.mockResolvedValue({ id: 1, isRemoved: true });
        await service.closeDeferredTask(1, 1);
        expect(mockPrisma.deferredMaintenanceTasks.update).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 1 }, data: expect.objectContaining({ isRemoved: true }) }));
    });
    it('getStats returns totalDeferred and byRig', async () => {
        mockPrisma.deferredMaintenanceTasks.count.mockResolvedValue(12);
        mockPrisma.deferredMaintenanceTasks.groupBy.mockResolvedValue([
            { rigId: 1, _count: { id: 7 } },
            { rigId: 2, _count: { id: 5 } },
        ]);
        const result = await service.getStats();
        expect(result.totalDeferred).toBe(12);
        expect(result.byRig).toHaveLength(2);
    });
});
//# sourceMappingURL=maintenance.service.spec.js.map