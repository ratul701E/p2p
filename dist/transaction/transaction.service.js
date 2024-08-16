"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const p2p_server_service_1 = require("../p2p-server/p2p-server.service");
const database_service_service_1 = require("../database-service/database-service.service");
const elliptic = __importStar(require("elliptic"));
let TransactionService = class TransactionService {
    constructor(p2pService, dbService) {
        this.p2pService = p2pService;
        this.dbService = dbService;
        this.transactionExists = async (transaction) => {
            return new Promise((resolve, reject) => {
                let stream = this.mempool.createReadStream();
                stream.on('data', (data) => {
                    let tx = JSON.parse(data.value);
                    if (tx.transactionHash === transaction.transactionHash) {
                        stream.destroy();
                        resolve(true);
                    }
                });
                stream.on('end', () => resolve(false));
                stream.on('error', (err) => reject(err));
            });
        };
        this.putTransaction = async (transaction) => {
            this.p2pService.transactionBroadcast(transaction);
            return new Promise((resolve, reject) => {
                this.mempool.put(transaction.transactionHash, JSON.stringify(transaction), (err) => err ? reject(err) : resolve(true));
            });
        };
        this.addTransactionToMempool = async (transaction) => {
            return await this.transactionExists(transaction) ? false : await this.putTransaction(transaction);
        };
        this.deleteTransactionFromMempool = async (transaction) => {
            return new Promise((resolve, reject) => {
                let stream = this.mempool.createReadStream();
                stream.on('data', (data) => {
                    let storedTransaction = JSON.parse(data.value);
                    if (storedTransaction.transactionHash === transaction.transactionHash) {
                        this.mempool.del(transaction.transactionHash, (err) => err ? reject(err) : resolve(true));
                        stream.destroy();
                    }
                });
                stream.on('end', () => resolve(false));
                stream.on('error', (err) => reject(err));
            });
        };
        this.mempool = this.dbService.getMempoolDBObject();
        this.blockchain = this.dbService.getBlockchainDBObject();
        this.ec = new elliptic.ec('secp256k1');
    }
    async printMempool() {
        let mempool = [];
        return new Promise((resolve, reject) => {
            let stream = this.mempool.createReadStream();
            stream.on('data', (data) => { mempool.push(JSON.parse(data.value)); });
            stream.on('end', () => { resolve(mempool); });
            stream.on('error', (err) => { reject(err); });
        });
    }
    async validateBalance(transaction) {
        let balance = await this.getBalance(transaction.from);
        return balance >= (transaction.value + transaction.transactionFee);
    }
    async validateTransaction(transaction) {
        if (!await this.validateBalance(transaction))
            return "Insufficient Account Balance";
        if (!await this.validateSignature(transaction))
            return "Unable to Validate Signature";
        return "Valid Transaction";
    }
    async getBalance(targetAddress) {
        return new Promise((resolve, reject) => {
            let balance = 0;
            let stream = this.blockchain.createReadStream();
            stream.on('data', (data) => {
                let block = JSON.parse(data.value);
                block.transactions.forEach(transaction => {
                    if (transaction.from === targetAddress)
                        balance -= transaction.value + transaction.transactionFee;
                    if (transaction.to === targetAddress)
                        balance += transaction.value;
                });
            });
            stream.on('end', () => resolve(balance));
            stream.on('error', (err) => reject(err));
            return balance;
        });
    }
    async validateSignature(transaction) {
        try {
            if (!transaction || !transaction.from) {
                throw new Error('Transaction or sender not found');
            }
            let key = this.ec.keyFromPublic(transaction.from, 'hex');
            return key.verify(transaction.transactionHash, transaction.signature);
        }
        catch (error) {
            console.error('Failed to validate signature:', error);
            return false;
        }
    }
    async getTransactionByHash(transactionHash) {
        return new Promise((resolve, reject) => {
            let stream = this.blockchain.createReadStream();
            stream.on('data', (data) => {
                const block = JSON.parse(data.value);
                const transactions = block.transactions;
                for (let transaction of transactions) {
                    if (transaction.transactionHash == transactionHash) {
                        stream.destroy();
                        resolve(transaction);
                        return;
                    }
                }
            });
            stream.on('end', () => {
                reject(new Error(`Transaction with hash ${transactionHash} not found`));
            });
            stream.on('error', (err) => {
                reject(err);
            });
        });
    }
    async getAllTransactionByPublicKey(publicKey) {
        return new Promise((resolve, reject) => {
            let stream = this.blockchain.createReadStream();
            let matchedTransactions = [];
            stream.on('data', (data) => {
                const block = JSON.parse(data.value);
                const transactions = block.transactions;
                for (let transaction of transactions) {
                    if (transaction.from == publicKey || transaction.to == publicKey) {
                        matchedTransactions.push(transaction);
                    }
                }
            });
            stream.on('end', () => {
                resolve(matchedTransactions);
            });
            stream.on('error', (err) => {
                reject(err);
            });
        });
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [p2p_server_service_1.P2pService,
        database_service_service_1.DatabaseServiceService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map