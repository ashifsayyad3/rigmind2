"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const helmet_1 = require("helmet");
const compression = require("compression");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const logger = nest_winston_1.WinstonModule.createLogger({
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(winston.format.timestamp(), winston.format.colorize(), winston.format.printf(({ timestamp, level, message, context }) => `${timestamp} [${context ?? 'App'}] ${level}: ${message}`)),
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
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { logger });
    app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
    app.use(compression());
    app.enableCors({
        origin: process.env.CORS_ORIGINS?.split(',') ?? ['http://localhost:3000'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
    });
    app.enableVersioning({ type: common_1.VersioningType.URI, defaultVersion: '1' });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    app.setGlobalPrefix('api');
    if (process.env.NODE_ENV !== 'production') {
        const isDev = process.env.NODE_ENV === 'development';
        const builder = new swagger_1.DocumentBuilder()
            .setTitle('RigMind AI™ API')
            .setDescription('Enterprise Offshore Rig Intelligence Platform API')
            .setVersion('1.0')
            .addServer(`http://localhost:${process.env.PORT ?? 4000}`);
        if (!isDev) {
            builder.addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT');
        }
        const document = swagger_1.SwaggerModule.createDocument(app, builder.build());
        swagger_1.SwaggerModule.setup('api/docs', app, document, {
            swaggerOptions: {
                persistAuthorization: !isDev,
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
//# sourceMappingURL=main.js.map