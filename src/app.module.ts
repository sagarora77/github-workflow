import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { PolicySearchModule } from './policy-search/policy-search.module';
import { DocumentModule } from './document/document.module';
import { PricingModule } from './pricing/pricing.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from './logger/logger.module';
import { PolicyModule } from './policy/policy.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    PaymentModule,
    PolicySearchModule,
    PolicyModule,
    PricingModule,
    AuthModule,
    UserModule,
    DatabaseModule,
    UsersModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    LoggerModule,
    DocumentModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
