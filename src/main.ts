import { LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

import * as Sentry from '@sentry/node';
import { config } from 'aws-sdk';
import { SentryHttpFilter, SentryRpcFilter } from './filters/sentry.filter';
import { CustomValidationPipe } from './pipes/validation.pipe';

export async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.HOST || '0.0.0.0',
      port: Number(process.env.PORT) || 9000,
    },
    logger: ['error', 'warn', 'debug', 'log'] as LogLevel[],
  });

  if (process.env.STAGE === 'production') {
    Sentry.init({ dsn: process.env.SENTRY_DSN });
  }

  app.useGlobalPipes(new CustomValidationPipe());

  app.useGlobalFilters(new SentryRpcFilter());
  app.useGlobalFilters(new SentryHttpFilter());

  config.update({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: process.env.AWS_S3_REGION,
  });

  await app.listen();

  return app;
}

if (process.env.STAGE !== 'test') {
  bootstrap();
}
