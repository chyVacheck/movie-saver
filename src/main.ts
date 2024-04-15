// main.ts

// ! lib
// nestjs
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
// cookie-parser
import * as cookieParser from 'cookie-parser';

// app
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
