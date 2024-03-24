"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const p2p_server_module_1 = require("./p2p-server/p2p-server.module");
const p2p_client_module_1 = require("./p2p-client/p2p-client.module");
const transaction_module_1 = require("./transaction/transaction.module");
const consensus_module_1 = require("./consensus/consensus.module");
const block_module_1 = require("./block/block.module");
const database_service_module_1 = require("./database-service/database-service.module");
const blockchain_module_1 = require("./blockchain/blockchain.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [p2p_client_module_1.P2pClientModule, transaction_module_1.TransactionModule, p2p_server_module_1.P2pModule, consensus_module_1.ConsensusModule, block_module_1.BlockModule, database_service_module_1.DatabaseServiceModule, blockchain_module_1.BlockchainModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
        exports: [app_service_1.AppService]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map