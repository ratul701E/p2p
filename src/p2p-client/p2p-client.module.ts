import { Module } from '@nestjs/common';
import { P2pClientService } from './p2p-client.service';
import { P2pClientGateway } from './p2p-client.gateway';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  providers: [P2pClientGateway, P2pClientService],
  imports: [TransactionModule],
  exports: [P2pClientService]
})
export class P2pClientModule {}
