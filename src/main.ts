import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DatabaseExceptionFilter } from './exception-filters/database.exception-filter';
import { EntityConflictExceptionFilter } from './exception-filters/entity-conflict.exception-filter';
import { EntityNotFoundExceptionFilter } from './exception-filters/entity-not-found.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(
    new DatabaseExceptionFilter(),
    new EntityNotFoundExceptionFilter(),
    new EntityConflictExceptionFilter(),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.setGlobalPrefix('/v1/api');

  const config = new DocumentBuilder()
    .setTitle('WEB API - Via CEP')
    .setDescription('API responsável: Yan Almeida')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors();

  await app.listen(process.env.PORT || 3001);
  const url = await app.getUrl();

  Logger.debug(`Swagger application is running on: ${url}/swagger`);
}

bootstrap();
