"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalIp = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const os_1 = __importDefault(require("os"));
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const PORT = 3000;
    const config = new swagger_1.DocumentBuilder()
        .setTitle('DCLink - A Decentralized Peer-to-Peer Network')
        .setDescription('The primary goal of this project is to create a robust and user-friendly blockchain simulation platform that replicated key features of a real world blockchain network.By implementing functionalities such as decentralized transaction processing, smart contracts, gas fees, and wallet management, this project aims to provide users an experience of blockchain technology. Additionally, the development of frontend features such as block explorer and wallet aims to inhance user experience. This project aims to promote understanding and adoption of blockchain technology while offering users a practical environment to explore and experiment with blockchain concepts and applications.')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('p2p', app, document);
    await app.listen(PORT, (0, exports.getLocalIp)());
    console.log("Running on: " + (0, exports.getLocalIp)() + ":" + PORT);
}
bootstrap();
const getLocalIp = () => {
    const networkInterfaces = os_1.default.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        const addresses = networkInterfaces[interfaceName];
        if (addresses) {
            for (const addressInfo of addresses) {
                if (addressInfo.family === 'IPv4' && !addressInfo.internal) {
                    return addressInfo.address;
                }
            }
        }
    }
    return '';
};
exports.getLocalIp = getLocalIp;
//# sourceMappingURL=main.js.map