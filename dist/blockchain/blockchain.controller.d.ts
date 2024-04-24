import { BlockchainService } from './blockchain.service';
export declare class BlockchainController {
    private readonly blockchainService;
    constructor(blockchainService: BlockchainService);
    printBlockchain(numberOfInstances?: number): Promise<any>;
    addToBlockchain(): Promise<unknown>;
    getTotalTransaction(): Promise<number>;
}
