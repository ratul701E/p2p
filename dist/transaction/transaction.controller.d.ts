import { TransactionService } from './transaction.service';
import { TransactionDTO } from 'src/dto/transaction.dto';
import { mempoolDTO } from 'src/dto/mempool.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    addTransactionToMempool(transaction: TransactionDTO): Promise<any>;
    getMempool(): Promise<mempoolDTO[]>;
    deleteTransaction(transaction: TransactionDTO): Promise<unknown>;
    getBalance(address: string): Promise<{
        balance: unknown;
    }>;
}
