import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingMiddleware } from './middlewares/loggingMiddleware';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Google Sheets Integration')
    .setDescription('API for integrating Google Sheets and Webhooks')
    .setVersion('1.0')
    .addTag('rows')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useLogger(new Logger());
  app.use(new LoggingMiddleware().use);

  await app.listen(3000);
}
bootstrap();
