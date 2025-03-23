export const formatAddress = (address: string): string =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));
