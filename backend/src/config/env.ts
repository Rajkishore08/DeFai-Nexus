// config/env.ts

import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID || '',
  APTOS_PRIVATE_KEY: process.env.APTOS_PRIVATE_KEY || '',
  ETH_PRIVATE_KEY: process.env.ETH_PRIVATE_KEY || '',
  SOLANA_PRIVATE_KEY: process.env.SOLANA_PRIVATE_KEY || '',
  BSC_PRIVATE_KEY: process.env.BSC_PRIVATE_KEY || '',
  AI_API_KEY: process.env.AI_API_KEY || '', // For AI models (price prediction, sentiment)
  FLASH_LOAN_PROVIDER_URL: process.env.FLASH_LOAN_PROVIDER_URL || '',
  DATABASE_URL: process.env.DATABASE_URL || '',
  NOTIFICATION_SERVICE_URL: process.env.NOTIFICATION_SERVICE_URL || ''
};
