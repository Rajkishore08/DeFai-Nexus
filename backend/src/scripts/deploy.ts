import { AptosClient, AptosAccount, FaucetClient, TxnBuilderTypes, BCS } from "@aptos-labs/ts-sdk";
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const NODE_URL = "";
const FAUCET_URL = "";

const client = new AptosClient(NODE_URL);
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

const getAccount = (): AptosAccount => {
  const privateKeyHex = process.env.APTOS_PRIVATE_KEY;
  if (privateKeyHex) {
    const privateKey = new Uint8Array(Buffer.from(privateKeyHex, 'hex'));
    return new AptosAccount(privateKey);
  } else {
    const account = new AptosAccount();
    fs.writeFileSync('.env', `APTOS_PRIVATE_KEY=${account.toPrivateKeyObject().privateKeyHex}\n`);
    return account;
  }
};

const compileMoveModules = async (account: AptosAccount): Promise<Uint8Array[]> => {
  const moveDir = path.join(__dirname, 'move');
  const buildDir = path.join(moveDir, 'build');
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }
  const compileCommand = `aptos move compile --package-dir ${moveDir} --named-addresses MyAddress=${account.address()}`;
  require('child_process').execSync(compileCommand, { stdio: 'inherit' });

  const modulePaths = fs.readdirSync(path.join(buildDir, 'MyPackage'))
    .filter(file => file.endsWith('.mv'))
    .map(file => path.join(buildDir, 'MyPackage', file));

  return modulePaths.map(modulePath => fs.readFileSync(modulePath));
};

const deploy = async () => {
  const account = getAccount();
  await faucetClient.fundAccount(account.address(), 100_000_000);

  const compiledModules = await compileMoveModules(account);

  const txnHash = await client.publishPackage(
    account,
    compiledModules.map(module => new TxnBuilderTypes.Module(new BCS.Bytes(module))),
    { gasUnitPrice: 100 }
  );

  console.log(`Transaction submitted: ${txnHash}`);
  await client.waitForTransaction(txnHash);
  console.log('Modules deployed successfully.');
};

deploy().catch(console.error);
