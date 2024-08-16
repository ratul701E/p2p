import { DatabaseServiceService } from 'src/database-service/database-service.service';
export declare class BlockchainService {
    private readonly databaseService;
    private readonly blockchain;
    constructor(databaseService: DatabaseServiceService);
    addToBlockchain(block: any): Promise<unknown>;
    getLastBlock(): Promise<unknown>;
    printBlockchain: (numberOfInstances: number) => Promise<any>;
    getBlockByNumber: (number: Number) => Promise<any>;
    getBlockByHash: (hash: string) => Promise<any>;
    printTotalTransactionCount: () => Promise<number>;
    printAllTransaction: () => Promise<any[]>;
}
