import { BlockchainService } from './blockchain.service';
export declare class BlockchainController {
    private readonly blockchainService;
    constructor(blockchainService: BlockchainService);
    printBlockchain(numberOfInstances?: number): Promise<any>;
    addToBlockchain(): Promise<unknown>;
    getTotalTransaction(): Promise<number>;
    getAllTransaction(): Promise<any[]>;
    getAllBlock(number?: number): Promise<any>;
    getLastBlock(): Promise<unknown>;
    getBlockByNumber(number: number): Promise<any>;
    getBlockByHash(hash: string): Promise<any>;
}
