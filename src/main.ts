import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import helmet from 'helmet';
import { LoggerService } from './logger/logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  //   , {
  //   bufferLogs: true
  // });
  // app.useLogger(app.get(LoggerService))
  app.enableCors()
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
        frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
      },
    },
  }));
  app.setGlobalPrefix('api/v1');
  // app.use(csurf());
  await app.listen(3000);
}
bootstrap();
