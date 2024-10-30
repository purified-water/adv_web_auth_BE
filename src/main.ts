import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Use cors
  app.enableCors({
    origin: process.env.REACT_APP_API_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  console.log("FE: ", process.env.REACT_APP_API_URL);
  await app.listen(process.env.PORT ?? 3031);
}
bootstrap();
