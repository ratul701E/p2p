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
exports.DatabaseServiceService = void 0;
const common_1 = require("@nestjs/common");
const levelup_1 = __importDefault(require("levelup"));
const leveldown_1 = __importDefault(require("leveldown"));
let DatabaseServiceService = class DatabaseServiceService {
    constructor() {
        this.mempool = (0, levelup_1.default)((0, leveldown_1.default)('src/database/mempool'));
        this.blockchain = (0, levelup_1.default)((0, leveldown_1.default)('src/database/blockchain'));
    }
    getMempoolDBObject() {
        return this.mempool;
    }
    getBlockchainDBObject() {
        return this.blockchain;
    }
};
exports.DatabaseServiceService = DatabaseServiceService;
exports.DatabaseServiceService = DatabaseServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DatabaseServiceService);
//# sourceMappingURL=database-service.service.js.map