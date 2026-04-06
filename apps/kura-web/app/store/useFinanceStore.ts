// src/store/useFinanceStore.ts
import { create } from 'zustand';

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: 'checking' | 'saving' | 'credit' | 'crypto';
  logo: string;
}

export interface Transaction {
  id: string | number;
  accountId: string;
  amount: string;
  date: string;
  merchant: string;
  category: string;
  type: 'credit' | 'deposit' | 'transfer';
}

// 💡 1. 新增：投資帳戶 (券商 / Web3 錢包)
export interface InvestmentAccount {
  id: string;
  name: string;
  type: 'Broker' | 'Exchange' | 'Web3 Wallet';
  logo: string;
}

// 💡 2. 修改：為每筆持倉加上 accountId
export interface Investment {
  id: string;
  accountId: string;      // 綁定到 InvestmentAccount 的 ID
  symbol: string;
  name: string;
  holdings: number;
  currentPrice: number;
  change24h: number;
  type: 'crypto' | 'stock';
  logo: string;
}

interface SyncWalletPayload {
  address: string;
  chainId: number;
  chainName: string;
  nativeSymbol: string;
  nativeBalance: number;
}

interface FinanceState {
  accounts: Account[];
  transactions: Transaction[];
  investmentAccounts: InvestmentAccount[]; // 💡 新增
  investments: Investment[];
  isAiOptedIn: boolean;
  toggleAiOptIn: () => void;
  setAccounts: (accounts: Account[]) => void;
  setTransactions: (transactions: Transaction[]) => void;
  disconnectBankingAccount: (accountId: string) => void;
  disconnectInvestmentAccount: (accountId: string) => void;
  syncConnectedWalletPosition: (payload: SyncWalletPayload) => Promise<void>;
  removeConnectedWalletPosition: (address: string, chainId: number) => void;
}

const CHAIN_MARKET_META: Record<number, { coingeckoId: string; logo: string; fallbackName: string }> = {
  1: {
    coingeckoId: 'ethereum',
    logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    fallbackName: 'Ethereum',
  },
  137: {
    coingeckoId: 'matic-network',
    logo: 'https://assets.coingecko.com/coins/images/4713/large/polygon.png',
    fallbackName: 'Polygon',
  },
  42161: {
    coingeckoId: 'ethereum',
    logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    fallbackName: 'Ethereum',
  },
};

