import express from "express";
import dotenv from "dotenv";
import processAIRequest from "./agent";
import {
  sendTokens,
  checkBalance,
  createNFTCollection,
  mintNFT,
  transferNFT,
  acceptNFT,
  interactWithDeFi,
} from "./TransactionService";

dotenv.config();

const app = express();
app.use(express.json());

// Existing AI request endpoint
app.post("/ask", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  try {
    await processAIRequest(message);
    res.status(200).json({ success: "Request processed" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// 🚀 New: Send tokens endpoint
app.post("/send-tokens", async (req, res) => {
  const { recipient, amount, tokenType } = req.body;
  try {
    const hash = await sendTokens(recipient, amount, tokenType);
    res.status(200).json({ txHash: hash });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 🚀 New: Check balance endpoint
app.get("/check-balance/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const balance = await checkBalance(address);
    res.status(200).json({ balance });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 🚀 New: Create NFT Collection
app.post("/create-nft-collection", async (req, res) => {
  const { name, description, uri } = req.body;
  try {
    const hash = await createNFTCollection(name, description, uri);
    res.status(200).json({ txHash: hash });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 🚀 New: Mint NFT
app.post("/mint-nft", async (req, res) => {
  const { collectionName, name, description, supply, uri } = req.body;
  try {
    const hash = await mintNFT(collectionName, name, description, supply, uri);
    res.status(200).json({ txHash: hash });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 🚀 New: Transfer NFT
app.post("/transfer-nft", async (req, res) => {
  const { recipient, creator, collectionName, tokenName, propertyVersion } = req.body;
  try {
    const hash = await transferNFT(recipient, creator, collectionName, tokenName, propertyVersion);
    res.status(200).json({ txHash: hash });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 🚀 New: Accept NFT
app.post("/accept-nft", async (req, res) => {
  const { sender, creator, collectionName, tokenName, propertyVersion } = req.body;
  try {
    const hash = await acceptNFT(sender, creator, collectionName, tokenName, propertyVersion);
    res.status(200).json({ txHash: hash });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 🚀 New: Interact with DeFi
app.post("/interact-defi", async (req, res) => {
  const { protocolAddress, moduleName, functionName, typeArguments, args } = req.body;
  try {
    const hash = await interactWithDeFi(protocolAddress, moduleName, functionName, typeArguments, args);
    res.status(200).json({ txHash: hash });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
