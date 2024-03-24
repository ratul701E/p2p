import { Module } from '@nestjs/common';
import { DatabaseServiceService } from './database-service.service';

@Module({
  providers: [DatabaseServiceService],
  exports: [DatabaseServiceService]
})
export class DatabaseServiceModule {}
