import { Body, Controller, Get, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
@ApiTags("Blockchain")
@Controller('blockchain')
export class BlockchainController {
    constructor(
        private readonly blockchainService: BlockchainService
    ) {}
    @ApiOkResponse({description:"It will return the total blockchain"})
    @Get()
    async printBlockchain(@Body('count') numberOfInstances?: number){
        return await this.blockchainService.printBlockchain(numberOfInstances || undefined)
    }

    @Post()
    async addToBlockchain(){
        return await this.blockchainService.addToBlockchain(
            {
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
            }
        )
    }
}
