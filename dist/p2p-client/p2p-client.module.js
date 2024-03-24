"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.P2pClientModule = void 0;
const common_1 = require("@nestjs/common");
const p2p_client_service_1 = require("./p2p-client.service");
const p2p_client_gateway_1 = require("./p2p-client.gateway");
const transaction_module_1 = require("../transaction/transaction.module");
let P2pClientModule = class P2pClientModule {
};
exports.P2pClientModule = P2pClientModule;
exports.P2pClientModule = P2pClientModule = __decorate([
    (0, common_1.Module)({
        providers: [p2p_client_gateway_1.P2pClientGateway, p2p_client_service_1.P2pClientService],
        imports: [transaction_module_1.TransactionModule],
        exports: [p2p_client_service_1.P2pClientService]
    })
], P2pClientModule);
//# sourceMappingURL=p2p-client.module.js.map