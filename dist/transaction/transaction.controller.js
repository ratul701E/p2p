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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("./transaction.service");
const transaction_dto_1 = require("../dto/transaction.dto");
const swagger_1 = require("@nestjs/swagger");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    async addTransactionToMempool(transaction) {
        console.log(transaction);
        return await this.transactionService.addTransactionToMempool(transaction);
    }
    async getMempool() {
        return await this.transactionService.printMempool();
    }
};
exports.TransactionController = TransactionController;
__decorate([
    (0, swagger_1.ApiCreatedResponse)({ description: "return true and transaction will be added to mempool" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Return false and transaction decline" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_dto_1.TransactionDTO]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "addTransactionToMempool", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: "It will return the mempool" }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getMempool", null);
exports.TransactionController = TransactionController = __decorate([
    (0, swagger_1.ApiTags)("Transaction"),
    (0, common_1.Controller)('transaction'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
//# sourceMappingURL=transaction.controller.js.map