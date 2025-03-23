import { Request, Response } from 'express';
import { Aptos, AptosConfig, Network, Account, AccountAddress, Hex } from '@aptos-labs/ts-sdk';
import dotenv from 'dotenv';

dotenv.config();

const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.mainnet.aptoslabs.com';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const aptosConfig = new AptosConfig({ network: Network.MAINNET, fullnode: NODE_URL });
const aptos = new Aptos(aptosConfig);
const account = Account.fromPrivateKey({ privateKey: Hex.fromHexString(PRIVATE_KEY) });

export const runArbitrageStrategy = async (req: Request, res: Response) => {
  try {
    const { dexAAddress, dexBAddress, tokenA, tokenB, amount } = req.body;

    const payload = {
      type: 'entry_function_payload',
      function: `${dexAAddress}::Arbitrage::execute`,
      type_arguments: [tokenA, tokenB],
      arguments: [dexBAddress, amount],
    };

    const txn = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: payload,
    });

    const signedTxn = await aptos.signAndSubmitTransaction({ signer: account, transaction: txn });
    await aptos.waitForTransaction({ transactionHash: signedTxn.hash });

    res.json({ message: 'Arbitrage strategy executed', txnHash: signedTxn.hash });
  } catch (error) {
    console.error('Arbitrage Strategy Error:', error);
    res.status(500).json({ error: 'Failed to execute arbitrage strategy' });
  }
};

export const executeFlashLoan = async (req: Request, res: Response) => {
  try {
    const { loanProvider, token, loanAmount } = req.body;

    const payload = {
      type: 'entry_function_payload',
      function: `${loanProvider}::FlashLoan::execute_loan`,
      type_arguments: [token],
      arguments: [loanAmount],
    };

    const txn = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: payload,
    });

    const signedTxn = await aptos.signAndSubmitTransaction({ signer: account, transaction: txn });
    await aptos.waitForTransaction({ transactionHash: signedTxn.hash });

    res.json({ message: 'Flash loan executed', txnHash: signedTxn.hash });
  } catch (error) {
    console.error('Flash Loan Error:', error);
    res.status(500).json({ error: 'Failed to execute flash loan strategy' });
  }
};

export const optimizeYieldFarming = async (_req: Request, res: Response) => {
  try {
    const payload = {
      type: 'entry_function_payload',
      function: '0x1::YieldFarm::optimize',
      type_arguments: [],
      arguments: [],
    };

    const txn = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: payload,
    });

    const signedTxn = await aptos.signAndSubmitTransaction({ signer: account, transaction: txn });
    await aptos.waitForTransaction({ transactionHash: signedTxn.hash });

    res.json({ message: 'Yield farming optimized', txnHash: signedTxn.hash });
  } catch (error) {
    console.error('Yield Farming Error:', error);
    res.status(500).json({ error: 'Failed to optimize yield farming strategy' });
  }
};

export const manageLiquidity = async (req: Request, res: Response) => {
  try {
    const { poolAddress, tokenA, tokenB, amountA, amountB } = req.body;

    const payload = {
      type: 'entry_function_payload',
      function: `${poolAddress}::LiquidityPool::add_liquidity`,
      type_arguments: [tokenA, tokenB],
      arguments: [amountA, amountB],
    };

    const txn = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: payload,
    });

    const signedTxn = await aptos.signAndSubmitTransaction({ signer: account, transaction: txn });
    await aptos.waitForTransaction({ transactionHash: signedTxn.hash });

    res.json({ message: 'Liquidity added successfully', txnHash: signedTxn.hash });
  } catch (error) {
    console.error('Liquidity Management Error:', error);
    res.status(500).json({ error: 'Failed to manage liquidity strategy' });
  }
};
