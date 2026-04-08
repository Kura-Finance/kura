import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Modal, View, ActivityIndicator, Text, TouchableOpacity, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { create, open, destroy } from 'react-native-plaid-link-sdk';
import { useAppStore } from '../store/useAppStore';
import Logger from '../utils/Logger';

interface PlaidLinkModalProps {
  isVisible: boolean;
  linkToken: string | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const LINK_TOKEN_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes

export default function PlaidLinkModal({ 
  isVisible, 
  linkToken: initialLinkToken,
  onClose, 
  onSuccess 
}: PlaidLinkModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  const sessionRef = useRef<boolean>(false);
  const exitTimeoutRef = useRef<number | null>(null);
  const hasExitedRef = useRef(false);
  const tokenRequestAttemptRef = useRef(false);

  const confirmPlaidExchange = useAppStore((state: any) => state.confirmPlaidExchange);
  const requestPlaidLinkToken = useAppStore((state: any) => state.requestPlaidLinkToken);
  const plaidLinkTokenTimestamp = useAppStore((state: any) => state.plaidLinkTokenTimestamp);
  const plaidLinkToken = useAppStore((state: any) => state.plaidLinkToken);

  // 使用 store 的 token，如果没有则使用 prop 中的
  const linkToken = plaidLinkToken || initialLinkToken;

  const isTokenExpired = useCallback(() => {
    if (!plaidLinkTokenTimestamp) return true;
    const ageMs = Date.now() - plaidLinkTokenTimestamp;
    return ageMs > LINK_TOKEN_EXPIRY_MS;
  }, [plaidLinkTokenTimestamp]);

  const handleRetry = async () => {
    setError(null);
    setIsLoading(false);
    try {
      await requestPlaidLinkToken();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to refresh token';
      setError(msg);
      Logger.error('PlaidLinkModal', 'Retry failed', { error: msg });
    }
  };

  useEffect(() => {
    // 如果 modal 打开且没有有效的 token，自动请求
    if (isVisible && !linkToken && !tokenRequestAttemptRef.current && !isInitializing) {
      tokenRequestAttemptRef.current = true;
      Logger.debug('PlaidLinkModal', 'No token available, requesting one automatically');
      setIsLoading(true);
      requestPlaidLinkToken()
        .then(() => {
          Logger.info('PlaidLinkModal', 'Token auto-requested successfully');
        })
        .catch((err: any) => {
          const msg = err instanceof Error ? err.message : 'Failed to get token';
          setError(msg);
          setIsLoading(false);
          Logger.error('PlaidLinkModal', 'Auto-request failed', { error: msg });
        });
      return;
    }

    if (!isVisible || !linkToken) {
      Logger.debug('PlaidLinkModal', 'Not visible or no token', { isVisible, hasToken: !!linkToken });
      return;
    }

    // Prevent re-initialization
    if (isInitializing) return;

    let isMounted = true;
    let sessionCreated = false;

    const initializePlaid = async () => {
      try {
        setIsInitializing(true);
        setIsLoading(true);
        setError(null);

        if (!isMounted) return;

        Logger.debug('PlaidLinkModal', 'Creating Plaid session', {
          token: linkToken.substring(0, 20) + '...',
          tokenExpired: isTokenExpired(),
        });

        // Create session
        try {
          create({ token: linkToken });
          sessionCreated = true;
          sessionRef.current = true;
          Logger.info('PlaidLinkModal', 'Plaid session created');
        } catch (err: any) {
          Logger.error('PlaidLinkModal', 'Session creation failed', {
            error: err instanceof Error ? err.message : String(err),
          });
          throw err;
        }

        if (!isMounted || !sessionCreated) return;

        Logger.debug('PlaidLinkModal', 'Opening Plaid UI');

        // Open Plaid Link
        try {
          open({
            onSuccess: async (linkSuccess: any) => {
              if (!isMounted || hasExitedRef.current) return;
              hasExitedRef.current = true;

              Logger.info('PlaidLinkModal', 'Plaid success', {
                institution: linkSuccess?.metadata?.institution?.name,
              });

              if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);

              try {
                if (linkSuccess?.publicToken) {
                  setIsLoading(true);
                  await confirmPlaidExchange(
                    linkSuccess.publicToken,
                    linkSuccess.metadata?.institution?.name
                  );
                  if (isMounted) {
                    Logger.info('PlaidLinkModal', 'Exchange and data load complete');
                    onSuccess?.();
                    setIsLoading(false);
                    onClose();
                  }
                } else {
                  throw new Error('No public token received');
                }
              } catch (exchangeErr: any) {
                if (isMounted) {
                  const msg = exchangeErr instanceof Error ? exchangeErr.message : 'Exchange failed';
                  setError(msg);
                  setIsLoading(false);
                  Logger.error('PlaidLinkModal', 'Exchange error', { error: msg });
                }
              }
            },
            onExit: (linkExit: any) => {
              if (!isMounted || hasExitedRef.current) return;
              hasExitedRef.current = true;

              Logger.info('PlaidLinkModal', 'Plaid exit', {
                hasError: !!linkExit?.error,
                errorCode: linkExit?.error?.errorCode,
              });

              if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);

              // iOS workaround: hasError=true but errorCode is empty means user cancelled
              // In this case, close immediately without showing error
              const hasValidError = linkExit?.error && linkExit.error.errorCode;
              
              if (hasValidError) {
                const errorMsg = linkExit.error.displayMessage || 
                                 linkExit.error.errorMessage ||
                                 'Link error occurred';
                if (isMounted) {
                  setError(errorMsg || 'An error occurred');
                  setIsLoading(false);
                }
              } else {
                // User cancelled or iOS empty error - close immediately
                if (isMounted) {
                  setIsLoading(false);
                  setError(null);
                  setTimeout(() => {
                    if (isMounted) onClose();
                  }, 100);
                }
              }
            },
          });

          Logger.debug('PlaidLinkModal', 'Plaid UI opened');

          // Safety timeout for iOS
          exitTimeoutRef.current = setTimeout(() => {
            if (!isMounted || hasExitedRef.current) return;
            Logger.warn('PlaidLinkModal', 'No response after 60s, forcing close');
            hasExitedRef.current = true;
            if (isMounted) {
              setIsLoading(false);
              onClose();
            }
          }, 60000) as any;

        } catch (openErr: any) {
          Logger.error('PlaidLinkModal', 'Failed to open Plaid', {
            error: openErr instanceof Error ? openErr.message : String(openErr),
          });
          throw openErr;
        }
      } catch (err: any) {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Failed to initialize Plaid';
          setError(msg);
          setIsLoading(false);
          Logger.error('PlaidLinkModal', 'Initialization error', { error: msg });
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    };

    // Only initialize if we have a valid token
    if (linkToken && !isTokenExpired()) {
      initializePlaid();
    } else if (linkToken && isTokenExpired()) {
      setError('Token expired. Requesting new one...');
      requestPlaidLinkToken().catch((err: any) => {
        const msg = err instanceof Error ? err.message : 'Failed to refresh token';
        if (isMounted) setError(msg);
      });
    }

    return () => {
      isMounted = false;
      Logger.debug('PlaidLinkModal', 'useEffect cleanup triggered');
      
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
        Logger.debug('PlaidLinkModal', 'Cleared exit timeout');
      }
      
      // 立即销毁 Plaid session
      if (sessionRef.current) {
        try {
          destroy();
          sessionRef.current = false;
          Logger.info('PlaidLinkModal', 'Plaid session destroyed successfully');
        } catch (err: any) {
          Logger.warn('PlaidLinkModal', 'Error destroying session', { error: String(err) });
        }
      }
      
      Keyboard.dismiss();
    };
  }, [isVisible, linkToken, isInitializing, requestPlaidLinkToken, confirmPlaidExchange, onClose, onSuccess, isTokenExpired]);

  // 重置状态和 ref 当 modal 关闭
  useEffect(() => {
    if (!isVisible) {
      Logger.debug('PlaidLinkModal', 'Modal closed - resetting state');
      tokenRequestAttemptRef.current = false;
      hasExitedRef.current = false;
      sessionRef.current = false;
      setIsLoading(false);
      setError(null);
      setIsInitializing(false);
      Logger.info('PlaidLinkModal', 'State reset complete');
    }
  }, [isVisible]);

  return (
    <Modal 
      visible={isVisible} 
      transparent 
      statusBarTranslucent 
      onRequestClose={() => {
        Logger.debug('PlaidLinkModal', 'onRequestClose triggered');
        onClose();
      }}
      onDismiss={() => {
        Logger.info('PlaidLinkModal', 'Modal dismissed - cleaning up');
        // 确保 session 被销毁
        try {
          destroy();
          Logger.info('PlaidLinkModal', 'Plaid session destroyed on modal dismiss');
        } catch (err) {
          Logger.warn('PlaidLinkModal', 'Session already destroyed or error', { error: String(err) });
        }
        Keyboard.dismiss();
      }}
    >
      <View className="flex-1 bg-black/60 justify-center items-center p-4">
        <View className="bg-[#0B0B0F] border border-white/10 rounded-3xl overflow-hidden w-full">
          {/* Header */}
          <View className="border-b border-white/5 p-6 flex-row justify-between items-center">
            <View>
              <Text className="text-xl font-bold text-white">Connect Bank Account</Text>
              <Text className="text-sm text-gray-400 mt-1">via Plaid</Text>
            </View>
            {!isLoading && !isInitializing && (
              <TouchableOpacity
                onPress={onClose}
                className="w-8 h-8 rounded-full bg-white/10 justify-center items-center"
              >
                <Ionicons name="close" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>

          {/* Content */}
          <View className="p-6">
            {isLoading || isInitializing ? (
              <View className="items-center py-8">
                <ActivityIndicator size="large" color="#8B5CF6" />
                <Text className="text-white mt-4 text-center">
                  Initializing Plaid Link...
                </Text>
                <Text className="text-gray-400 text-xs mt-2 text-center">
                  Setting up secure connection
                </Text>
              </View>
            ) : error ? (
              <View>
                <View className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
                  <View className="flex-row items-start">
                    <Ionicons name="alert-circle" size={16} color="#FCA5A5" style={{ marginRight: 8, marginTop: 2 }} />
                    <Text className="text-red-300 text-sm flex-1">{error}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={handleRetry}
                  className="bg-[#8B5CF6] rounded-xl py-3 items-center mb-2"
                >
                  <Text className="text-white font-semibold">Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onClose}
                  className="border border-white/10 rounded-xl py-3 items-center"
                >
                  <Text className="text-white font-semibold">Cancel</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="items-center py-4">
                <Text className="text-gray-300 text-sm text-center">
                  Waiting for Plaid Link to open...
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
