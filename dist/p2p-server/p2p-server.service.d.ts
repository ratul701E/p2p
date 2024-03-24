import { TransactionDTO } from 'src/dto/transaction.dto';
import { P2pGateway } from './p2p-server.gateway';
export declare class P2pService {
    private readonly p2pGateway;
    constructor(p2pGateway: P2pGateway);
    transactionBroadcast(transaction: TransactionDTO): void;
}
