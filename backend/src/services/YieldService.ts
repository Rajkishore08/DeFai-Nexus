import { Aptos, AptosConfig, Network, Account, Types } from "@aptos-labs/ts-sdk";
import dotenv from "dotenv";

dotenv.config();

const APTOS_NETWORK = process.env.APTOS_NETWORK as Network || Network.DEVNET;
const PRIVATE_KEY = process.env.APTOS_PRIVATE_KEY || "";

const config = new AptosConfig({ network: APTOS_NETWORK });
const aptos = new Aptos(config);
const account = new Account(PRIVATE_KEY);

export class YieldService {
  private aptos: Aptos;
  private account: Account;

  constructor() {
    this.aptos = aptos;
    this.account = account;
  }

  async sendTokens(recipient: string, amount: number, tokenType: string = "0x1::aptos_coin::AptosCoin"): Promise<string> {
    const payload: Types.TransactionPayload = {
      function: "0x1::coin::transfer",
      type_arguments: [tokenType],
      arguments: [recipient, (amount * 1e8).toString()],
    };
    const txnRequest = await this.aptos.transaction.build({ sender: this.account.accountAddress, data: payload });
    const signedTxn = await this.aptos.transaction.sign(this.account, txnRequest);
    const pendingTransaction = await this.aptos.transaction.submit(signedTxn);
    await this.aptos.transaction.waitForTransaction(pendingTransaction.hash);
    return pendingTransaction.hash;
  }

  async checkBalance(address: string, tokenType: string = "0x1::aptos_coin::AptosCoin"): Promise<number> {
    const resources = await this.aptos.account.getResources(address);
    const accountResource = resources.find((r) => r.type === `0x1::coin::CoinStore<${tokenType}>`);
    return accountResource ? parseInt((accountResource.data as any).coin.value) / 1e8 : 0;
  }

  async getTransactionHistory(address: string): Promise<Types.Transaction[]> {
    const transactions = await this.aptos.transaction.getAccountTransactions(address);
    return transactions;
  }

  async createNFTCollection(name: string, description: string, uri: string): Promise<string> {
    const payload: Types.TransactionPayload = {
      function: "0x3::token::create_collection_script",
      type_arguments: [],
      arguments: [name, description, uri, 0, [false, false, false]],
    };
    const txnRequest = await this.aptos.transaction.build({ sender: this.account.accountAddress, data: payload });
    const signedTxn = await this.aptos.transaction.sign(this.account, txnRequest);
    const pendingTransaction = await this.aptos.transaction.submit(signedTxn);
    await this.aptos.transaction.waitForTransaction(pendingTransaction.hash);
    return pendingTransaction.hash;
  }

  async mintNFT(collectionName: string, name: string, description: string, supply: number, uri: string): Promise<string> {
    const payload: Types.TransactionPayload = {
      function: "0x3::token::create_token_script",
      type_arguments: [],
      arguments: [collectionName, name, description, supply.toString(), supply.toString(), uri, this.account.accountAddress, 0, 0, [false, false, false, false, false]],
    };
    const txnRequest = await this.aptos.transaction.build({ sender: this.account.accountAddress, data: payload });
    const signedTxn = await this.aptos.transaction.sign(this.account, txnRequest);
    const pendingTransaction = await this.aptos.transaction.submit(signedTxn);
    await this.aptos.transaction.waitForTransaction(pendingTransaction.hash);
    return pendingTransaction.hash;
  }

  async transferNFT(recipient: string, creator: string, collectionName: string, tokenName: string, propertyVersion: number = 0): Promise<string> {
    const payload: Types.TransactionPayload = {
      function: "0x3::token::offer_script",
      type_arguments: [],
      arguments: [creator, collectionName, tokenName, propertyVersion.toString(), recipient, 1],
    };
    const txnRequest = await this.aptos.transaction.build({ sender: this.account.accountAddress, data: payload });
    const signedTxn = await this.aptos.transaction.sign(this.account, txnRequest);
    const pendingTransaction = await this.aptos.transaction.submit(signedTxn);
    await this.aptos.transaction.waitForTransaction(pendingTransaction.hash);
    return pendingTransaction.hash;
  }

  async acceptNFT(sender: string, creator: string, collectionName: string, tokenName: string, propertyVersion: number = 0): Promise<string> {
    const payload: Types.TransactionPayload = {
      function: "0x3::token::claim_script",
      type_arguments: [],
      arguments: [sender, creator, collectionName, tokenName, propertyVersion.toString()],
    };
    const txnRequest = await this.aptos.transaction.build({ sender: this.account.accountAddress, data: payload });
    const signedTxn = await this.aptos.transaction.sign(this.account, txnRequest);
    const pendingTransaction = await this.aptos.transaction.submit(signedTxn);
    await this.aptos.transaction.waitForTransaction(pendingTransaction.hash);
    return pendingTransaction.hash;
  }

  async interactWithDeFi(protocolAddress: string, moduleName: string, functionName: string, typeArguments: string[], args: any[]): Promise<string> {
    const payload: Types.TransactionPayload = {
      function: `${protocolAddress}::${moduleName}::${functionName}`,
      type_arguments: typeArguments,
      arguments: args,
    };
    const txnRequest = await this.aptos.transaction.build({ sender: this.account.accountAddress, data: payload });
    const signedTxn = await this.aptos.transaction.sign(this.account, txnRequest);
    const pendingTransaction = await this.aptos.transaction.submit(signedTxn);
    await this.aptos.transaction.waitForTransaction(pendingTransaction.hash);
    return pendingTransaction.hash;
  }
}
