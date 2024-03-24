import { OnModuleInit } from '@nestjs/common';
import { DatabaseServiceService } from 'src/database-service/database-service.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { P2pClientService } from 'src/p2p-client/p2p-client.service';
import { BlockchainService } from 'src/blockchain/blockchain.service';
import { P2pGateway } from 'src/p2p-server/p2p-server.gateway';
export declare class BlockService implements OnModuleInit {
    private readonly dbService;
    private readonly transactionService;
    private readonly p2pClientsService;
    private readonly blockchainService;
    private readonly p2pServerGateway;
    private readonly mempool;
    constructor(dbService: DatabaseServiceService, transactionService: TransactionService, p2pClientsService: P2pClientService, blockchainService: BlockchainService, p2pServerGateway: P2pGateway);
    onModuleInit(): Promise<void>;
    genereateBlock(): Promise<void>;
    buildMerkleTree(transactions: any): Promise<any>;
}
