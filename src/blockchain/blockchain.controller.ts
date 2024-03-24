import { Controller, Get, Post } from '@nestjs/common';
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
    async printBlockchain(){
        return await this.blockchainService.printBlockchain()
    }

    // @Post()
    // async addToBlockchain(){
    //     return await this.blockchainService.addToBlockchain(
    //         {
    //             blockInfo: {
    //                 blockNumber: 1,
    //                 timestamp: Date.now(),
    //                 merkleRoot: "",
    //                 blockHash: "0x00000000000000000001",
    //                 previousBlockHash: "0x00000000000000000000",
    //                 validator: {
    //                     publicKey: "Chain",
    //                     stakingBalance: 'null',
    //                     validatorSignature: 'null',
    //                 },
    //                 proofOfStake: {
    //                     stakingReward: 0,
    //                     stakingDifficulty: 0,
    //                 },
    //             },
    //             transactions: [
    //                 {
    //                     "status": "Success",
    //                     "block": 0,
    //                     "timestamp": 1708199920901,
    //                     "transactionAction": "transfer 0.021782283137410064 DCL to 0x87b3f3C934A13C779e100a5d6E6d7ef577e86671",
    //                     "from": "",
    //                     "to": "0x222",
    //                     "value": 100.021782283137410065,
    //                     "transactionFee": 0.000383982410952,
    //                     "gasPrice": 18.284876712,
    //                     "transactionHash": "0x12345678",
    //                     "signature": "2457u29567239865289572896517675798sf9186r91gbf"
    //                   },
    //                   {
    //                     "status": "Success",
    //                     "block": 0,
    //                     "timestamp": 1708199920901,
    //                     "transactionAction": "transfer 0.021782283137410064 DCL to 0x87b3f3C934A13C779e100a5d6E6d7ef577e86671",
    //                     "from": "",
    //                     "to": "0x111",
    //                     "value": 200.021782283137410065,
    //                     "transactionFee": 0.000383982410952,
    //                     "gasPrice": 18.284876712,
    //                     "transactionHash": "0x87654321",
    //                     "signature": "2457u29567239865289572896517675798sf9186r91gbf"
    //                   }
    //             ],
    //         }
    //     )
    // }
}
