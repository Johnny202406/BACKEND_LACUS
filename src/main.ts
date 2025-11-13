import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist:false,
      forbidNonWhitelisted: false,
    }),
  );
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  const cookieSecret = configService.get<string>('COOKIE_SECRET');
  app.use(cookieParser(cookieSecret));
  app.enableCors(
    { origin: configService.get<string>('HTTP_ORIGIN'), credentials: true, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' },
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
