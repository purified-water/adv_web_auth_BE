import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Use cors
  app.enableCors({
    origin: process.env.REACT_APP_API_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // Enable pipes
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3031);
}
bootstrap();
