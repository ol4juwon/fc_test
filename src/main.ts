import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      always: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
