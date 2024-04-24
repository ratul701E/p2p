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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockService = void 0;
const common_1 = require("@nestjs/common");
const database_service_service_1 = require("../database-service/database-service.service");
const crypto_1 = __importDefault(require("crypto"));
const transaction_service_1 = require("../transaction/transaction.service");
const p2p_client_service_1 = require("../p2p-client/p2p-client.service");
const axios_1 = __importDefault(require("axios"));
const blockchain_service_1 = require("../blockchain/blockchain.service");
const main_1 = require("../main");
const p2p_server_gateway_1 = require("../p2p-server/p2p-server.gateway");
const GENERATION_DELAY = 10000;
const MINIMUM_TRANSACTION_PER_BLOCK = 2;
let BlockService = class BlockService {
    constructor(dbService, transactionService, p2pClientsService, blockchainService, p2pServerGateway) {
        this.dbService = dbService;
        this.transactionService = transactionService;
        this.p2pClientsService = p2pClientsService;
        this.blockchainService = blockchainService;
        this.p2pServerGateway = p2pServerGateway;
        this.mempool = dbService.getMempoolDBObject();
    }
    async onModuleInit() {
        setInterval(() => {
            this.genereateBlock();
        }, GENERATION_DELAY);
    }
    async genereateBlock() {
        console.log("generating block ... ");
        const _mempool = await this.transactionService.printMempool();
        const valid_transactions = [];
        const last_block = await this.blockchainService.getLastBlock();
        const node_addresses = await this.p2pClientsService.getNodeAddress();
        const node_staking_info = [];
        for (const transaction of _mempool) {
            const status = await this.transactionService.validateTransaction(transaction);
            if (status == "Valid Transaction") {
                valid_transactions.push(transaction);
            }
        }
        if (valid_transactions.length < MINIMUM_TRANSACTION_PER_BLOCK) {
            console.log("Currently " +
                valid_transactions.length +
                " number of transactions are valid.");
            console.log("Still " + (MINIMUM_TRANSACTION_PER_BLOCK - valid_transactions.length) + " transactions needed.");
            return;
        }
        for (let addr of node_addresses) {
            const req_addr = "http://" + addr + "/info";
            await axios_1.default.get(req_addr).then((res) => {
                node_staking_info.push(res.data);
            });
        }
        node_staking_info.sort((a, b) => b.staking_coin - a.staking_coin);
        let top3Nodes = node_staking_info.slice(0, 3);
        let randomNodeIndex = Math.floor(Math.random() * top3Nodes.length);
        let selectedNode = top3Nodes[randomNodeIndex];
        if (selectedNode.addr !== (0, main_1.getLocalIp)() + ":3000")
            return;
        const blockWithTransactions = {
            blockInfo: {
                blockNumber: last_block.blockInfo.blockNumber + 1,
                timestamp: Date.now(),
                merkleRoot: "",
                blockHash: "",
                previousBlockHash: last_block.blockInfo.blockHash,
                validator: {
                    publicKey: selectedNode.public_key,
                    stakingBalance: selectedNode.staking_coin,
                    validatorSignature: selectedNode.public_key,
                },
                proofOfStake: {
                    stakingReward: 2,
                },
            },
            transactions: [],
        };
        valid_transactions.forEach((transaction, index) => {
            const transactionHash = crypto_1.default
                .createHash("sha256")
                .update(JSON.stringify(transaction))
                .digest("hex");
            transaction.transactionHash = transactionHash;
            transaction.block = blockWithTransactions.blockInfo.blockNumber;
            transaction.status = 'success';
            blockWithTransactions.transactions.push(transaction);
        });
        const merkleRoot = await this.buildMerkleTree(blockWithTransactions.transactions);
        blockWithTransactions.blockInfo.merkleRoot = merkleRoot;
        const blockHash = crypto_1.default
            .createHash("sha256")
            .update(JSON.stringify(blockWithTransactions.blockInfo))
            .digest("hex");
        blockWithTransactions.blockInfo.blockHash = blockHash;
    }
    async buildMerkleTree(transactions) {
        if (transactions.length === 0) {
            return null;
        }
        const tree = transactions.map((transaction) => crypto_1.default
            .createHash("sha256")
            .update(transaction.transactionHash)
            .digest("hex"));
        while (tree.length > 1) {
            const level = [];
            for (let i = 0; i < tree.length; i += 2) {
                const left = tree[i];
                const right = i + 1 < tree.length ? tree[i + 1] : "";
                const combined = left + right;
                const hash = crypto_1.default.createHash("sha256").update(combined).digest("hex");
                level.push(hash);
            }
            tree.length = 0;
            tree.push(...level);
        }
        return tree[0];
    }
};
exports.BlockService = BlockService;
exports.BlockService = BlockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_service_1.DatabaseServiceService,
        transaction_service_1.TransactionService,
        p2p_client_service_1.P2pClientService,
        blockchain_service_1.BlockchainService,
        p2p_server_gateway_1.P2pGateway])
], BlockService);
//# sourceMappingURL=block.service.js.map