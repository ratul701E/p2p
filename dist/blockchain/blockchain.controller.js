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
        return await this.blockchainService.printBlockchain(numberOfInstances);
    }
    async addToBlockchain() {
        return await this.blockchainService.addToBlockchain({
            blockInfo: {
                blockNumber: 1,
                timestamp: Date.now(),
                merkleRoot: "",
                blockHash: "0x00000000000000000001",
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
                    "transactionAction": "Transfer 10 DCL value to 04e4e622e9cf3d80809b503cbe126a5468268735aa63840a4ba48979c50fbcc54320a526a421606084c450fa280e14636a1f622fd0dc3c4beb9485895da892493e",
                    "from": "",
                    "to": "04f50cad99720770f1d3065ae871d8d39415109c7090bb2fddcc3216b33e8b769b4b9881f3f0a862b2b97dbce3e37b4d64ba6bd4a3a5f5eef16f28ee3085107b77",
                    "value": 100,
                    "transactionFee": 0,
                    "gasPrice": 0,
                    "transactionHash": "0000000000000000000",
                    "signature": "0000000000000000000"
                },
                {
                    "status": "pending",
                    "block": 1,
                    "timestamp": 1713952099817,
                    "transactionAction": "Transfer 10 DCL value to 04e4e622e9cf3d80809b503cbe126a5468268735aa63840a4ba48979c50fbcc54320a526a421606084c450fa280e14636a1f622fd0dc3c4beb9485895da892493e",
                    "from": "",
                    "to": "04e4e622e9cf3d80809b503cbe126a5468268735aa63840a4ba48979c50fbcc54320a526a421606084c450fa280e14636a1f622fd0dc3c4beb9485895da892493e",
                    "value": 100,
                    "transactionFee": 0,
                    "gasPrice": 0,
                    "transactionHash": "0000000000000000000",
                    "signature": "0000000000000000000"
                }
            ],
        });
    }
};
exports.BlockchainController = BlockchainController;
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: "It will return the total blockchain" }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)('count', common_1.ParseIntPipe)),
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
exports.BlockchainController = BlockchainController = __decorate([
    (0, swagger_1.ApiTags)("Blockchain"),
    (0, common_1.Controller)('blockchain'),
    __metadata("design:paramtypes", [blockchain_service_1.BlockchainService])
], BlockchainController);
//# sourceMappingURL=blockchain.controller.js.map