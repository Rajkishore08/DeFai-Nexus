import express from 'express';
import { AptosClient } from '@aptos-labs/ts-sdk';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';
const client = new AptosClient(NODE_URL);

router.get('/status', (_req, res) => {
  res.json({ status: 'API is running' });
});

// Fetch latest block info
router.get('/block', async (_req, res) => {
  try {
    const block = await client.getBlockByHeight(0);
    res.json(block);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch block' });
  }
});

export default router;
