"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = require("supertest");
const app_module_1 = require("../../src/app.module");
const prisma_service_1 = require("../../src/prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
describe('FailuresController (e2e)', () => {
    let app;
    let prisma;
    let jwt;
    let authToken;
    let createdFailureId;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
        app.setGlobalPrefix('api');
        await app.init();
        prisma = moduleFixture.get(prisma_service_1.PrismaService);
        jwt = moduleFixture.get(jwt_1.JwtService);
        authToken = jwt.sign({
            sub: 1, email: 'test@aquila-engineer.com',
            roleId: 1, roleName: 'admin',
        });
    });
    afterAll(async () => {
        if (createdFailureId) {
            await prisma.failure.update({
                where: { id: createdFailureId },
                data: { isRemoved: true },
            });
        }
        await app.close();
    });
    describe('GET /api/v1/failures', () => {
        it('should return 401 without auth', () => {
            return request(app.getHttpServer())
                .get('/api/v1/failures')
                .expect(401);
        });
        it('should return paginated failures list', () => {
            return request(app.getHttpServer())
                .get('/api/v1/failures')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200)
                .expect((res) => {
                expect(res.body.success).toBe(true);
                expect(res.body.data).toHaveProperty('items');
                expect(res.body.data).toHaveProperty('total');
                expect(res.body.data).toHaveProperty('page');
                expect(Array.isArray(res.body.data.items)).toBe(true);
            });
        });
        it('should filter by severity', () => {
            return request(app.getHttpServer())
                .get('/api/v1/failures?severity=critical')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200)
                .expect((res) => {
                const items = res.body.data.items;
                items.forEach((f) => {
                    expect(f.severity).toBe('critical');
                });
            });
        });
        it('should paginate correctly', () => {
            return request(app.getHttpServer())
                .get('/api/v1/failures?page=1&limit=5')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200)
                .expect((res) => {
                expect(res.body.data.items.length).toBeLessThanOrEqual(5);
                expect(res.body.data.limit).toBe(5);
            });
        });
    });
    describe('GET /api/v1/failures/stats', () => {
        it('should return failure statistics', () => {
            return request(app.getHttpServer())
                .get('/api/v1/failures/stats')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200)
                .expect((res) => {
                expect(res.body.data).toHaveProperty('total');
                expect(res.body.data).toHaveProperty('bySeverity');
                expect(res.body.data).toHaveProperty('byStatus');
            });
        });
    });
    describe('GET /api/v1/failures/:id', () => {
        it('should return 404 for non-existent failure', () => {
            return request(app.getHttpServer())
                .get('/api/v1/failures/999999')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });
    });
});
//# sourceMappingURL=failures.e2e-spec.js.map