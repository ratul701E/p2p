import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TransactionDTO } from 'src/dto/transaction.dto';
import { P2pService } from 'src/p2p-server/p2p-server.service';
import { DatabaseServiceService } from 'src/database-service/database-service.service';
import { EC } from 'elliptic';
import * as elliptic from 'elliptic';
import { mempoolDTO } from 'src/dto/mempool.dto';

@Injectable()
export class TransactionService {

    private readonly mempool: any
    private readonly blockchain: any
    private readonly ec: EC

    constructor(
        private readonly p2pService: P2pService,
        private readonly dbService: DatabaseServiceService
    ) {
        this.mempool = this.dbService.getMempoolDBObject()
        this.blockchain = this.dbService.getBlockchainDBObject()
        this.ec = new elliptic.ec('secp256k1')
    }

    transactionExists = async (transaction: TransactionDTO) => {

        return new Promise((resolve, reject) => {

            let stream = this.mempool.createReadStream()

            stream.on('data', (data: any) => {

                let tx = JSON.parse(data.value);

                if (tx.transactionHash === transaction.transactionHash) {

                    stream.destroy()
                    resolve(true)

                }

            })
            stream.on('end', () => resolve(false))
            stream.on('error', (err: any) => reject(err))

        })

    }

    putTransaction = async (transaction: TransactionDTO) => {
        this.p2pService.transactionBroadcast(transaction)
        return new Promise((resolve, reject) => {

            this.mempool.put(transaction.transactionHash, JSON.stringify(transaction), (err: any) => err ? reject(err) : resolve(true))
            //this.p2pService.broadcast(transaction)
            //this.server.emit('new_transaction', transaction)


        })

    }

    addTransactionToMempool = async (transaction: TransactionDTO) => {

        return await this.transactionExists(transaction) ? false : await this.putTransaction(transaction)

    }

    deleteTransactionFromMempool = async (transaction: TransactionDTO) => {

        return new Promise((resolve, reject) => {
            //console.log(transaction)
            let stream = this.mempool.createReadStream();

            stream.on('data', (data: any) => {

                let storedTransaction = JSON.parse(data.value);

                if (storedTransaction.transactionHash === transaction.transactionHash) {

                    this.mempool.del(transaction.transactionHash, (err: any) => err ? reject(err) : resolve(true))
                    stream.destroy()

                }

            })
            stream.on('end', () => resolve(false))
            stream.on('error', (err: any) => reject(err))

        })

    }


    async printMempool(): Promise<mempoolDTO[]> {

        let mempool: mempoolDTO[] = []
        return new Promise((resolve, reject) => {

            let stream = this.mempool.createReadStream()

            stream.on('data', (data: any) => { mempool.push(JSON.parse(data.value)) })
            stream.on('end', () => { resolve(mempool) })
            stream.on('error', (err: any) => { reject(err) })

        })

    }



    async validateBalance(transaction) {

        let balance = await this.getBalance(transaction.from)
        return balance >= (transaction.value + transaction.transactionFee)

    }

    async validateTransaction(transaction) {
        //console.log(transaction)
        if (!await this.validateBalance(transaction)) return "Insufficient Account Balance"
        if (!await this.validateSignature(transaction)) return "Unable to Validate Signature"

        return "Valid Transaction"

    }

    // async validateSignature(transaction) {

    //     try {

    //         let key = this.ec.keyFromPublic(transaction.from, 'hex')
    //         return key.verify(transaction.transactionHash, transaction.signature)

    //     } catch (error) { return false }





    async getBalance(targetAddress) {

        return new Promise((resolve, reject) => {

            let balance = 0
            let stream = this.blockchain.createReadStream()

            stream.on('data', (data) => {

                let block = JSON.parse(data.value);

                block.transactions.forEach(transaction => {

                    if (transaction.from === targetAddress) balance -= transaction.value + transaction.transactionFee;
                    if (transaction.to === targetAddress) balance += transaction.value;

                })

            })
            stream.on('end', () => resolve(balance))
            stream.on('error', (err) => reject(err))

            return balance

        })

    }

    async validateSignature(transaction): Promise<boolean> {
        try {
            if (!transaction || !transaction.from) {
                throw new Error('Transaction or sender not found');
            }
            let key = this.ec.keyFromPublic(transaction.from, 'hex');
            return key.verify(transaction.transactionHash, transaction.signature);
        } catch (error) {
            console.error('Failed to validate signature:', error);
            return false;
        }
    }

}
