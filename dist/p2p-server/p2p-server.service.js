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
exports.P2pService = void 0;
const common_1 = require("@nestjs/common");
const p2p_server_gateway_1 = require("./p2p-server.gateway");
let P2pService = class P2pService {
    constructor(p2pGateway) {
        this.p2pGateway = p2pGateway;
    }
    transactionBroadcast(transaction) {
        this.p2pGateway.transactionBroadcast(transaction);
    }
};
exports.P2pService = P2pService;
exports.P2pService = P2pService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [p2p_server_gateway_1.P2pGateway])
], P2pService);
//# sourceMappingURL=p2p-server.service.js.map