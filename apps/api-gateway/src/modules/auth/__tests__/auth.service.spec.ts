import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { PrismaService } from '../../../prisma/prisma.service';

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
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwt },
        { provide: ConfigService, useValue: mockConfig },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
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
      await expect(
        service.validateUser('unknown@example.com', 'password')
      ).rejects.toThrow(UnauthorizedException);
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
      mockJwt.verify.mockImplementationOnce(() => { throw new Error('invalid') });
      await expect(service.refreshToken('bad.token')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for deleted user', async () => {
      mockJwt.verify.mockReturnValueOnce({ sub: 2 });
      mockPrisma.users.findUnique.mockResolvedValue({ ...mockUser, deleted: true });
      await expect(service.refreshToken('valid.token')).rejects.toThrow(UnauthorizedException);
    });
  });
});
