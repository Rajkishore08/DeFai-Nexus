import { AptosClient, AptosAccount, TxnBuilderTypes, BCS } from "aptos";
import dotenv from "dotenv";

dotenv.config();

const NODE_URL = process.env.APTOS_NODE_URL || "https://fullnode.mainnet.aptoslabs.com";
const FLASH_LOAN_MODULE_ADDRESS = process.env.FLASH_LOAN_MODULE_ADDRESS || "0x1";

const client = new AptosClient(NODE_URL);

class FlashLoanService {
    private account: AptosAccount;

    constructor() {
        if (!process.env.PRIVATE_KEY) {
            throw new Error("PRIVATE_KEY is not set in environment variables");
        }
        const privateKey = Buffer.from(process.env.PRIVATE_KEY, "hex");
        this.account = new AptosAccount(privateKey);
    }

    async initializeFlashLoanCapability() {
        const payload = {
            type: "entry_function_payload",
            function: `${FLASH_LOAN_MODULE_ADDRESS}::FlashLoan::initialize`,
            type_arguments: [],
            arguments: [],
        };

        const txnRequest = await client.generateTransaction(this.account.address(), payload);
        const signedTxn = await client.signTransaction(this.account, txnRequest);
        const transactionRes = await client.submitTransaction(signedTxn);
        await client.waitForTransaction(transactionRes.hash);
        return transactionRes.hash;
    }

    async executeFlashLoan(amount: number, executeFunction: Uint8Array) {
        const payload = {
            type: "entry_function_payload",
            function: `${FLASH_LOAN_MODULE_ADDRESS}::FlashLoan::flash_loan`,
            type_arguments: ["0x1::aptos_coin::AptosCoin"],
            arguments: [amount.toString(), Array.from(executeFunction)],
        };

        const txnRequest = await client.generateTransaction(this.account.address(), payload);
        const signedTxn = await client.signTransaction(this.account, txnRequest);
        const transactionRes = await client.submitTransaction(signedTxn);
        await client.waitForTransaction(transactionRes.hash);
        return transactionRes.hash;
    }
}

export default FlashLoanService;
