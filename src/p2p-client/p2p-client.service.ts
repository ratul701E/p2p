import { Injectable } from '@nestjs/common';
import { getLocalIp } from 'src/main';

@Injectable()
export class P2pClientService {

    private readonly PORT = 3000//process.argv[process.argv.indexOf("--port") + 1]
    private node_addresses: string[] = [
        getLocalIp() + ":" + this.PORT, //adding own address to ignore connection with own
    ]
    private sockets: any = []
    private seed_sockets: any = []
    private readonly seed_servers: string[] = [
        "http://seed:4000"
      //"http://localhost:4001",
      //"http://localhost:4002",
    ]


    constructor() {
        //this.seed_servers.push(process.env.SEED_SERVER_ADDRESS_1 || "http://seed:4000")
    }


    addNodeAddress(addr: string) : void {
        this.node_addresses.push(addr)
    }

    // replaceNodeAddressList(addrs: string[]) : void {
    //     this.node_addresses = addrs
    // }

    appendNodeAddrList(addrs: string[]) : void {
        this.node_addresses = [... new Set(...addrs, ...this.node_addresses)]
    }

    getNodeAddress() : string[] {
        return this.node_addresses
    }

    addSocket(socket: any): void {
        this.sockets.push(socket)
    }

    getSocketList(): any[] {
        return this.sockets
    }

    replaceSocketList(sockets: any[]): void {
        this.sockets = sockets
    }

    getSeedNodeAddrList(): string[] {
        return this.seed_servers
    }

    // addSeedNodeAddr(addr: string): void {
    //     this.seed_servers.push(addr)
    // }

    // replaceSeedNodeAddr(addrs: string[]): void {
    //     this.seed_servers = addrs
    // }

    addSeedSocket(seedSocket: any) : void {
        this.seed_sockets.push(seedSocket)
    }

    getSeedSocketList() : any[] {
        return this.seed_sockets
    }




}
