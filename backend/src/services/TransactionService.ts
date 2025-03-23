import { Aptos, AptosConfig, Network, Account, Types } from "@aptos-labs/ts-sdk";
import dotenv from "dotenv";

dotenv.config();

const APTOS_NETWORK = process.env.APTOS_NETWORK as Network || Network.DEVNET;
const PRIVATE_KEY = process.env.APTOS_PRIVATE_KEY || "";

const config = new AptosConfig({ network: APTOS_NETWORK });
const aptos = new Aptos(config);
const account = new Account(PRIVATE_KEY);

export async function sendTokens(recipient: string, amount: number, tokenType: string = "0x1::aptos_coin::AptosCoin") {
  const payload: Types.TransactionPayload = {
    function: "0x1::coin::transfer",
    type_arguments: [tokenType],
    arguments: [recipient, (amount * 1e8).toString()],
  };
  const txnRequest = await aptos.transaction.build({ sender: account.accountAddress, data: payload });
  const signedTxn = await aptos.transaction.sign(account, txnRequest);
  const pendingTransaction = await aptos.transaction.submit(signedTxn);
  await aptos.transaction.waitForTransaction(pendingTransaction.hash);
  return pendingTransaction.hash;
}

export async function checkBalance(address: string, tokenType: string = "0x1::aptos_coin::AptosCoin") {
  const resources = await aptos.account.getResources(address);
  const accountResource = resources.find((r) => r.type === `0x1::coin::CoinStore<${tokenType}>`);
  return accountResource ? parseInt((accountResource.data as any).coin.value) / 1e8 : 0;
}

export async function getTransactionHistory(address: string) {
  const transactions = await aptos.transaction.getAccountTransactions(address);
  return transactions;
}

export async function createNFTCollection(name: string, description: string, uri: string) {
  const payload: Types.TransactionPayload = {
    function: "0x3::token::create_collection_script",
    type_arguments: [],
    arguments: [name, description, uri, 0, [false, false, false]],
  };
  const txnRequest = await aptos.transaction.build({ sender: account.accountAddress, data: payload });
  const signedTxn = await aptos.transaction.sign(account, txnRequest);
  const pendingTransaction = await aptos.transaction.submit(signedTxn);
  await aptos.transaction.waitForTransaction(pendingTransaction.hash);
  return pendingTransaction.hash;
}

export async function mintNFT(collectionName: string, name: string, description: string, supply: number, uri: string) {
  const payload: Types.TransactionPayload = {
    function: "0x3::token::create_token_script",
    type_arguments: [],
    arguments: [collectionName, name, description, supply.toString(), supply.toString(), uri, account.accountAddress, 0, 0, [false, false, false, false, false]],
  };
  const txnRequest = await aptos.transaction.build({ sender: account.accountAddress, data: payload });
  const signedTxn = await aptos.transaction.sign(account, txnRequest);
  const pendingTransaction = await aptos.transaction.submit(signedTxn);
  await aptos.transaction.waitForTransaction(pendingTransaction.hash);
  return pendingTransaction.hash;
}

export async function transferNFT(recipient: string, creator: string, collectionName: string, tokenName: string, propertyVersion: number = 0) {
  const payload: Types.TransactionPayload = {
    function: "0x3::token::offer_script",
    type_arguments: [],
    arguments: [creator, collectionName, tokenName, propertyVersion.toString(), recipient, 1],
  };
  const txnRequest = await aptos.transaction.build({ sender: account.accountAddress, data: payload });
  const signedTxn = await aptos.transaction.sign(account, txnRequest);
  const pendingTransaction = await aptos.transaction.submit(signedTxn);
  await aptos.transaction.waitForTransaction(pendingTransaction.hash);
  return pendingTransaction.hash;
}

export async function acceptNFT(sender: string, creator: string, collectionName: string, tokenName: string, propertyVersion: number = 0) {
  const payload: Types.TransactionPayload = {
    function: "0x3::token::claim_script",
    type_arguments: [],
    arguments: [sender, creator, collectionName, tokenName, propertyVersion.toString()],
  };
  const txnRequest = await aptos.transaction.build({ sender: account.accountAddress, data: payload });
  const signedTxn = await aptos.transaction.sign(account, txnRequest);
  const pendingTransaction = await aptos.transaction.submit(signedTxn);
  await aptos.transaction.waitForTransaction(pendingTransaction.hash);
  return pendingTransaction.hash;
}

export async function interactWithDeFi(protocolAddress: string, moduleName: string, functionName: string, typeArguments: string[], args: any[]) {
  const payload: Types.TransactionPayload = {
    function: `${protocolAddress}::${moduleName}::${functionName}`,
    type_arguments: typeArguments,
    arguments: args,
  };
  const txnRequest = await aptos.transaction.build({ sender: account.accountAddress, data: payload });
  const signedTxn = await aptos.transaction.sign(account, txnRequest);
  const pendingTransaction = await aptos.transaction.submit(signedTxn);
  await aptos.transaction.waitForTransaction(pendingTransaction.hash);
  return pendingTransaction.hash;
}
