import { Module, forwardRef } from '@nestjs/common';
import { P2pService } from './p2p-server.service';
import { P2pGateway } from './p2p-server.gateway';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  providers: [P2pGateway, P2pService],
  imports: [],
  exports: [P2pService, P2pGateway]
})
export class P2pModule {}
