import { AptosClient, Types } from "aptos";
import NotificationsService from "./notifications";

interface RiskAssessment {
  riskFactor: string;
  details: string;
  severity: "low" | "medium" | "high";
}

class RiskService {
  private client: AptosClient;
  private notificationsService: Notification;

  constructor(rpcUrl: string, notificationsService: Notification) {
    this.client = new AptosClient(rpcUrl);
    this.notificationsService = notificationsService;
  }

  /**
   * Assess risks based on liquidity levels in a specific pool.
   * @param {string} poolId - Identifier for the liquidity pool.
   * @param {number} liquidity - Current liquidity in the pool.
   */
  assessLiquidityRisk(poolId: string, liquidity: number) {
    let riskAssessment: RiskAssessment | null = null;

    if (liquidity < 1000) {
      riskAssessment = {
        riskFactor: "Low Liquidity",
        details: `Liquidity in pool ${poolId} is critically low.`,
        severity: "high",
      };
    } else if (liquidity < 5000) {
      riskAssessment = {
        riskFactor: "Moderate Liquidity",
        details: `Liquidity in pool ${poolId} is below optimal levels.`,
        severity: "medium",
      };
    }

    if (riskAssessment) {
      this.notificationsService.sendRiskAlert(
        riskAssessment.riskFactor,
        riskAssessment.details
      );
    }
  }

  /**
   * Assess risks based on detected arbitrage opportunities.
   * @param {string} dex - Decentralized exchange where the opportunity exists.
   * @param {number} profit - Potential profit from the arbitrage opportunity.
   */
  assessArbitrageRisk(dex: string, profit: number) {
    let riskAssessment: RiskAssessment | null = null;

    if (profit > 5) {
      riskAssessment = {
        riskFactor: "High Profit Arbitrage",
        details: `High-profit arbitrage detected on ${dex}, potential profit: ${profit}%.`,
        severity: "high",
      };
    } else if (profit > 2) {
      riskAssessment = {
        riskFactor: "Moderate Profit Arbitrage",
        details: `Moderate-profit arbitrage detected on ${dex}, potential profit: ${profit}%.`,
        severity: "medium",
      };
    }

    if (riskAssessment) {
      this.notificationsService.sendRiskAlert(
        riskAssessment.riskFactor,
        riskAssessment.details
      );
    }
  }

  /**
   * Assess risks based on transaction status.
   * @param {string} txnHash - Hash of the transaction.
   */
  async assessTransactionRisk(txnHash: string) {
    try {
      const transaction: Types.Transaction = await this.client.getTransactionByHash(txnHash);

      if (transaction.type === "user_transaction") {
        const userTxn = transaction as Types.UserTransaction;

        if (userTxn.success === false) {
          const riskAssessment: RiskAssessment = {
            riskFactor: "Failed Transaction",
            details: `Transaction ${txnHash} failed with status: ${userTxn.vm_status}.`,
            severity: "medium",
          };

          this.notificationsService.sendRiskAlert(
            riskAssessment.riskFactor,
            riskAssessment.details
          );
        }
      }
    } catch (error) {
      console.error(`Error fetching transaction ${txnHash}:`, error);
    }
  }
}

export default RiskService;
