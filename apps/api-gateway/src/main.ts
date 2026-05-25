import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import helmet from 'helmet';
import * as compression from 'compression';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.printf(({ timestamp, level, message, context }) =>
            `${timestamp} [${context ?? 'App'}] ${level}: ${message}`
          )
        ),
      }),
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      }),
      new winston.transports.File({
        filename: 'logs/combined.log',
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, { logger });

  // Security
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(compression());

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGINS?.split(',') ?? ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  });

  // Versioning — default to v1 so /api/rigs resolves same as /api/v1/rigs
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  // WebSockets
  app.useWebSocketAdapter(new IoAdapter(app));

  // Global prefix
  app.setGlobalPrefix('api');

  // Swagger
  if (process.env.NODE_ENV !== 'production') {
    const isDev = process.env.NODE_ENV === 'development';
    const builder = new DocumentBuilder()
      .setTitle('RigMind AI™ API')
      .setDescription('Enterprise Offshore Rig Intelligence Platform API')
      .setVersion('1.0')
      .addServer(`http://localhost:${process.env.PORT ?? 4000}`);
    if (!isDev) {
      builder.addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT');
    }
    const document = SwaggerModule.createDocument(app, builder.build());
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: !isDev,
        // Auto-expand all endpoints in dev for easier browsing
        docExpansion: isDev ? 'list' : 'none',
      },
    });
  }

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  console.log(`🚀 RigMind AI™ API running on http://localhost:${port}/api`);
  console.log(`📚 Swagger docs at http://localhost:${port}/api/docs`);
}

bootstrap();
