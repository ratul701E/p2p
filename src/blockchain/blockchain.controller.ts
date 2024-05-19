import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
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
                    blockHash: "0x0000000000000000000",
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
                        "transactionAction": "Transfer 10 DCL value to 0413c725274b4709b5faef702e0e91241eefca047a041561ce1d02e7e397fbe665de7f332c4799203770b16958f5e9989c3f11f0ae352588a75f440b891dc990b0",
                        "from": "Chain",
                        "to": "0413c725274b4709b5faef702e0e91241eefca047a041561ce1d02e7e397fbe665de7f332c4799203770b16958f5e9989c3f11f0ae352588a75f440b891dc990b0",
                        "value": 100,
                        "transactionFee": 0,
                        "gasPrice": 0,
                        "transactionHash": "0000000000000000000",
                        "signature": "0000000000000000000"
                    },
                    {
                        "status": "success",
                        "block": 1,
                        "timestamp": 1713952099817,
                        "transactionAction": "Transfer 10 DCL value to 047e8fcefa6ad28d9b675f5d8df9c55d7fd7407cf2f3fc1da464bedb65209a1671ddf17479814eef3a2ae1e5a6409bfb0d993cde108394af71d8c050fc68fbeefc",
                        "from": "Chain",
                        "to": "047e8fcefa6ad28d9b675f5d8df9c55d7fd7407cf2f3fc1da464bedb65209a1671ddf17479814eef3a2ae1e5a6409bfb0d993cde108394af71d8c050fc68fbeefc",
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

    @Get('total-transaction') 
    async getTotalTransaction() {
        return await this.blockchainService.printTotalTransactionCount()
    }

    @Get('transaction')
    async getAllTransaction() {
        return await this.blockchainService.printAllTransaction()
    }

    @Get('block/:number?')
    async getAllBlock(@Param('number') number: number = undefined) {
        return await this.blockchainService.printBlockchain(number)
    }

    @Get('last')
    async getLastBlock() {
        return await this.blockchainService.getLastBlock()
    }
}
