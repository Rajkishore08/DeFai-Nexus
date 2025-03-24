import express from 'express';
import { AptosClient, AptosAccount, HexString, Types } from '@aptos-labs/ts-sdk';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const NODE_URL = process.env.APTOS_NODE_URL || '';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';

const client = new AptosClient(NODE_URL);
const account = new AptosAccount(HexString.ensure(PRIVATE_KEY).toUint8Array());

router.post('/add', async (req, res) => {
  const { tokenA, tokenB, amountA, amountB } = req.body;
  try {
  
    const txn = await client.generateTransaction(account.address(), {
      function: '0x1::LiquidityPool::add_liquidity',
      typeArguments: [tokenA, tokenB],
      arguments: [amountA, amountB],
    });

    const signedTxn = await client.signTransaction(account, txn);
    const response = await client.submitTransaction(signedTxn);

    res.json({ message: 'Liquidity added', txnHash: response.hash });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add liquidity', details: error });
  }
});

export default router;
