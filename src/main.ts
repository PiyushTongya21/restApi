// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with the desired origin and options
  app.enableCors({
    origin: '*', // Replace with your Vue.js frontend URL
    // Allow credentials (cookies, authorization headers)
  });

  // Apply a global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Listen on the specified port (e.g., 5000)
  await app.listen(5000);
}

bootstrap();
