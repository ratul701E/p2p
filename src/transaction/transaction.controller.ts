import { Controller, Post, Get, Body, Delete, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDTO } from 'src/dto/transaction.dto';
import { promises } from 'dns';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { mempoolDTO } from 'src/dto/mempool.dto';

@ApiTags("Transaction")
@Controller('transaction')
export class TransactionController {

    constructor(private readonly transactionService: TransactionService) {}
    @ApiCreatedResponse({description:"return true and transaction will be added to mempool"})
    @ApiBadRequestResponse({description:"Return false and transaction decline"})
    @Post()
    async addTransactionToMempool(@Body() transaction: TransactionDTO): Promise <any> {
        console.log(transaction)
        return await this.transactionService.addTransactionToMempool(transaction)

    }

    @ApiOkResponse({description:"It will return the mempool"})
    @Get()
    async getMempool():Promise<mempoolDTO[]> {

        return await this.transactionService.printMempool()

    }

    @Delete()
    async deleteTransaction(@Body() transaction: TransactionDTO) {
        return await this.transactionService.deleteTransactionFromMempool(transaction)
    }

    @Get('/balance/:address')
    async getBalance(@Param('address') address: string) {
        return {
            balance: await this.transactionService.getBalance(address),
        }
    }


}
