<template>
  <div class="w-full text-kura-text">
    <!-- Hero Section -->
    <section class="relative pt-20 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center space-y-8">
          <div class="inline-block">
            <div class="px-4 py-2 rounded-full bg-kura-primary/10 border border-kura-primary/20">
              <p class="text-sm font-semibold text-kura-primary">Global Digital Nomad Finance</p>
            </div>
          </div>

          <h1 class="text-5xl md:text-7xl font-black tracking-tight">
            <span class="bg-gradient-to-r from-kura-primary to-kura-secondary bg-clip-text text-transparent">
              Borderless Financial Identity
            </span>
          </h1>

          <h2 class="text-2xl md:text-3xl font-bold text-kura-text-secondary">
            Wherever you are, your assets should follow like a shadow. Master fiat and crypto in a single dashboard, using ZK credentials to transcend borders and bureaucracy.
          </h2>

          <p class="text-lg md:text-xl text-kura-text-secondary max-w-3xl mx-auto leading-relaxed">
            For global citizens who refuse to compromise financial freedom for mobility. Multi-currency mastery, zero-knowledge proofs, and seamless international transactions.
          </p>

          <div class="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.kura-finance.com" target="_blank" rel="noopener noreferrer" 
               class="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-kura-primary to-kura-secondary text-white font-semibold hover:shadow-lg hover:shadow-kura-primary/50 transition-all duration-300">
              Get Started Today
            </a>
            <NuxtLink to="/about" 
               class="inline-block px-8 py-4 rounded-lg border border-kura-primary text-kura-primary font-semibold hover:bg-kura-primary/10 transition-all duration-300">
              Learn More
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Three Pillars Section -->
    <section class="py-20 md:py-32 px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">
            The Foundation of Global Nomad Finance
          </h2>
          <p class="text-lg text-kura-text-secondary max-w-3xl mx-auto">
            Multi-currency alignment and seamless lifestyle integration.
          </p>
        </div>

        <div class="space-y-12">
          <!-- Pillar 1 -->
          <div class="grid md:grid-cols-2 gap-8 items-start">
            <div class="order-2 md:order-1">
              <div class="rounded-xl bg-kura-background-light border border-kura-border p-8 h-64 flex items-center justify-center">
                <div class="text-center text-kura-text-secondary">Global Dashboard</div>
              </div>
            </div>
            <div class="order-1 md:order-2 space-y-6">
              <div>
                <p class="text-sm font-semibold text-kura-primary uppercase tracking-wider mb-2">Core Feature</p>
                <h3 class="text-3xl md:text-4xl font-bold mb-4">
                  Global Multi-Currency Dashboard
                </h3>
              </div>
              <p class="text-lg text-kura-text-secondary leading-relaxed">
                Stop switching between five different bank apps and three hardware wallets. Kura aligns your USD, TWD, and on-chain liquidity assets in one unified interface, providing the financial truth that truly belongs to global citizens. See your complete portfolio across all currencies and chains in real-time.
              </p>
              <div class="space-y-3 pt-4">
                <div class="flex gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-kura-primary/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-kura-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-kura-text-secondary">Unified view of USD, EUR, SGD, TWD, and other fiat currencies</span>
                </div>
                <div class="flex gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-kura-primary/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-kura-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-kura-text-secondary">Real-time exchange rates and currency conversion tracking</span>
                </div>
                <div class="flex gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-kura-primary/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-kura-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-kura-text-secondary">On-chain liquidity assets and stablecoin holdings across networks</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Pillar 3 -->
          <div class="grid md:grid-cols-2 gap-8 items-start">
            <div class="order-2 md:order-1">
              <div class="rounded-xl bg-kura-background-light border border-kura-border p-8 h-64 flex items-center justify-center">
                <div class="text-center text-kura-text-secondary">Nomad Finance Console</div>
              </div>
            </div>
            <div class="order-1 md:order-2 space-y-6">
              <div>
                <p class="text-sm font-semibold text-kura-primary uppercase tracking-wider mb-2">Core Feature</p>
                <h3 class="text-3xl md:text-4xl font-bold mb-4">
                  Plug-and-Play Nomad Finance
                </h3>
              </div>
              <p class="text-lg text-kura-text-secondary leading-relaxed">
                Seamlessly integrate your daily spending and on-chain earnings without friction. Precisely track international withdrawal fees, foreign exchange spreads, and credit card expenses across all your financial channels. Ensure your liquidity always stays in the most optimal, efficient position, no matter where you are in the world.
              </p>
              <div class="space-y-3 pt-4">
                <div class="flex gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-kura-primary/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-kura-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-kura-text-secondary">Automatic tracking of international withdrawal fees and FX spreads</span>
                </div>
                <div class="flex gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-kura-primary/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-kura-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-kura-text-secondary">Credit card expense categorization and monthly reconciliation</span>
                </div>
                <div class="flex gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-kura-primary/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-kura-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-kura-text-secondary">Optimal liquidity positioning recommendations across currencies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Digital Nomads Trust Kura -->
    <section class="py-20 md:py-32 px-4 sm:px-6 bg-kura-background-light">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">
            Why Digital Nomads Choose Kura
          </h2>
          <p class="text-lg text-kura-text-secondary max-w-3xl mx-auto">
            Built for the globally mobile professional.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="p-8 rounded-xl bg-white border border-kura-border hover:border-kura-primary/50 transition-all duration-300">
            <div class="flex gap-4 mb-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-kura-primary/20 text-kura-primary">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="font-bold text-kura-text mb-2">Truly Non-Custodial</h3>
                <p class="text-kura-text-secondary">No one controls your assets. Read-only access means complete transparency and zero custody risk, even across borders.</p>
              </div>
            </div>
          </div>



          <div class="p-8 rounded-xl bg-white border border-kura-border hover:border-kura-primary/50 transition-all duration-300">
            <div class="flex gap-4 mb-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-kura-primary/20 text-kura-primary">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="font-bold text-kura-text mb-2">Multi-Currency Support</h3>
                <p class="text-kura-text-secondary">USD, EUR, SGD, CNY, TWD, and 50+ currencies. Plus stablecoins and on-chain assets in one unified view.</p>
              </div>
            </div>
          </div>

          <div class="p-8 rounded-xl bg-white border border-kura-border hover:border-kura-primary/50 transition-all duration-300">
            <div class="flex gap-4 mb-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-kura-primary/20 text-kura-primary">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="font-bold text-kura-text mb-2">Institutional Security</h3>
                <p class="text-kura-text-secondary">TLS 1.3 encryption. AES-256 at rest. Zero-trust architecture built for maximum security.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 md:py-32 px-4 sm:px-6">
      <div class="max-w-4xl mx-auto">
        <div class="bg-gradient-to-r from-kura-primary/10 to-kura-secondary/10 border border-kura-primary/20 rounded-xl p-12 text-center space-y-6">
          <h2 class="text-4xl md:text-5xl font-bold">
            Ready to Master Your Global Finances?
          </h2>
          <p class="text-lg text-kura-text-secondary max-w-2xl mx-auto">
            One dashboard. All currencies. Complete control. Wherever you travel.
          </p>
          <a href="https://app.kura-finance.com" target="_blank" rel="noopener noreferrer" 
             class="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-kura-primary to-kura-secondary text-white font-semibold hover:shadow-lg hover:shadow-kura-primary/50 transition-all duration-300">
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
});

useSeoMeta({
  title: 'For Digital Nomads | Multi-Currency Global Finance - Kura Finance',
  description: 'Global financial management for digital nomads. Manage USD, EUR, and crypto in one dashboard. Multi-currency tracking and FX optimization.',
  keywords: 'digital nomad, multi-currency management, global finance, international money transfer, expat banking, crypto nomad, currency conversion',
  ogTitle: 'For Digital Nomads | Borderless Financial Identity',
  ogDescription: 'Master your global finances across all currencies and chains.',
  ogUrl: 'https://kura-finance.com/digital-nomads',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Digital Nomads | Kura Finance'
});
</script>

<style scoped>
section {
  position: relative;
}
</style>
