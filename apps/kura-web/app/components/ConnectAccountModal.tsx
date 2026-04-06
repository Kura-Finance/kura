// src/components/ConnectAccountModal.tsx
"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAppStore } from '@/store/useAppStore';

// 💡 1. 引入 Plaid Hook
import { usePlaidLink, type PlaidLinkOnSuccessMetadata } from 'react-plaid-link';

interface ConnectAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectAccountModal({ isOpen, onClose }: ConnectAccountModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isConnecting, setIsConnecting] = useState<'plaid' | 'walletconnect' | null>(null);
  const linkToken = useAppStore(state => state.plaidLinkToken);
  const setPlaidLinkToken = useAppStore(state => state.setPlaidLinkToken);

  const { open: openWalletConnect } = useWeb3Modal();

  // 💡 2. 初始化時向你的後端請求 Link Token
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    
    // 模擬向後端 API 獲取 Token 的過程
    const fetchLinkToken = async () => {
      try {
        /* 🚧 [Production 邏輯]
          const response = await fetch('/api/plaid/create-link-token', { method: 'POST' });
          const data = await response.json();
          setLinkToken(data.link_token);
        */
        
        // 開發階段：我們填入一個假 Token 讓畫面不會報錯
        setPlaidLinkToken('mock-link-token-for-ui');
      } catch (error) {
        console.error('Error fetching link token:', error);
      }
    };
    
    fetchLinkToken();
    return () => clearTimeout(timer);
  }, [setPlaidLinkToken]);

  // 💡 3. 設定 Plaid 登入成功後的回呼函式 (Success Callback)
  const onPlaidSuccess = useCallback((public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
    console.log('🎉 Plaid 授權成功！');
    console.log('Public Token (需傳回後端):', public_token);
    console.log('綁定的銀行資訊:', metadata.institution);
    
    /*
      🚧 [Production 邏輯]
      你要在這裡把 public_token fetch() 傳回你的後端
      後端會去跟 Plaid 換成永久的 access_token 並存入資料庫
    */
    
    onClose();
  }, [onClose]);

  // 💡 4. 初始化 Plaid SDK
  const { open: openPlaid, ready: isPlaidReady } = usePlaidLink({
    token: linkToken || '',
    onSuccess: onPlaidSuccess,
    // onExit: (err, metadata) => console.log('User closed Plaid', err),
  });

  // 點擊 Plaid 按鈕的處理邏輯
  const handlePlaidConnect = () => {
    setIsConnecting('plaid');
    
    if (linkToken === 'mock-link-token-for-ui') {
      // ⚠️ 攔截假 Token：Plaid 如果收到假 token 會直接黑畫面報錯，所以我們在這裡攔截並模擬
      setTimeout(() => {
        alert("即將開啟 Plaid 銀行選擇畫面！\n\n(提示：由於目前缺少真實後端產生的 link_token，此處用彈窗模擬。請參考程式碼中的 🚧 註解來接上你的 API。)");
        setIsConnecting(null);
        onClose();
      }, 800);
    } else if (isPlaidReady) {
      // 🚀 如果有真實 token 且 SDK 準備就緒，直接開啟 Plaid 視窗
      openPlaid();
      setIsConnecting(null);
      onClose();
    }
  };

  const handleWalletConnect = () => {
    setIsConnecting('walletconnect');
    onClose();
    setTimeout(() => {
      // Force connector selection instead of the default account view when already connected.
      openWalletConnect({ view: 'Connect' }).finally(() => {
        setIsConnecting(null);
      });
    }, 300);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#0B0B0F] border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center relative z-10">
              <div>
                <h2 className="text-xl font-bold text-white">Connect Account</h2>
                <p className="text-sm text-gray-400 mt-1">Select the type of account to link.</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#1A1A24] flex justify-center items-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 relative z-10">
              
              {/* Plaid 選項 */}
              <button 
                onClick={handlePlaidConnect}
                disabled={isConnecting !== null}
                className={`w-full p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group text-left ${
                  isConnecting === 'plaid' ? 'border-[#8B5CF6] bg-[#8B5CF6]/10' : 'border-white/5 bg-[#1A1A24] hover:border-[#8B5CF6]/50 hover:bg-white/5'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Image src="https://www.google.com/s2/favicons?domain=plaid.com&sz=128" alt="Plaid" width={28} height={28} className="object-contain opacity-80" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-bold text-base mb-0.5 group-hover:text-[#A78BFA] transition-colors">Bank & Brokerage</div>
                  <div className="text-xs text-gray-500 line-clamp-2">Connect Robinhood, Fidelity, Chase, and other traditional financial institutions via Plaid.</div>
                </div>
                {isConnecting === 'plaid' ? (
                  <div className="w-5 h-5 border-2 border-[#8B5CF6] border-t-transparent rounded-full animate-spin shrink-0" />
                ) : (
                  <div className="text-gray-600 group-hover:text-[#8B5CF6] transition-colors shrink-0">→</div>
                )}
              </button>

              {/* WalletConnect 選項 */}
              <button 
                onClick={handleWalletConnect}
                disabled={isConnecting !== null}
                className={`w-full p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group text-left ${
                  isConnecting === 'walletconnect' ? 'border-[#3B82F6] bg-[#3B82F6]/10' : 'border-white/5 bg-[#1A1A24] hover:border-[#3B82F6]/50 hover:bg-white/5'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#3B99FC] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 40 40" width="24" height="24" fill="white">
                    <path d="M12.26 11.26c4.27-4.14 11.2-4.14 15.47 0l.48.46c.38.36.38.96 0 1.33l-2.07 2a.94.94 0 0 1-1.33 0l-.58-.56a6.83 6.83 0 0 0-9.45 0l-.56.54a.95.95 0 0 1-1.34 0l-2.07-2a.94.94 0 0 1 0-1.32l1.45-1.45zm19.8 8.65l1.96 1.9a.94.94 0 0 1 0 1.32l-9.15 8.87a.95.95 0 0 1-1.34 0l-3.53-3.42a1.9 1.9 0 0 0-2.67 0l-3.53 3.42a.95.95 0 0 1-1.34 0l-9.15-8.87a.94.94 0 0 1 0-1.32l1.95-1.9a.95.95 0 0 1 1.34 0l6.23 6.03c.74.72 1.94.72 2.68 0l3.52-3.41a1.9 1.9 0 0 1 2.68 0l3.52 3.4a.95.95 0 0 0 1.34 0l6.24-6.03a.94.94 0 0 1 1.32 0z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-white font-bold text-base mb-0.5 group-hover:text-[#3B82F6] transition-colors">Web3 Wallet</div>
                  <div className="text-xs text-gray-500 line-clamp-2">Connect Metamask, Phantom, Trust Wallet, and 100+ decentralized wallets via WalletConnect.</div>
                </div>
                {isConnecting === 'walletconnect' ? (
                  <div className="w-5 h-5 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin shrink-0" />
                ) : (
                  <div className="text-gray-600 group-hover:text-[#3B82F6] transition-colors shrink-0">→</div>
                )}
              </button>

            </div>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#8B5CF6]/10 to-[#3B82F6]/10 blur-3xl rounded-full pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}