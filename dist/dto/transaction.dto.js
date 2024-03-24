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
exports.TransactionDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class TransactionDTO {
}
exports.TransactionDTO = TransactionDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Success or Failed",
        example: "Success"
    }),
    __metadata("design:type", String)
], TransactionDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Block count",
        example: "7"
    }),
    __metadata("design:type", Number)
], TransactionDTO.prototype, "block", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "It will show the time when transaction is initiated",
        example: "1708199920901"
    }),
    __metadata("design:type", Number)
], TransactionDTO.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Send Or Receive",
        example: "transfer 0.021782283137410064 DCL to 0x87b3f3C934A13C779e100a5d6E6d7ef577e86671"
    }),
    __metadata("design:type", String)
], TransactionDTO.prototype, "transactionAction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Account address who send the money",
        example: "10000003044022061c4f548f589faet387700865a3d74c1fdf18058d5218480e466eea92a38fsu8susus09wt90wutjswgnhdwioatw4e8f335ca2a7afd417226143ea5d1a811ef3ea40356d8c49fa8c253e"
    }),
    __metadata("design:type", String)
], TransactionDTO.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Account address who received money",
        example: "3044022061c4f548f589387700865a3d74c5fdf18058d5218480e466eea92a38c9fc5fc802205a9e828c4e8f335ca2a7afd417226143ea5d1a811ef3ea40356d8c49fa8c253e"
    }),
    __metadata("design:type", String)
], TransactionDTO.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Show the transaction amount",
        example: "0.021782283137410065"
    }),
    __metadata("design:type", Number)
], TransactionDTO.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Show the amount as transaction Fee",
        example: "0.000383982410952"
    }),
    __metadata("design:type", Number)
], TransactionDTO.prototype, "transactionFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Energy cost",
        example: "18.284876712"
    }),
    __metadata("design:type", Number)
], TransactionDTO.prototype, "gasPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Transaction Hash",
        example: "ahahahahahahjdfdh93894"
    }),
    __metadata("design:type", String)
], TransactionDTO.prototype, "transactionHash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Digital Signature",
        example: "2457u29567239865289572896517675798sf9186r91gbf"
    }),
    __metadata("design:type", String)
], TransactionDTO.prototype, "signature", void 0);
//# sourceMappingURL=transaction.dto.js.map