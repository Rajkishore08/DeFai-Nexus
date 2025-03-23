import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const setup = () => {
  const folders = ['logs', 'keys', 'temp', 'build'];
  folders.forEach(folder => {
    const folderPath = path.join(__dirname, '..', folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      console.log(`Created folder: ${folder}`);
    }
  });

  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) {
    const defaultEnv = `APTOS_PRIVATE_KEY=\nAPTOS_NODE_URL=https://fullnode.devnet.aptoslabs.com\nFAUCET_URL=https://faucet.devnet.aptoslabs.com\n`;
    fs.writeFileSync(envPath, defaultEnv);
    console.log('.env file created');
  }

  const keyFilePath = path.join(__dirname, '..', 'keys', 'account.key');
  if (!fs.existsSync(keyFilePath)) {
    fs.writeFileSync(keyFilePath, '');
    console.log('Aptos key file created');
  }

  console.log('Setup completed');
};

setup();