export const useFinanceStore = create<FinanceState>((set) => ({
  accounts: [
    { id: '1', name: 'BofA Checking', balance: 12450.00, type: 'checking', logo: 'https://www.google.com/s2/favicons?domain=bankofamerica.com&sz=128' },
    { id: '2', name: 'Sapphire Preferred', balance: 4200.50, type: 'credit', logo: 'https://www.google.com/s2/favicons?domain=chase.com&sz=128' },
    { id: '3', name: 'Marcus Savings', balance: 27849.50, type: 'saving', logo: 'https://www.google.com/s2/favicons?domain=marcus.com&sz=128' },
  ],
  transactions: [
    { id: 1, accountId: '2', amount: '124.50', date: 'April 5, 2026', merchant: 'Whole Foods', category: 'Groceries', type: 'credit' },
    { id: 2, accountId: '2', amount: '45.00', date: 'April 4, 2026', merchant: 'Uber Eats', category: 'Dining', type: 'credit' },
    { id: 3, accountId: '2', amount: '12.99', date: 'April 3, 2026', merchant: 'Netflix', category: 'Entertainment', type: 'credit' },
    { id: 4, accountId: '1', amount: '8.50', date: 'April 2, 2026', merchant: 'Blue Bottle Coffee', category: 'Dining', type: 'credit' },
    { id: 5, accountId: '1', amount: '2500.00', date: 'April 1, 2026', merchant: 'Company Payroll', category: 'Income', type: 'deposit' },
    { id: 6, accountId: '2', amount: '85.20', date: 'March 30, 2026', merchant: 'Shell Station', category: 'Transport', type: 'credit' },
    { id: 7, accountId: '3', amount: '120.00', date: 'March 28, 2026', merchant: 'Interest Paid', category: 'Income', type: 'deposit' },
  ],
  
  // 💡 3. 注入券商/錢包資料
  investmentAccounts: [
    { id: 'inv-acc-1', name: 'Robinhood', type: 'Broker', logo: 'https://www.google.com/s2/favicons?domain=robinhood.com&sz=128' },
    { id: 'inv-acc-2', name: 'Coinbase', type: 'Exchange', logo: 'https://www.google.com/s2/favicons?domain=coinbase.com&sz=128' },
    { id: 'inv-acc-3', name: 'Phantom', type: 'Web3 Wallet', logo: 'https://www.google.com/s2/favicons?domain=phantom.app&sz=128' },
  ],

  // 💡 4. 將每筆資產綁定對應的 accountId
  investments: [
    { id: 'inv-1', accountId: 'inv-acc-2', symbol: 'BTC', name: 'Bitcoin', holdings: 1.245, currentPrice: 84200.50, change24h: 3.24, type: 'crypto', logo: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png' },
    { id: 'inv-2', accountId: 'inv-acc-3', symbol: 'ETH', name: 'Ethereum', holdings: 8.5, currentPrice: 3850.20, change24h: -1.15, type: 'crypto', logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png' },
    { id: 'inv-3', accountId: 'inv-acc-3', symbol: 'SOL', name: 'Solana', holdings: 145.5, currentPrice: 185.40, change24h: 8.45, type: 'crypto', logo: 'https://assets.coingecko.com/coins/images/4128/large/solana.png' },
    { id: 'inv-4', accountId: 'inv-acc-1', symbol: 'AAPL', name: 'Apple Inc.', holdings: 50, currentPrice: 175.50, change24h: 0.85, type: 'stock', logo: 'https://www.google.com/s2/favicons?domain=apple.com&sz=128' },
    { id: 'inv-5', accountId: 'inv-acc-1', symbol: 'NVDA', name: 'NVIDIA Corp.', holdings: 20, currentPrice: 850.75, change24h: 4.20, type: 'stock', logo: 'https://www.google.com/s2/favicons?domain=nvidia.com&sz=128' },
  ],
  
  isAiOptedIn: false,
  toggleAiOptIn: () => set((state) => ({ isAiOptedIn: !state.isAiOptedIn })),
  setAccounts: (accounts) => set({ accounts }),
  setTransactions: (transactions) => set({ transactions }),
  disconnectBankingAccount: (accountId) => {
    set((state) => ({
      accounts: state.accounts.filter((acc) => acc.id !== accountId),
      transactions: state.transactions.filter((tx) => tx.accountId !== accountId),
    }));
  },
  disconnectInvestmentAccount: (accountId) => {
    set((state) => ({
      investmentAccounts: state.investmentAccounts.filter((acc) => acc.id !== accountId),
      investments: state.investments.filter((inv) => inv.accountId !== accountId),
    }));
  },

  syncConnectedWalletPosition: async ({
    address,
    chainId,
    chainName,
    nativeSymbol,
    nativeBalance,
  }) => {
    const normalizedAddress = address.toLowerCase();
    const accountId = `wallet-${chainId}-${normalizedAddress}`;
    const assetId = `wallet-native-${chainId}-${normalizedAddress}`;
    const chainMeta = CHAIN_MARKET_META[chainId];

    let currentPrice = 0;
    let change24h = 0;

    if (chainMeta) {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${chainMeta.coingeckoId}&vs_currencies=usd&include_24hr_change=true`
        );

        if (response.ok) {
          const json = (await response.json()) as Record<string, { usd?: number; usd_24h_change?: number }>;
          const market = json[chainMeta.coingeckoId];
          currentPrice = market?.usd ?? 0;
          change24h = market?.usd_24h_change ?? 0;
        }
      } catch {
        currentPrice = 0;
        change24h = 0;
      }
    }

    const walletAccount: InvestmentAccount = {
      id: accountId,
      name: `${chainName} Wallet`,
      type: 'Web3 Wallet',
      logo: 'https://www.google.com/s2/favicons?domain=walletconnect.com&sz=128',
    };

    const walletAsset: Investment = {
      id: assetId,
      accountId,
      symbol: nativeSymbol,
      name: chainMeta?.fallbackName ?? nativeSymbol,
      holdings: nativeBalance,
      currentPrice,
      change24h,
      type: 'crypto',
      logo: chainMeta?.logo ?? 'https://www.google.com/s2/favicons?domain=ethereum.org&sz=128',
    };

    set((state) => ({
      investmentAccounts: [
        ...state.investmentAccounts.filter((acc) => acc.id !== accountId),
        walletAccount,
      ],
      investments: [
        ...state.investments.filter((inv) => inv.id !== assetId),
        walletAsset,
      ],
    }));
  },

  removeConnectedWalletPosition: (address, chainId) => {
    const normalizedAddress = address.toLowerCase();
    const accountId = `wallet-${chainId}-${normalizedAddress}`;
    const assetId = `wallet-native-${chainId}-${normalizedAddress}`;

    set((state) => ({
      investmentAccounts: state.investmentAccounts.filter((acc) => acc.id !== accountId),
      investments: state.investments.filter((inv) => inv.id !== assetId),
    }));
  },
}));