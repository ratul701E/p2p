import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';
import { AppModule } from 'src/app.module';
import { DatabaseServiceModule } from 'src/database-service/database-service.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { P2pClientModule } from 'src/p2p-client/p2p-client.module';
import { BlockchainModule } from 'src/blockchain/blockchain.module';
import { P2pModule } from 'src/p2p-server/p2p-server.module';

@Module({
  imports: [DatabaseServiceModule, TransactionModule, P2pClientModule, BlockchainModule, P2pModule],
  controllers: [BlockController],
  providers: [BlockService]
})
export class BlockModule {}
