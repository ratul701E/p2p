import { Injectable } from '@nestjs/common';
import levelup from 'levelup';
import leveldown from 'leveldown';

@Injectable()
export class DatabaseServiceService {
    private readonly mempool:any
  private readonly blockchain: any
  constructor(){
    this.mempool = levelup(leveldown('src/database/mempool')) 
    this.blockchain = levelup(leveldown('src/database/blockchain')) 
  }
  getMempoolDBObject(){
    return this.mempool
  }
  getBlockchainDBObject(){
    return this.blockchain
  }
}
