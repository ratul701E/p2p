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
exports.BlockchainService = void 0;
const common_1 = require("@nestjs/common");
const database_service_service_1 = require("../database-service/database-service.service");
let BlockchainService = class BlockchainService {
    constructor(databaseService) {
        this.databaseService = databaseService;
        this.printBlockchain = async (numberOfInstances) => {
            let blockchain = [];
            return new Promise((resolve, reject) => {
                let stream = this.blockchain.createReadStream();
                let counter = 0;
                stream.on('data', (data) => {
                    blockchain.push(JSON.parse(data.value));
                    counter++;
                    if (numberOfInstances && counter >= numberOfInstances) {
                        stream.destroy();
                        resolve(blockchain.slice(-numberOfInstances));
                    }
                });
                stream.on('end', () => {
                    resolve(blockchain);
                });
                stream.on('error', (err) => {
                    reject(err);
                });
            });
        };
        this.printTotalTransactionCount = async () => {
            let full_chain = await this.printBlockchain(undefined);
            let count = 0;
            for (let block of full_chain) {
                count += block.transactions.length;
            }
            return count;
        };
        this.blockchain = databaseService.getBlockchainDBObject();
    }
    async addToBlockchain(block) {
        return new Promise((resolve, reject) => {
            this.blockchain.put(block.blockInfo.blockHash, JSON.stringify(block), (err) => err ? reject(err) : resolve(true));
        });
    }
    async getLastBlock() {
        return new Promise((resolve, reject) => {
            let stream = this.blockchain.createReadStream({ reverse: true, limit: 1 });
            stream.on('data', (data) => {
                let lastBlock = JSON.parse(data.value);
                resolve(lastBlock);
            });
            stream.on('end', () => { resolve(null); });
            stream.on('error', (error) => { reject(error); });
        });
    }
};
exports.BlockchainService = BlockchainService;
exports.BlockchainService = BlockchainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_service_1.DatabaseServiceService])
], BlockchainService);
//# sourceMappingURL=blockchain.service.js.map