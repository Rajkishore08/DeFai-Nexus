import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const DEX_APIS = process.env.DEX_APIS ? process.env.DEX_APIS.split(',') : [];

interface PriceData {
  dex: string;
  pair: string;
  price: number;
}

async function fetchPrices(): Promise<PriceData[]> {
  const priceData: PriceData[] = [];

  for (const api of DEX_APIS) {
    try {
      const response = await axios.get(api);
      response.data.forEach((item: any) => {
        priceData.push({
          dex: api,
          pair: item.pair,
          price: item.price,
        });
      });
    } catch (error) {
      console.error(`Error fetching data from ${api}:`, error);
    }
  }
  return priceData;
}

router.get('/opportunities', async (_req, res) => {
  const prices = await fetchPrices();
  const opportunities: any[] = [];

  const grouped = prices.reduce((acc: any, curr) => {
    if (!acc[curr.pair]) acc[curr.pair] = [];
    acc[curr.pair].push(curr);
    return acc;
  }, {});

  for (const pair in grouped) {
    const sorted = grouped[pair].sort((a: PriceData, b: PriceData) => a.price - b.price);
    if (sorted.length > 1) {
      const profit = sorted[sorted.length - 1].price - sorted[0].price;
      if (profit > 0) {
        opportunities.push({
          buyFrom: sorted[0].dex,
          sellTo: sorted[sorted.length - 1].dex,
          pair,
          profit,
        });
      }
    }
  }

  res.json(opportunities);
});

export default router;
