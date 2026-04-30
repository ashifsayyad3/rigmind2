import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('FailuresController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let authToken: string;
  let createdFailureId: number | undefined;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.setGlobalPrefix('api');
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
    jwt = moduleFixture.get<JwtService>(JwtService);

    // Generate test auth token
    authToken = jwt.sign({
      sub: 1, email: 'test@aquila-engineer.com',
      roleId: 1, roleName: 'admin',
    });
  });

  afterAll(async () => {
    // Clean up created test data
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
        .expect((res: any) => {
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
        .expect((res: any) => {
          const items = res.body.data.items;
          items.forEach((f: any) => {
            expect(f.severity).toBe('critical');
          });
        });
    });

    it('should paginate correctly', () => {
      return request(app.getHttpServer())
        .get('/api/v1/failures?page=1&limit=5')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res: any) => {
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
        .expect((res: any) => {
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
