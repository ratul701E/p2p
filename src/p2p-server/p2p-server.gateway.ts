import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { P2pService } from './p2p-server.service';
import { Server } from 'socket.io';
import { TransactionDTO } from 'src/dto/transaction.dto';
import { BlockDTO } from 'src/dto/block.dto';
import { TransactionService } from 'src/transaction/transaction.service';
import { Inject, forwardRef } from '@nestjs/common';


@WebSocketGateway()

export class P2pGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor() {

  }

  @WebSocketServer() server: Server;

  getSocketsCount(): number {
    const { sockets } = this.server.sockets
    return sockets.size
  }

  afterInit(server: any) {
    console.log("P2P Server initialized.....");
  }

  handleConnection(client: any, ...args: any[]) {
    console.log("NEW NODE! connected: ", this.getSocketsCount())
    //client.broadcast.emit('new_node_connect', `A new node (${client.id}) just connected to the server`)

    // console.log(`User: ${client.id} \n\r
    //              Status: Connected\n\r
    //              Room: ${client.room}\n\r
    //              Total users: ${this.getSocketsCount()}
    
    //             `)
  }

  handleDisconnect(client: any) {
    console.log("NODE LEAVE! connected: ", this.getSocketsCount())
    //client.broadcast.emit('node_disconnect', `A node (${client.id}) just disconnected`)
    // client.broadcast.emit('greet', {
    //   id: client.id,
    //   message: "Disconnect",
    //   time: Date.now()
    // })

    ///
    // console.log(`User: ${client.id} \n\r
    //              Status: Disonnected\n\r
    //              Room: ${client.room}\n\r
    //              Total users: ${this.getSocketsCount()}
    
    //             `)

  }

  @SubscribeMessage('new_transaction')
  async handlNewTransaction(client: any, transaction: TransactionDTO) : Promise<void | string> {
    //console.log(transaction);
    //let status = await this.p2pService.validateTransaction(transaction)

    // let success = await this.transactionService.addTransactionToMempool(transaction)

    // if(success) {
    //   client.broadcast.emit('new_transaction', transaction)
    // }
    // else {
    //   return "Failed to add into mempool. [errors here .....]"
    // }
    
  }

  @SubscribeMessage('new_block')
  async handleNewBlock(client: any, block: BlockDTO) : Promise<void> {
    //validate block
    //add block

    //broadcast
    client.broadcast.emit('new_block', block)
  }

  transactionBroadcast(transaction: TransactionDTO) {
    this.server.emit('new_transaction', transaction)
  }


  blockBroadcast(block:any){
    this.server.emit('new_block', block)
    console.log("block broadcasted")
  }


}
