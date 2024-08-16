import { TransactionService } from './transaction.service';
import { TransactionDTO } from 'src/dto/transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    addTransactionToMempool(transaction: TransactionDTO): Promise<any>;
    deleteTransaction(transaction: TransactionDTO): Promise<unknown>;
    getBalance(address: string): Promise<{
        balance: unknown;
    }>;
    getTransactionByHash(transactionHash: string): Promise<any>;
    getAllTransactionOfKey(key: string): Promise<any[]>;
}
