import { Module } from '@nestjs/common';
import { PolicySearchController } from './policy-search.controller';
import { PolicySearchService } from './policy-search.service';

@Module({
  controllers: [PolicySearchController],
  providers: [PolicySearchService]
})
export class PolicySearchModule {}
