import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { DatabaseServiceModule } from 'src/database-service/database-service.module';
import { BlockchainController } from './blockchain.controller';

@Module({
  providers: [BlockchainService],
  imports: [DatabaseServiceModule],
  exports: [BlockchainService],
  controllers: [BlockchainController]
})
export class BlockchainModule {}
