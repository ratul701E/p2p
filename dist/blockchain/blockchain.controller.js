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
                previousBlockHash: "null",
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
                    "timestamp": new Date(),
                    "transactionAction": "Transfer 10 DCL value to 0413c725274b4709b5faef702e0e91241eefca047a041561ce1d02e7e397fbe665de7f332c4799203770b16958f5e9989c3f11f0ae352588a75f440b891dc990b0",
                    "from": "Chain",
                    "to": "04ae7aca61c23b5096ffd40d4ec86cf4e6e6f4ec75abf7478d4824d03a1c9af27febb3d53f110ebfa125ab972bf7b460f64ed1fb3353fdb479a05c2d3edcde0c22",
                    "value": 1000,
                    "transactionFee": 0,
                    "gasPrice": 0,
                    "transactionHash": "69f67a93c0bbf76b7f0e924206bf25c6b2ad1af68e1c84a4d8c6eb6e2fdd024a",
                    "signature": "0000000000000000000"
                },
                {
                    "status": "success",
                    "block": 1,
                    "timestamp": new Date(),
                    "transactionAction": "Transfer 10 DCL value to 047e8fcefa6ad28d9b675f5d8df9c55d7fd7407cf2f3fc1da464bedb65209a1671ddf17479814eef3a2ae1e5a6409bfb0d993cde108394af71d8c050fc68fbeefc",
                    "from": "Chain",
                    "to": "04d8823fd9a5c26d0f0ce8fd16f9612d014c80e0841e57e004e05b041710bb94cf11c8ae29b647d7a353874f3ae0f13df7f8c8988567de06c786c2af4218e8f9f6",
                    "value": 1000,
                    "transactionFee": 0,
                    "gasPrice": 0,
                    "transactionHash": "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b232f0d2edfb7dba3",
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
    async getBlockByNumber(number) {
        return await this.blockchainService.getBlockByNumber(number);
    }
    async getBlockByHash(hash) {
        return await this.blockchainService.getBlockByHash(hash);
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
    (0, common_1.Get)('blocks/:number?'),
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
__decorate([
    (0, common_1.Get)("block/number/:number"),
    __param(0, (0, common_1.Param)('number')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "getBlockByNumber", null);
__decorate([
    (0, common_1.Get)("block/hash/:hash"),
    __param(0, (0, common_1.Param)('hash')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "getBlockByHash", null);
exports.BlockchainController = BlockchainController = __decorate([
    (0, swagger_1.ApiTags)("Blockchain"),
    (0, common_1.Controller)('blockchain'),
    __metadata("design:paramtypes", [blockchain_service_1.BlockchainService])
], BlockchainController);
//# sourceMappingURL=blockchain.controller.js.map