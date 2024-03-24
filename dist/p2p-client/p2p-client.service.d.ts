export declare class P2pClientService {
    private readonly PORT;
    private node_addresses;
    private sockets;
    private seed_sockets;
    private readonly seed_servers;
    addNodeAddress(addr: string): void;
    appendNodeAddrList(addrs: string[]): void;
    getNodeAddress(): string[];
    addSocket(socket: any): void;
    getSocketList(): any[];
    replaceSocketList(sockets: any[]): void;
    getSeedNodeAddrList(): string[];
    addSeedSocket(seedSocket: any): void;
    getSeedSocketList(): any[];
}
