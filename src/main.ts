import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Automatch Inventory API')
    .setDescription('REST API for get vehicle info in real time')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const port = app.get(ConfigService).get<number>('PORT');
  const logger = new Logger('Bootstrap');
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    logger.log(`Server running on port: ${port} 🚀 ✨✨`);
  });
}
bootstrap();
