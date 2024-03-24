"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockModule = void 0;
const common_1 = require("@nestjs/common");
const block_controller_1 = require("./block.controller");
const block_service_1 = require("./block.service");
const database_service_module_1 = require("../database-service/database-service.module");
const transaction_module_1 = require("../transaction/transaction.module");
const p2p_client_module_1 = require("../p2p-client/p2p-client.module");
const blockchain_module_1 = require("../blockchain/blockchain.module");
const p2p_server_module_1 = require("../p2p-server/p2p-server.module");
let BlockModule = class BlockModule {
};
exports.BlockModule = BlockModule;
exports.BlockModule = BlockModule = __decorate([
    (0, common_1.Module)({
        imports: [database_service_module_1.DatabaseServiceModule, transaction_module_1.TransactionModule, p2p_client_module_1.P2pClientModule, blockchain_module_1.BlockchainModule, p2p_server_module_1.P2pModule],
        controllers: [block_controller_1.BlockController],
        providers: [block_service_1.BlockService]
    })
], BlockModule);
//# sourceMappingURL=block.module.js.map