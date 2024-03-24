import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TransactionDTO } from 'src/dto/transaction.dto';
import { TransactionService } from 'src/transaction/transaction.service';
import { P2pGateway } from './p2p-server.gateway';

@Injectable()
export class P2pService {

    constructor(private readonly p2pGateway: P2pGateway) {}

    transactionBroadcast(transaction: TransactionDTO) {
        this.p2pGateway.transactionBroadcast(transaction)
    }
}
