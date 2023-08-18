import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from 'exception-filters/prisma.exception-filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new PrismaExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('VideoApi')
    .setDescription('A API de Gerenciamento de Vídeos que oferece uma meio para armazenar, categorizar e disponibilizar vídeos MP$ para Download.')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('doc', app, document)

  await app.listen(3000);
}
bootstrap();
