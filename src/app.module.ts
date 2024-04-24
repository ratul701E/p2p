import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { P2pModule } from './p2p-server/p2p-server.module';
import { P2pClientModule } from './p2p-client/p2p-client.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConsensusModule } from './consensus/consensus.module';
import { BlockModule } from './block/block.module';
import { DatabaseServiceModule } from './database-service/database-service.module';
import { BlockchainModule } from './blockchain/blockchain.module';

@Module({
  imports: [P2pClientModule, TransactionModule, P2pModule, ConsensusModule, BlockModule, DatabaseServiceModule, BlockchainModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {
}
