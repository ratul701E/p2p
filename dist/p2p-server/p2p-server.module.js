"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.P2pModule = void 0;
const common_1 = require("@nestjs/common");
const p2p_server_service_1 = require("./p2p-server.service");
const p2p_server_gateway_1 = require("./p2p-server.gateway");
let P2pModule = class P2pModule {
};
exports.P2pModule = P2pModule;
exports.P2pModule = P2pModule = __decorate([
    (0, common_1.Module)({
        providers: [p2p_server_gateway_1.P2pGateway, p2p_server_service_1.P2pService],
        imports: [],
        exports: [p2p_server_service_1.P2pService, p2p_server_gateway_1.P2pGateway]
    })
], P2pModule);
//# sourceMappingURL=p2p-server.module.js.map