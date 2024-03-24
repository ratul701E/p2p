
import { ApiProperty } from "@nestjs/swagger";
export class mempoolDTO{
    @ApiProperty({
        description:"Success or Failed",
        example:"Success"
    })
    status: string;
    @ApiProperty({
        description:"Block count",
        example:"7"
    })
    block: number;
    @ApiProperty({
        description:"It will show the time when transaction is initiated",
        example:"1708199920901"
    })
    timestamp: number;
    @ApiProperty({
        description:"Send Or Receive",
        example:"transfer 0.021782283137410064 DCL to 0x87b3f3C934A13C779e100a5d6E6d7ef577e86671"
    })
    transactionAction: string;
    @ApiProperty({
        description:"Account address who send the money",
        example:"10000003044022061c4f548f589faet387700865a3d74c1fdf18058d5218480e466eea92a38fsu8susus09wt90wutjswgnhdwioatw4e8f335ca2a7afd417226143ea5d1a811ef3ea40356d8c49fa8c253e"
    })
    from: string;
    @ApiProperty({
        description:"Account address who received money",
        example:"3044022061c4f548f589387700865a3d74c5fdf18058d5218480e466eea92a38c9fc5fc802205a9e828c4e8f335ca2a7afd417226143ea5d1a811ef3ea40356d8c49fa8c253e"
    })
    to: string;
    @ApiProperty({
        description:"Show the transaction amount",
        example:"0.021782283137410065"
    })
    value: number;
    @ApiProperty({
        description:"Show the amount as transaction Fee",
        example:"0.000383982410952"
    })
    transactionFee: number;
    @ApiProperty({
        description:"Energy cost",
        example:"18.284876712"
    })
    gasPrice: number;
    @ApiProperty({
        description:"Transaction Hash",
        example:"ahahahahahahjdfdh93894"
    })
    transactionHash: string;
    @ApiProperty({
        description:"Digital Signature",
        example:"2457u29567239865289572896517675798sf9186r91gbf"
    })
    signature: string;
}

