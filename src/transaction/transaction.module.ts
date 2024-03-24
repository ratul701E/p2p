import { Module, forwardRef } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { P2pModule } from 'src/p2p-server/p2p-server.module';
import { AppModule } from 'src/app.module';
import { DatabaseServiceModule } from 'src/database-service/database-service.module';

@Module({
  imports: [P2pModule, DatabaseServiceModule],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
