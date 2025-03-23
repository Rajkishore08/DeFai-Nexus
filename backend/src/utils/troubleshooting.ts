import { AptosClient, AptosAccount, TxnBuilderTypes, BCS, HexString } from "aptos";
import dotenv from "dotenv";

dotenv.config();

const RPC_URL = process.env.RPC_URL_MAINNET || "";
const client = new AptosClient(RPC_URL);

class BlockchainService {
    private account: AptosAccount;

    constructor() {
        if (!process.env.PRIVATE_KEY) {
            throw new Error("PRIVATE_KEY is not set in environment variables");
        }
        this.account = new AptosAccount(new HexString(process.env.PRIVATE_KEY).toUint8Array());
    }

    async getBalance(address: string): Promise<string> {
        try {
            const response = await client.getAccountResource(
                address,
                "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
            );
            return response.data.coin.value;
        } catch (error) {
            console.error("Error fetching balance:", error);
            throw error;
        }
    }

    async transferTokens(to: string, amount: number): Promise<string> {
        try {
            const payload = {
                function: "0x1::coin::transfer",
                type_arguments: ["0x1::aptos_coin::AptosCoin"],
                arguments: [to, amount * 1e8],
            };
            
            const txnRequest = await client.generateTransaction(this.account.address(), payload);
            const signedTxn = await client.signTransaction(this.account, txnRequest);
            const response = await client.submitTransaction(signedTxn);
            await client.waitForTransaction(response.hash);
            return response.hash;
        } catch (error) {
            console.error("Error transferring tokens:", error);
            throw error;
        }
    }

    async getTransactionStatus(txnHash: string): Promise<string> {
        try {
            const txn = await client.getTransactionByHash(txnHash);
            return txn.success ? "Success" : "Failed";
        } catch (error) {
            console.error("Error fetching transaction status:", error);
            throw error;
        }
    }

    async getAccountSequenceNumber(address: string): Promise<number> {
        try {
            const account = await client.getAccount(address);
            return account.sequence_number;
        } catch (error) {
            console.error("Error fetching account sequence number:", error);
            throw error;
        }
    }
}

export default new BlockchainService();
