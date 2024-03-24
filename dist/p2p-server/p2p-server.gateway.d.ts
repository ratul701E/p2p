import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TransactionDTO } from 'src/dto/transaction.dto';
import { BlockDTO } from 'src/dto/block.dto';
export declare class P2pGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor();
    server: Server;
    getSocketsCount(): number;
    afterInit(server: any): void;
    handleConnection(client: any, ...args: any[]): void;
    handleDisconnect(client: any): void;
    handlNewTransaction(client: any, transaction: TransactionDTO): Promise<void | string>;
    handleNewBlock(client: any, block: BlockDTO): Promise<void>;
    transactionBroadcast(transaction: TransactionDTO): void;
    blockBroadcast(block: any): void;
}
