"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.P2pClientService = void 0;
const common_1 = require("@nestjs/common");
const main_1 = require("../main");
let P2pClientService = class P2pClientService {
    constructor() {
        this.PORT = 3000;
        this.node_addresses = [
            (0, main_1.getLocalIp)() + ":" + this.PORT,
        ];
        this.sockets = [];
        this.seed_sockets = [];
        this.seed_servers = [
            "http://192.168.165.8:4000",
        ];
    }
    addNodeAddress(addr) {
        this.node_addresses.push(addr);
    }
    appendNodeAddrList(addrs) {
        this.node_addresses = [...new Set(...addrs, ...this.node_addresses)];
    }
    getNodeAddress() {
        return this.node_addresses;
    }
    addSocket(socket) {
        this.sockets.push(socket);
    }
    getSocketList() {
        return this.sockets;
    }
    replaceSocketList(sockets) {
        this.sockets = sockets;
    }
    getSeedNodeAddrList() {
        return this.seed_servers;
    }
    addSeedSocket(seedSocket) {
        this.seed_sockets.push(seedSocket);
    }
    getSeedSocketList() {
        return this.seed_sockets;
    }
};
exports.P2pClientService = P2pClientService;
exports.P2pClientService = P2pClientService = __decorate([
    (0, common_1.Injectable)()
], P2pClientService);
//# sourceMappingURL=p2p-client.service.js.map