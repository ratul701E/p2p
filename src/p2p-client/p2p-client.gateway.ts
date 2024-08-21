import { TransactionDTO } from './../dto/transaction.dto';
import { OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { P2pClientService } from './p2p-client.service';
import { io } from 'socket.io-client';
import axios from 'axios'
import { Server } from 'socket.io';
import { BlockDTO } from 'src/dto/block.dto';
import { getLocalIp } from 'src/main';
import { TransactionService } from 'src/transaction/transaction.service';

@WebSocketGateway()
export class P2pClientGateway implements OnGatewayInit {

  @WebSocketServer() server: Server;
  private readonly PORT = process.env.PORT || 3000

  constructor(private readonly p2pClientService: P2pClientService, private readonly transacationService: TransactionService) {}

  async afterInit(server: any) {

    await this.connectToSeedServers()
    //await this.getNodeAddressFromSeedServer()
  }

  private async connectToSeedServers() : Promise<void> {
    for(const seedAddr of this.p2pClientService.getSeedNodeAddrList()){
      const seedSocket = io(seedAddr, {
        query: {
          addr: getLocalIp() + ":" + this.PORT
        }
      })

      seedSocket.on('connect', async () => {
        this.p2pClientService.addSeedSocket(seedSocket)
        await this.getNodeAddressFromSeedServer(seedSocket)
        console.log(`Connected to seed server [${JSON.stringify(seedAddr)}]`)
      })

      seedSocket.on('disconnect', ()=> {
        console.log(`Disconnected from seed server [${JSON.stringify(seedAddr)}]`)
      })

      seedSocket.on('new_node_addr', () => {
        //add to list and connect
      })

      //node list response from seed server
      seedSocket.on('node_info_res', node_addr_list => {
        console.log(node_addr_list)

        for(const addr of node_addr_list) {
          // let addr_port = addr.split(":")
          // if(addr_port[addr_port.length - 1] == this.PORT) continue

            if(this.p2pClientService.getNodeAddress().indexOf(addr) === -1) {
              this.p2pClientService.addNodeAddress(addr)
              this.connect(addr)
            }
        }
      })
    }
  }

  private async getNodeAddressFromSeedServer(seedServer: any) : Promise<void> { //node list req to seed server
      if(seedServer.connected) seedServer.emit('node_info_req', getLocalIp() + this.PORT) //req with own address to save in the seed server
      // else console.log("socket not connected")
  }

  private connect(addr: string) {
    //connect to other servers as peer
      const socket = io("http://" + addr)
      socket.on('connect', () => {
        this.p2pClientService.addSocket(socket)
        console.log(`"Connected as a client to ${addr}"`)
      })

      //#events
      socket.on('disconnect', () => {
        console.log(`"Disconnected as a client from ${addr}"`)
      })

      //new transaction event
      socket.on('new_transaction', async (transaction: TransactionDTO) => { 
        console.log(`Received transaction from server (${JSON.stringify(addr)}): ${JSON.stringify(transaction)}`)
        //validate
        //add
        await this.transacationService.addTransactionToMempool(transaction) ? console.log("Transaction successfully added to mempool") : console.log("Transaction already exists in the mepool")
        //broadcast
        //this.server.emit('new_transaction', transaction) //broadcast
      })

      //new block event
      socket.on('new_block', async (block: any) => {
        console.log(`Received block from server (${JSON.stringify(addr)}): ${JSON.stringify(block)}`)
        //validate
        //add

        //broadcast
        //this.server.emit('new_block', block)
      })

      socket.on('new_node_connect', transaction => { 
        console.log(`Broadcast: ${JSON.stringify(transaction)}`)
      })

      socket.on('node_disconnect', transaction => { 
        console.log(`Broadcast: ${JSON.stringify(transaction)}`)
      })
    }
  }

  // private async getNodeAddressFromSeedServer() {
  //   let temp_addrs = []
  //   for(const seed of this.p2pClientService.getSeedNodeAddrList()){
  //     await axios.get(seed)
  //       .then(res => {
  //         //console.log(res.data)
  //         temp_addrs.push([...res.data.serverList])
  //       })
  //       .catch(err => {
  //         console.log(`${seed} seed node unable to reach`)
  //       })
  //   }
  //   //filtering duplicates
  //   this.p2pClientService.replaceNodeAddressList([...new Set(temp_addrs)])
  //   console.log("node address from seed: ")
  //   console.log(this.p2pClientService.getNodeAddress())
  // }

  // const PORT = process.argv[process.argv.indexOf("--port") + 1]
  //   for (let addr of this.p2pClientService.getNodeAddress()) {
  //     //ignoring own server
  //     let addr_port = addr.split(":")
  //     if(addr_port[addr_port.length - 1] == PORT) continue

  //     //connect to other servers as peer
  //     const socket = io(addr)
  //     socket.on('connect', () => {
  //       this.p2pClientService.addSocket(socket)
  //       console.log(`"Connected as a client to ${addr}"`)
  //     })

  //     //events
  //     socket.on('disconnect', () => {
  //       console.log(`"Disconnected as a client from ${addr}"`)
  //     })

  //     socket.on('new_transaction', transaction => { 
  //       console.log(`Received transaction from server (${JSON.stringify(addr)}): ${JSON.stringify(transaction)}`)
  //       this.server.emit('new_transaction', transaction)
  //     })

  //     socket.on('new_node_connect', transaction => { 
  //       console.log(`Broadcast: ${JSON.stringify(transaction)}`)
  //     })

  //     socket.on('node_disconnect', transaction => { 
  //       console.log(`Broadcast: ${JSON.stringify(transaction)}`)
  //     })
  //   }
//}
