import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? 3001);
  console.log(await app.getUrl())
}
bootstrap();
