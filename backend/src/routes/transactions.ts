import express from 'express';
import { AptosClient } from '@aptos-labs/ts-sdk';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';
const client = new AptosClient(NODE_URL);

// Get transaction by hash
router.get('/:hash', async (req, res) => {
  try {
    const transaction = await client.getTransactionByHash(req.params.hash);
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'Transaction not found' });
  }
});

// List recent transactions
router.get('/', async (_req, res) => {
  try {
    const txns = await client.getTransactions({ limit: 10 });
    res.json(txns);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

export default router;
