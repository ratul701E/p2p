import { TransactionDTO } from 'src/dto/transaction.dto';
import { P2pService } from 'src/p2p-server/p2p-server.service';
import { DatabaseServiceService } from 'src/database-service/database-service.service';
import { mempoolDTO } from 'src/dto/mempool.dto';
export declare class TransactionService {
    private readonly p2pService;
    private readonly dbService;
    private readonly mempool;
    private readonly blockchain;
    private readonly ec;
    constructor(p2pService: P2pService, dbService: DatabaseServiceService);
    transactionExists: (transaction: TransactionDTO) => Promise<unknown>;
    putTransaction: (transaction: TransactionDTO) => Promise<unknown>;
    addTransactionToMempool: (transaction: TransactionDTO) => Promise<unknown>;
    deleteTransactionFromMempool: (transaction: TransactionDTO) => Promise<unknown>;
    printMempool(): Promise<mempoolDTO[]>;
    validateBalance(transaction: any): Promise<boolean>;
    validateTransaction(transaction: any): Promise<"Insufficient Account Balance" | "Unable to Validate Signature" | "Valid Transaction">;
    getBalance(targetAddress: any): Promise<unknown>;
    validateSignature(transaction: any): Promise<boolean>;
}
