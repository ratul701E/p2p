"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.P2pClientGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const p2p_client_service_1 = require("./p2p-client.service");
const socket_io_client_1 = require("socket.io-client");
const socket_io_1 = require("socket.io");
const main_1 = require("../main");
const transaction_service_1 = require("../transaction/transaction.service");
let P2pClientGateway = class P2pClientGateway {
    constructor(p2pClientService, transacationService) {
        this.p2pClientService = p2pClientService;
        this.transacationService = transacationService;
        this.PORT = 3000;
    }
    async afterInit(server) {
        await this.connectToSeedServers();
    }
    async connectToSeedServers() {
        for (const seedAddr of this.p2pClientService.getSeedNodeAddrList()) {
            const seedSocket = (0, socket_io_client_1.io)(seedAddr, {
                query: {
                    addr: (0, main_1.getLocalIp)() + ":" + this.PORT
                }
            });
            seedSocket.on('connect', async () => {
                this.p2pClientService.addSeedSocket(seedSocket);
                console.log(`Connected to seed server [${JSON.stringify(seedAddr)}]`);
            });
            seedSocket.on('disconnect', () => {
                console.log(`Disconnected from seed server [${JSON.stringify(seedAddr)}]`);
            });
            seedSocket.on('new_node_addr', () => {
            });
            seedSocket.on('node_info_res', node_addr_list => {
                console.log(node_addr_list);
                for (const addr of node_addr_list) {
                    if (this.p2pClientService.getNodeAddress().indexOf(addr) === -1) {
                        this.p2pClientService.addNodeAddress(addr);
                        this.connect(addr);
                    }
                }
            });
        }
    }
    async getNodeAddressFromSeedServer(seedServer) {
        if (seedServer.connected)
            seedServer.emit('node_info_req', (0, main_1.getLocalIp)() + this.PORT);
    }
    connect(addr) {
        const socket = (0, socket_io_client_1.io)("http://" + addr);
        socket.on('connect', () => {
            this.p2pClientService.addSocket(socket);
            console.log(`"Connected as a client to ${addr}"`);
        });
        socket.on('disconnect', () => {
            console.log(`"Disconnected as a client from ${addr}"`);
        });
        socket.on('new_transaction', async (transaction) => {
            console.log(`Received transaction from server (${JSON.stringify(addr)}): ${JSON.stringify(transaction)}`);
            await this.transacationService.addTransactionToMempool(transaction) ? console.log("Transaction successfully added to mempool") : console.log("Transaction already exists in the mepool");
        });
        socket.on('new_block', async (block) => {
            console.log(`Received block from server (${JSON.stringify(addr)}): ${JSON.stringify(block)}`);
        });
        socket.on('new_node_connect', transaction => {
            console.log(`Broadcast: ${JSON.stringify(transaction)}`);
        });
        socket.on('node_disconnect', transaction => {
            console.log(`Broadcast: ${JSON.stringify(transaction)}`);
        });
    }
};
exports.P2pClientGateway = P2pClientGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], P2pClientGateway.prototype, "server", void 0);
exports.P2pClientGateway = P2pClientGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [p2p_client_service_1.P2pClientService, transaction_service_1.TransactionService])
], P2pClientGateway);
//# sourceMappingURL=p2p-client.gateway.js.map