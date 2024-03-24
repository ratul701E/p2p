import { OnGatewayInit } from '@nestjs/websockets';
import { P2pClientService } from './p2p-client.service';
import { Server } from 'socket.io';
import { TransactionService } from 'src/transaction/transaction.service';
export declare class P2pClientGateway implements OnGatewayInit {
    private readonly p2pClientService;
    private readonly transacationService;
    server: Server;
    private readonly PORT;
    constructor(p2pClientService: P2pClientService, transacationService: TransactionService);
    afterInit(server: any): Promise<void>;
    private connectToSeedServers;
    private getNodeAddressFromSeedServer;
    private connect;
}
