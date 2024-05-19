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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainController = void 0;
const common_1 = require("@nestjs/common");
const blockchain_service_1 = require("./blockchain.service");
const swagger_1 = require("@nestjs/swagger");
let BlockchainController = class BlockchainController {
    constructor(blockchainService) {
        this.blockchainService = blockchainService;
    }
    async printBlockchain(numberOfInstances) {
        return await this.blockchainService.printBlockchain(numberOfInstances || undefined);
    }
    async addToBlockchain() {
        return await this.blockchainService.addToBlockchain({
            blockInfo: {
                blockNumber: 1,
                timestamp: Date.now(),
                merkleRoot: "",
                blockHash: "0x0000000000000000000",
                previousBlockHash: "0x00000000000000000000",
                validator: {
                    publicKey: "Chain",
                    stakingBalance: 'null',
                    validatorSignature: 'null',
                },
                proofOfStake: {
                    stakingReward: 0,
                },
            },
            transactions: [
                {
                    "status": "success",
                    "block": 1,
                    "timestamp": 1713952099817,
                    "transactionAction": "Transfer 10 DCL value to 0413c725274b4709b5faef702e0e91241eefca047a041561ce1d02e7e397fbe665de7f332c4799203770b16958f5e9989c3f11f0ae352588a75f440b891dc990b0",
                    "from": "Chain",
                    "to": "0413c725274b4709b5faef702e0e91241eefca047a041561ce1d02e7e397fbe665de7f332c4799203770b16958f5e9989c3f11f0ae352588a75f440b891dc990b0",
                    "value": 100,
                    "transactionFee": 0,
                    "gasPrice": 0,
                    "transactionHash": "0000000000000000000",
                    "signature": "0000000000000000000"
                },
                {
                    "status": "success",
                    "block": 1,
                    "timestamp": 1713952099817,
                    "transactionAction": "Transfer 10 DCL value to 047e8fcefa6ad28d9b675f5d8df9c55d7fd7407cf2f3fc1da464bedb65209a1671ddf17479814eef3a2ae1e5a6409bfb0d993cde108394af71d8c050fc68fbeefc",
                    "from": "Chain",
                    "to": "047e8fcefa6ad28d9b675f5d8df9c55d7fd7407cf2f3fc1da464bedb65209a1671ddf17479814eef3a2ae1e5a6409bfb0d993cde108394af71d8c050fc68fbeefc",
                    "value": 100,
                    "transactionFee": 0,
                    "gasPrice": 0,
                    "transactionHash": "0000000000000000000",
                    "signature": "0000000000000000000"
                }
            ],
        });
    }
    async getTotalTransaction() {
        return await this.blockchainService.printTotalTransactionCount();
    }
    async getAllTransaction() {
        return await this.blockchainService.printAllTransaction();
    }
    async getAllBlock(number = undefined) {
        return await this.blockchainService.printBlockchain(number);
    }
    async getLastBlock() {
        return await this.blockchainService.getLastBlock();
    }
};
exports.BlockchainController = BlockchainController;
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: "It will return the total blockchain" }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "printBlockchain", null);
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "addToBlockchain", null);
__decorate([
    (0, common_1.Get)('total-transaction'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "getTotalTransaction", null);
__decorate([
    (0, common_1.Get)('transaction'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "getAllTransaction", null);
__decorate([
    (0, common_1.Get)('block/:number?'),
    __param(0, (0, common_1.Param)('number')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "getAllBlock", null);
__decorate([
    (0, common_1.Get)('last'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "getLastBlock", null);
exports.BlockchainController = BlockchainController = __decorate([
    (0, swagger_1.ApiTags)("Blockchain"),
    (0, common_1.Controller)('blockchain'),
    __metadata("design:paramtypes", [blockchain_service_1.BlockchainService])
], BlockchainController);
//# sourceMappingURL=blockchain.controller.js.map