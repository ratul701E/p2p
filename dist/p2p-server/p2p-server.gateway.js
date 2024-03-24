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
exports.P2pGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const transaction_dto_1 = require("../dto/transaction.dto");
let P2pGateway = class P2pGateway {
    constructor() {
    }
    getSocketsCount() {
        const { sockets } = this.server.sockets;
        return sockets.size;
    }
    afterInit(server) {
        console.log("P2P Server initialized.....");
    }
    handleConnection(client, ...args) {
        console.log("NEW NODE! connected: ", this.getSocketsCount());
    }
    handleDisconnect(client) {
        console.log("NODE LEAVE! connected: ", this.getSocketsCount());
    }
    async handlNewTransaction(client, transaction) {
    }
    async handleNewBlock(client, block) {
        client.broadcast.emit('new_block', block);
    }
    transactionBroadcast(transaction) {
        this.server.emit('new_transaction', transaction);
    }
    blockBroadcast(block) {
        this.server.emit('new_block', block);
        console.log("block broadcasted");
    }
};
exports.P2pGateway = P2pGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], P2pGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('new_transaction'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, transaction_dto_1.TransactionDTO]),
    __metadata("design:returntype", Promise)
], P2pGateway.prototype, "handlNewTransaction", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('new_block'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], P2pGateway.prototype, "handleNewBlock", null);
exports.P2pGateway = P2pGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [])
], P2pGateway);
//# sourceMappingURL=p2p-server.gateway.js.map