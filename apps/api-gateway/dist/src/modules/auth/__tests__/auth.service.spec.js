"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../auth.service");
const prisma_service_1 = require("../../../prisma/prisma.service");
const mockUser = {
    id: 1, email: 'test@aquila-engineer.com',
    firstName: 'Jane', lastName: 'Doe',
    roleId: 2, enabled: true, deleted: false,
    canAccessAllRigs: false,
    roles: { id: 2, name: 'Engineer' },
    userRigs: [{ rigId: 1 }, { rigId: 3 }],
};
const mockPrisma = {
    users: {
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
    },
};
const mockJwt = {
    sign: jest.fn().mockReturnValue('mock.jwt.token'),
    verify: jest.fn().mockReturnValue({ sub: 1, email: 'test@aquila-engineer.com', roleId: 2 }),
};
const mockConfig = {
    getOrThrow: jest.fn(),
    get: jest.fn().mockReturnValue('24h'),
};
describe('AuthService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
                { provide: jwt_1.JwtService, useValue: mockJwt },
                { provide: config_1.ConfigService, useValue: mockConfig },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
        jest.clearAllMocks();
    });
    describe('validateUser', () => {
        it('should return user for valid credentials', async () => {
            mockPrisma.users.findFirst.mockResolvedValue(mockUser);
            const result = await service.validateUser('test@aquila-engineer.com', 'password');
            expect(result).toEqual(mockUser);
        });
        it('should throw UnauthorizedException for unknown email', async () => {
            mockPrisma.users.findFirst.mockResolvedValue(null);
            await expect(service.validateUser('unknown@example.com', 'password')).rejects.toThrow(common_1.UnauthorizedException);
        });
    });
    describe('login', () => {
        it('should return access token, refresh token and user info', async () => {
            const result = await service.login(mockUser);
            expect(result).toHaveProperty('accessToken', 'mock.jwt.token');
            expect(result).toHaveProperty('refreshToken', 'mock.jwt.token');
            expect(result).toHaveProperty('user');
            expect(result.user.email).toBe(mockUser.email);
            expect(mockJwt.sign).toHaveBeenCalledTimes(2);
        });
    });
    describe('refreshToken', () => {
        it('should issue new tokens from valid refresh token', async () => {
            mockPrisma.users.findUnique.mockResolvedValue(mockUser);
            const result = await service.refreshToken('valid.refresh.token');
            expect(result).toHaveProperty('accessToken');
        });
        it('should throw UnauthorizedException for invalid refresh token', async () => {
            mockJwt.verify.mockImplementationOnce(() => { throw new Error('invalid'); });
            await expect(service.refreshToken('bad.token')).rejects.toThrow(common_1.UnauthorizedException);
        });
        it('should throw UnauthorizedException for deleted user', async () => {
            mockJwt.verify.mockReturnValueOnce({ sub: 2 });
            mockPrisma.users.findUnique.mockResolvedValue({ ...mockUser, deleted: true });
            await expect(service.refreshToken('valid.token')).rejects.toThrow(common_1.UnauthorizedException);
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map