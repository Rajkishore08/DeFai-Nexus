import { AptosClient } from "aptos";

export enum NotificationType {
  LiquidityUpdate = "LiquidityUpdate",
  ArbitrageOpportunity = "ArbitrageOpportunity",
  RiskAlert = "RiskAlert",
  TransactionStatus = "TransactionStatus",
}

export interface Notification {
  type: NotificationType;
  message: string;
  data?: any;
}

export interface Subscriber {
  update(notification: Notification): void | Promise<void>;
}

class NotificationsService {
  private subscribers: Subscriber[] = [];
  private client: AptosClient;

  constructor(rpcUrl: string) {
    this.client = new AptosClient(rpcUrl);
  }

  /**
   * Subscribe an observer.
   */
  subscribe(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
  }

  /**
   * Unsubscribe an observer.
   */
  unsubscribe(subscriber: Subscriber): void {
    this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
  }

  /**
   * Notify all subscribers asynchronously.
   */
  async notify(notification: Notification): Promise<void> {
    console.log(`[NotificationService] Dispatching notification:`, notification);

    await Promise.all(
      this.subscribers.map(async subscriber => {
        try {
          await subscriber.update(notification);
        } catch (error) {
          console.error(`Subscriber failed to handle notification: ${error}`);
        }
      })
    );
  }

  /**
   * Generic method to send notification.
   */
  async sendNotification(type: NotificationType, message: string, data?: any): Promise<void> {
    const notification: Notification = { type, message, data };
    await this.notify(notification);
  }

  /**
   * Send Liquidity update.
   */
  async sendLiquidityUpdate(poolId: string, liquidity: number): Promise<void> {
    await this.sendNotification(
      NotificationType.LiquidityUpdate,
      `Liquidity updated for Pool ${poolId}: ${liquidity}`,
      { poolId, liquidity }
    );
  }

  /**
   * Send Arbitrage Opportunity Alert.
   */
  async sendArbitrageOpportunity(dex: string, profit: number): Promise<void> {
    await this.sendNotification(
      NotificationType.ArbitrageOpportunity,
      `Arbitrage opportunity detected on ${dex}. Potential profit: ${profit}`,
      { dex, profit }
    );
  }

  /**
   * Send Risk Alert Notification.
   */
  async sendRiskAlert(riskFactor: string, details: string): Promise<void> {
    await this.sendNotification(
      NotificationType.RiskAlert,
      `Risk Alert: ${riskFactor}. Details: ${details}`,
      { riskFactor, details }
    );
  }

  /**
   * Send Transaction Status Update.
   */
  async sendTransactionStatus(txnHash: string, status: string): Promise<void> {
    await this.sendNotification(
      NotificationType.TransactionStatus,
      `Transaction ${txnHash} status: ${status}`,
      { txnHash, status }
    );
  }
}

// Factory Export: Can easily import & initialize
const notificationsService = (rpcUrl: string) => new NotificationsService(rpcUrl);

export default notificationsService;
