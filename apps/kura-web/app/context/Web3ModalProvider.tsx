// src/context/Web3ModalProvider.tsx
'use client'

import React, { ReactNode } from 'react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State, WagmiProvider } from 'wagmi'
import { mainnet, arbitrum, polygon } from 'wagmi/chains' // 引入你想要支援的區塊鏈

// 1. 設定 React Query
const queryClient = new QueryClient()

// 2. 取得環境變數的 Project ID
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

if (!projectId) {
  console.warn('WalletConnect Project ID is missing. Please add it to your .env.local')
}

// 3. 設定 DApp 的元資料 (Metadata)
const metadata = {
  name: 'Kura Finance',
  description: 'Your Financial Nexus',
  url: 'http://localhost:3000', // 請換成你的正式網域
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// 4. 建立 Wagmi Config
const config = defaultWagmiConfig({
  chains: [mainnet, arbitrum, polygon], 
  projectId: projectId || '',
  metadata,
  ssr: true, // 開啟 SSR 支援
})

// 5. 初始化 Web3Modal
if (projectId) {
  createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: false,
    themeMode: 'dark',
    themeVariables: {
      '--w3m-font-family': 'inherit',
      '--w3m-accent': '#8B5CF6', // 💡 Kura 的招牌紫色！
      '--w3m-border-radius-master': '16px',
    }
  })
}

// 6. 建立 Provider 元件
export default function Web3ModalProvider({
  children,
  initialState
}: {
  children: ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}