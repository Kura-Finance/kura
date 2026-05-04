"use client";

import React, { useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchDeBankProtocolPositions, type DeBankProtocolPosition } from '@/lib/debankApi';
import { useAppStore } from '@/store/useAppStore';

function formatCurrency(value: number, mask: boolean): string {
  if (mask) return '••••••';
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatTimestamp(value: string | null): string {
  if (!value) return 'Never';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatUnits(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 6 });
}

function resolveProtocolIcon(name: string): string {
  const normalized = name.trim().toLowerCase();
  if (normalized) {
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(normalized)}.fi&sz=128`;
  }
  return 'https://www.google.com/s2/favicons?domain=debank.com&sz=128';
}

function ProtocolAvatar({ logo, name }: { logo?: string; name: string }) {
  const firstChar = name.slice(0, 1).toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full border border-[var(--kura-border)] bg-[var(--kura-bg-light)] overflow-hidden shrink-0 flex items-center justify-center">
      {logo ? (
        // Use CSS background image so we can display arbitrary logo hosts returned by DeBank.
        <div
          className="w-full h-full bg-center bg-cover"
          style={{ backgroundImage: `url("${logo}")` }}
          aria-hidden="true"
        />
      ) : (
        <span className="text-xs font-semibold text-[var(--kura-text-secondary)]">{firstChar || '?'}</span>
      )}
    </div>
  );
}

export default function DefiProtocolPage() {
  const { address, isConnected } = useAccount();
  const isBalanceHidden = useAppStore((state) => state.isBalanceHidden);
  const [positions, setPositions] = useState<DeBankProtocolPosition[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  const normalizedAddress = address?.toLowerCase() ?? null;

  const loadProtocolPositions = React.useCallback(
    async (refresh: boolean) => {
      if (!normalizedAddress) {
        setPositions([]);
        setError(null);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchDeBankProtocolPositions(normalizedAddress, refresh);
        const sanitized = response.positions.filter((item) => item.usdValue > 0);
        setPositions(sanitized);
        setLastSyncedAt(response.lastSyncedAt);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load DeFi protocol assets';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [normalizedAddress],
  );

  React.useEffect(() => {
    void loadProtocolPositions(false);
  }, [loadProtocolPositions]);

  const { totalValue, sortedPositions } = useMemo(() => {
    const total = positions.reduce((sum, item) => sum + item.usdValue, 0);
    const sorted = [...positions].sort((a, b) => b.usdValue - a.usdValue);

    return {
      totalValue: total,
      sortedPositions: sorted,
    };
  }, [positions]);

  return (
    <div className="w-full pb-24 px-6 sm:px-10 lg:px-16 pt-0 max-w-7xl mx-auto">
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-2xl">DeFi Protocols</CardTitle>
              <CardDescription>
                Debank-style protocol portfolio view. Only protocol positions are shown here; native wallet assets
                remain in Crypto.
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => void loadProtocolPositions(true)}
              disabled={isLoading || !normalizedAddress}
            >
              {isLoading ? 'Syncing...' : 'Sync'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-xl border border-[var(--kura-border)] bg-[var(--kura-bg-light)] px-4 py-3">
              <p className="text-xs text-[var(--kura-text-secondary)]">Total Protocol Value</p>
              <p className="text-2xl font-semibold mt-1">{formatCurrency(totalValue, isBalanceHidden)}</p>
            </div>
            <div className="rounded-xl border border-[var(--kura-border)] bg-[var(--kura-bg-light)] px-4 py-3">
              <p className="text-xs text-[var(--kura-text-secondary)]">Protocols</p>
              <p className="text-2xl font-semibold mt-1">{positions.length}</p>
            </div>
            <div className="rounded-xl border border-[var(--kura-border)] bg-[var(--kura-bg-light)] px-4 py-3">
              <p className="text-xs text-[var(--kura-text-secondary)]">Last Synced</p>
              <p className="text-sm font-medium mt-2">{formatTimestamp(lastSyncedAt)}</p>
            </div>
          </div>

          {!isConnected || !normalizedAddress ? (
            <div className="rounded-xl border border-dashed border-[var(--kura-border)] px-4 py-8 text-center text-sm text-[var(--kura-text-secondary)]">
              Connect a wallet to view your DeFi protocol positions.
            </div>
          ) : null}

          {error ? (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>
          ) : null}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Protocol Overview</CardTitle>
          <CardDescription>Debank-style small cards for each synced protocol</CardDescription>
        </CardHeader>
        <CardContent>
          {sortedPositions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--kura-border)] px-4 py-8 text-center text-sm text-[var(--kura-text-secondary)]">
              No protocol summary available yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {sortedPositions.map((protocol) => (
                <div
                  key={`summary-${protocol.id}`}
                  className="rounded-xl border border-[var(--kura-border)] bg-[var(--kura-bg-light)] px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <ProtocolAvatar logo={protocol.logo || resolveProtocolIcon(protocol.name)} name={protocol.name} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{protocol.name}</p>
                        <p className="text-xs text-[var(--kura-text-secondary)] truncate">
                          {protocol.chain ? protocol.chain : 'Multi-chain'}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{protocol.assets.length} assets</Badge>
                  </div>
                  <p className="mt-3 text-lg font-semibold">{formatCurrency(protocol.usdValue, isBalanceHidden)}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Protocol Asset Breakdown</CardTitle>
          <CardDescription>
            Per protocol assets and USD value from backend sync. Native wallet assets stay in Crypto.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {positions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--kura-border)] px-4 py-8 text-center text-sm text-[var(--kura-text-secondary)]">
              No DeFi protocol positions found for this wallet.
            </div>
          ) : (
            sortedPositions.map((position) => (
                <div
                  key={position.id}
                  className="rounded-xl border border-[var(--kura-border)] bg-[var(--kura-bg-light)] p-4"
                >
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--kura-border)]">
                    <div className="flex items-center gap-3 min-w-0">
                      <ProtocolAvatar logo={position.logo || resolveProtocolIcon(position.name)} name={position.name} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{position.name}</p>
                        <p className="text-xs text-[var(--kura-text-secondary)] truncate">
                          {position.chain ? position.chain : 'Multi-chain'}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base font-semibold">{formatCurrency(position.usdValue, isBalanceHidden)}</p>
                  </div>

                  {position.assets.length === 0 ? (
                    <div className="pt-3 text-xs text-[var(--kura-text-secondary)]">
                      No asset-level breakdown returned by backend for this protocol.
                    </div>
                  ) : (
                    <div className="pt-3 space-y-2">
                      {[...position.assets]
                        .sort((a, b) => b.usdValue - a.usdValue)
                        .map((asset) => (
                          <div
                            key={`${position.id}-${asset.id}`}
                            className="flex items-center justify-between gap-3 rounded-lg border border-[var(--kura-border)] bg-[var(--kura-surface)] px-3 py-2"
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">
                                {asset.symbol} <span className="text-[var(--kura-text-secondary)]">- {asset.name}</span>
                              </p>
                              <p className="text-xs text-[var(--kura-text-secondary)]">
                                {asset.amount > 0 ? `${formatUnits(asset.amount)} x ${formatCurrency(asset.price, isBalanceHidden)}` : 'Position asset'}
                              </p>
                            </div>
                            <p className="text-sm font-semibold">{formatCurrency(asset.usdValue, isBalanceHidden)}</p>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))
          )}

          <p className="pt-1 text-xs text-[var(--kura-text-secondary)]">
            Protocol list is fully synced from backend data; no fixed protocol whitelist is used.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
