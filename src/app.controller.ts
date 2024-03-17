import { Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  getHello(): string {
    return this.appService.getHello();
  }

  @HealthCheck()
  @Get('/health')
  getHealthCheck() {
    return {
      status: 'OK',
    };
  }

}
