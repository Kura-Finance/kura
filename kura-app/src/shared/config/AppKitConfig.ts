// src/AppKitConfig.ts (or wherever you prefer to configure it)
import { createAppKit, bitcoin, solana, type AppKitNetwork } from '@reown/appkit-react-native'
import { EthersAdapter } from '@reown/appkit-ethers-react-native'

// You can use 'viem/chains' or define your own chains using `AppKitNetwork` type. Check Options/networks for more detailed info
import { mainnet, polygon } from 'viem/chains'
import { storageAdapter } from './StorageAdapter'

const projectId = process.env.WALLETCONNECT_PROJECT_ID

if (!projectId) {
  throw new Error(
    'WALLETCONNECT_PROJECT_ID environment variable is not defined. ' +
    'Please obtain it from https://dashboard.reown.com/ and set it in your environment variables.'
  )
}

const ethersAdapter = new EthersAdapter()

export const appKit = createAppKit({
  projectId,
  networks: [mainnet, polygon, solana, bitcoin],
  defaultNetwork: mainnet, // Optional: set a default network
  adapters: [ethersAdapter],
  storage: storageAdapter,

  // Other AppKit options (e.g., metadata for your dApp)
  metadata: {
    name: 'My Awesome dApp',
    description: 'My dApp description',
    url: 'https://myapp.com',
    icons: ['https://myapp.com/icon.png'],
    redirect: {
      native: 'YOUR_APP_SCHEME://',
      universal: 'YOUR_APP_UNIVERSAL_LINK.com'
    }
  }
})