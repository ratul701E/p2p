import { Injectable } from '@nestjs/common';
import { DatabaseServiceService } from 'src/database-service/database-service.service';

@Injectable()
export class BlockchainService {
    private readonly blockchain: any

    constructor(private readonly databaseService: DatabaseServiceService) {
        this.blockchain = databaseService.getBlockchainDBObject()
    }

    async addToBlockchain(block) {
        
        return new Promise((resolve, reject) => {
    
            this.blockchain.put(block.blockInfo.blockHash, JSON.stringify(block), (err: any) => err ? reject(err) : resolve(true))
        
        })

    }

    async getLastBlock() {
        
        return new Promise((resolve, reject) => {
    
            let stream = this.blockchain.createReadStream({reverse:true, limit:1})

            stream.on('data', (data) => {
                let lastBlock = JSON.parse(data.value)
                resolve(lastBlock);
            })
            stream.on('end', () => { resolve(null) })
            stream.on('error', (error) => { reject(error) })

        })


    }

    printBlockchain = async (numberOfInstances:number) : Promise<any> => {

        let blockchain = [];
        return new Promise((resolve, reject) => {
    
            let stream = this.blockchain.createReadStream();
            let counter = 0;
    
            stream.on('data', (data) => {
                blockchain.push(JSON.parse(data.value));
                counter++;
                if (numberOfInstances && counter >= numberOfInstances) {
                    stream.destroy();
                    resolve(blockchain.slice(-numberOfInstances));
                }
            });
    
            stream.on('end', () => {
                resolve(blockchain);
            });
    
            stream.on('error', (err) => {
                reject(err);
            });
    
        });
    
    }

    printTotalTransactionCount = async () => {
        let full_chain = await this.printBlockchain(undefined)
        let count = 0
        for(let block of full_chain) {
            count += block.transactions.length
        }
        return count
    }

}
