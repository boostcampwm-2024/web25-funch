import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LOCALHOST, CORS_ORIGIN, CORS_ORIGIN_WWW } from './constants';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [LOCALHOST, CORS_ORIGIN, CORS_ORIGIN_WWW],
    methods: '*',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 8080);
}

bootstrap();
