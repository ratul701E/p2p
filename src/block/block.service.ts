import { Injectable, OnModuleInit } from "@nestjs/common";
import leveldown from "leveldown";
import levelup from "levelup";
import { P2pService } from "src/p2p-server/p2p-server.service";
import { DatabaseServiceService } from "src/database-service/database-service.service";
import crypto from "crypto";
import { TransactionService } from "src/transaction/transaction.service";
import { P2pClientService } from "src/p2p-client/p2p-client.service";
import axios from "axios";
import { BlockchainService } from "src/blockchain/blockchain.service";
import { getLocalIp } from "src/main";
import { P2pGateway } from "src/p2p-server/p2p-server.gateway";

const GENERATION_DELAY = 10000;

@Injectable()
export class BlockService implements OnModuleInit {
  private readonly mempool: any;
  constructor(
    private readonly dbService: DatabaseServiceService,
    private readonly transactionService: TransactionService,
    private readonly p2pClientsService: P2pClientService,
    private readonly blockchainService: BlockchainService,
    private readonly p2pServerGateway: P2pGateway
  ) {
    this.mempool = dbService.getMempoolDBObject();
  }

  async onModuleInit() {
    setInterval(() => {
      this.genereateBlock();
    }, GENERATION_DELAY);
  }

  // -------------------------------- BLOCK GENERATION --------

  async genereateBlock() {
    console.log("generating block ... ");
    //console.log(await this.transactionService.printMempool())
    const _mempool: any = await this.transactionService.printMempool();

    const valid_transactions: any = []; // [] ///////TODO
    const last_block: any = await this.blockchainService.getLastBlock();
    const node_addresses = await this.p2pClientsService.getNodeAddress();
    const node_staking_info = [];

    if (valid_transactions.length < 10) {
      console.log(
        "Currently " +
          valid_transactions.length +
          " number of transactions are valid."
      );
      console.log(
        "Still " + (10 - valid_transactions.length) + " transactions needed."
      );
      return;
    }

    for (const transaction of _mempool) {
      if (
        (await this.transactionService.validateTransaction(transaction)) ==
        "Valid Transaction"
      ) {
        valid_transactions.push(transaction);
      }
    }

    for (let addr of node_addresses) {
      const req_addr = "http://" + addr + "/info";
      //console.log(req_addr)
      await axios.get(req_addr).then((res) => {
        node_staking_info.push(res.data);
        //console.log(res.data)
      });
    }

    //console.log(node_staking_info)
    //creating block

    node_staking_info.sort((a, b) => b.staking_coin - a.staking_coin);
    let top3Nodes = node_staking_info.slice(0, 3);
    let randomNodeIndex = Math.floor(Math.random() * top3Nodes.length);
    let selectedNode = top3Nodes[randomNodeIndex];
    //console.log("Selected node info: \n", selectedNode)

    if (selectedNode.addr !== getLocalIp() + ":3000") return;

    //console.log("Selected Node's Public Key:", selectedNode.public_key);

    const blockWithTransactions = {
      blockInfo: {
        blockNumber: last_block.blockInfo.blockNumber + 1,
        timestamp: Date.now(),
        merkleRoot: "",
        blockHash: "",
        previousBlockHash: last_block.blockInfo.blockHash,
        validator: {
          publicKey: selectedNode.public_key,
          stakingBalance: selectedNode.staking_coin,
          validatorSignature: "3748xutab" + selectedNode.public_key,
        },
        proofOfStake: {
          stakingReward: 2,
          stakingDifficulty: 5000,
        },
      },
      transactions: [],
    };

    valid_transactions.forEach((transaction, index) => {
      const transactionHash = crypto
        .createHash("sha256")
        .update(JSON.stringify(transaction))
        .digest("hex");
      transaction.transactionHash = transactionHash;
      blockWithTransactions.transactions.push(transaction);
    });

    const merkleRoot = await this.buildMerkleTree(
      blockWithTransactions.transactions
    );
    //console.log('Merkle Root:', merkleRoot);
    blockWithTransactions.blockInfo.merkleRoot = merkleRoot;

    const blockHash = crypto
      .createHash("sha256")
      .update(JSON.stringify(blockWithTransactions.blockInfo))
      .digest("hex");
    //console.log('Block Hash:', blockHash);

    blockWithTransactions.blockInfo.blockHash = blockHash;

    //-------// PRINT
    //console.log(blockWithTransactions)

    //--------add to blockchain db
    //this.blockchainService.addToBlockchain(blockWithTransactions)

    //--------propagate

    this.p2pServerGateway.blockBroadcast(blockWithTransactions);
  }

  // -----------------------------------------

  async buildMerkleTree(transactions) {
    if (transactions.length === 0) {
      return null;
    }

    const tree = transactions.map((transaction) =>
      crypto
        .createHash("sha256")
        .update(transaction.transactionHash)
        .digest("hex")
    );

    while (tree.length > 1) {
      const level = [];
      for (let i = 0; i < tree.length; i += 2) {
        const left = tree[i];
        const right = i + 1 < tree.length ? tree[i + 1] : "";
        const combined = left + right;
        const hash = crypto.createHash("sha256").update(combined).digest("hex");
        level.push(hash);
      }
      tree.length = 0;
      tree.push(...level);
    }

    return tree[0];
  }
}
