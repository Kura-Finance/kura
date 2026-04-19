<script setup lang="ts">
definePageMeta({
  layout: 'default'
});

useSeoMeta({
  title: 'Kura Notary | Decentralized Blockchain Notarization Platform',
  description: 'Immutable proof of existence for legal documents and enterprise contracts. Kura Notary leverages blockchain technology to provide cryptographically-verified timestamps and digital fingerprints for critical business documents.',
  keywords: 'blockchain notary, digital notarization, decentralized verification, legal documents, contract management, proof of existence',
  ogTitle: 'Kura Notary | Decentralized Blockchain Notarization',
  ogDescription: 'Immutable proof of existence for legal documents and enterprise contracts.',
  ogUrl: 'https://kura-finance.com/notary',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Kura Notary | Blockchain Notarization Platform'
});

const features = [
  {
    title: 'Immutable Timestamps',
    description: 'Every document receives a cryptographically-verified timestamp anchored to the blockchain, creating indisputable proof of when the document existed.'
  },
  {
    title: 'Legal Compliance',
    description: 'Designed to meet enterprise and cross-border legal requirements. Each notarization generates audit-ready documentation for regulatory compliance.'
  },
  {
    title: 'Digital Fingerprints',
    description: 'Using cryptographic hashing, we create unique digital fingerprints for your documents. Any modification becomes immediately detectable.'
  },
  {
    title: 'Privacy First',
    description: 'Document content never touches our servers. We only store the cryptographic hash, ensuring complete confidentiality of your sensitive information.'
  },
  {
    title: 'Decentralized Storage',
    description: 'Documents are stored on IPFS (InterPlanetary File System), ensuring decentralized, redundant, and censorship-resistant storage with global accessibility.'
  }
];

const useCases = [
  {
    icon: 'business',
    title: 'Enterprise Contracts',
    description: 'Notarize multi-party international agreements with immutable proof of execution timestamps and participant verification.'
  },
  {
    icon: 'legal',
    title: 'Legal Documents',
    description: 'Create blockchain-verified proof of existence for wills, intellectual property claims, and other critical legal documents.'
  },
  {
    icon: 'medical',
    title: 'Medical Records',
    description: 'Healthcare providers can notarize patient records with cryptographic proof, enabling secure cross-border medical document sharing.'
  },
  {
    icon: 'financial',
    title: 'Financial Transactions',
    description: 'Create immutable records of financial agreements, including loan terms, equity distributions, and settlement agreements.'
  }
];

const layers = [
  {
    title: 'Document Layer',
    subtitle: 'Privacy-Preserving Verification',
    description: 'Your document remains completely private. We extract a cryptographic hash without ever accessing the content.',
    features: [
      {
        heading: 'Secure Hash Algorithm (SHA-256)',
        content: 'We compute a unique 256-bit hash of your document. This hash is small enough to store on-chain, yet mathematically impossible to reverse-engineer or modify without detection.'
      },
      {
        heading: 'No Content Storage',
        content: 'Your actual document is never stored on our servers or the blockchain. You maintain complete control and confidentiality. We only store the hash.'
      },
      {
        heading: 'Distributed IPFS Storage',
        content: 'Documents are optionally stored on the InterPlanetary File System (IPFS), a decentralized peer-to-peer storage network. IPFS ensures your documents remain accessible, redundant, and censorship-resistant, with no single point of failure.'
      }
    ]
  },
  {
    title: 'Blockchain Layer',
    subtitle: 'Immutable Verification',
    description: 'The cryptographic hash is anchored to the blockchain, creating permanent proof of existence.',
    features: [
      {
        heading: 'Transaction Anchoring',
        content: 'Your document hash is embedded into a blockchain transaction at a specific block height. This timestamp becomes part of the immutable ledger.'
      },
      {
        heading: 'Multi-Chain Support',
        content: 'Deploy your notarizations across multiple blockchains (Ethereum, Polygon, etc.) for redundancy and cross-chain verification capabilities.'
      }
    ]
  },
  {
    title: 'Verification Layer',
    subtitle: 'Audit-Ready Proof',
    description: 'Anyone can cryptographically verify that your document existed at a specific time.',
    features: [
      {
        heading: 'Public Verification',
        content: 'Share your notarization certificate with third parties. They can independently verify the document hash and blockchain timestamp without needing any special access.'
      },
      {
        heading: 'Audit Trail',
        content: 'Complete audit trail showing document hash, notarization timestamp, blockchain confirmation, and participant identities for regulatory compliance.'
      }
    ]
  }
];
</script>

<template>
  <div class="w-full text-kura-text">
    <!-- Hero Section -->
    <section class="relative pt-20 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center space-y-8">
          <div class="inline-block">
            <div class="px-4 py-2 rounded-full bg-kura-primary/10 border border-kura-primary/20">
              <p class="text-sm font-semibold text-kura-primary">Decentralized Document Verification</p>
            </div>
          </div>

          <h1 class="text-5xl md:text-7xl font-black tracking-tight">
            <span class="bg-gradient-to-r from-kura-primary to-kura-secondary bg-clip-text text-transparent">
              Kura Notary
            </span>
          </h1>

          <h2 class="text-2xl md:text-3xl font-bold text-kura-text-secondary">
            Immutable Proof of Existence for Legal Documents
          </h2>

          <p class="text-lg md:text-xl text-kura-text-secondary max-w-3xl mx-auto leading-relaxed">
            Leverage blockchain technology to notarize critical business and legal documents. Create cryptographically-verified proof of existence with immutable timestamps that satisfy enterprise and cross-border legal requirements.
          </p>

          <div class="pt-4">
            <a href="https://app.kura-finance.com" target="_blank" rel="noopener noreferrer" 
               class="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-kura-primary to-kura-secondary text-white font-semibold hover:shadow-lg hover:shadow-kura-primary/50 transition-all duration-300">
              Get Started with Kura Notary
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Features Section -->
    <section class="py-20 md:py-32 px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">
            Enterprise-Grade Notarization
          </h2>
          <p class="text-lg text-kura-text-secondary max-w-3xl mx-auto">
            Four core capabilities that redefine how legal documents are verified in the Web3 era.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="(feature, index) in features" :key="index" 
               class="p-8 rounded-xl bg-kura-background-light border border-kura-border hover:border-kura-primary/50 transition-all duration-300">
            <h3 class="text-2xl font-bold mb-4 text-kura-primary">
              {{ feature.title }}
            </h3>
            <p class="text-kura-text-secondary leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Use Cases Section -->
    <section class="py-20 md:py-32 px-4 sm:px-6 bg-kura-background-light">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">
            Real-World Applications
          </h2>
          <p class="text-lg text-kura-text-secondary max-w-3xl mx-auto">
            From enterprise contracts to medical records, Kura Notary provides immutable verification across industries.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="(useCase, index) in useCases" :key="index" 
               class="p-8 rounded-xl bg-white border border-kura-border hover:border-kura-primary/50 transition-all duration-300">
            <h3 class="text-2xl font-bold mb-3 text-kura-text">
              {{ useCase.title }}
            </h3>
            <p class="text-kura-text-secondary leading-relaxed">
              {{ useCase.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Architecture -->
    <section class="py-20 md:py-32 px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">
            How Kura Notary Works
          </h2>
          <p class="text-lg text-kura-text-secondary max-w-3xl mx-auto">
            Three integrated layers ensure your documents are secure, verifiable, and legally compliant.
          </p>
        </div>

        <div v-for="(layer, index) in layers" :key="index" class="mb-20 md:mb-32 last:mb-0">
          <!-- Layer Header -->
          <div class="flex flex-col md:flex-row md:items-start md:gap-4 mb-12">
            <div class="flex-1">
              <p class="text-sm font-semibold text-kura-primary uppercase tracking-wider mb-2">
                {{ layer.subtitle }}
              </p>
              <h2 class="text-4xl md:text-5xl font-bold mb-4">
                {{ layer.title }}
              </h2>
              <p class="text-lg text-kura-text-secondary">
                {{ layer.description }}
              </p>
            </div>
          </div>

          <!-- Layer Features -->
          <div class="space-y-6 md:ml-0">
            <div v-for="(feature, featureIndex) in layer.features" :key="featureIndex" 
                 class="p-6 md:p-8 rounded-xl bg-kura-background-light border border-kura-border hover:border-kura-primary/30 transition-colors duration-300">
              <h3 class="text-xl md:text-2xl font-bold mb-3 text-kura-primary">
                {{ feature.heading }}
              </h3>
              <p class="text-base md:text-lg text-kura-text-secondary leading-relaxed">
                {{ feature.content }}
              </p>
            </div>
          </div>

          <!-- Divider -->
          <div v-if="index < layers.length - 1" class="mt-20 md:mt-32 h-px bg-gradient-to-r from-transparent via-kura-border to-transparent" />
        </div>
      </div>
    </section>

    <!-- Privacy & Security Section -->
    <section class="py-20 md:py-32 px-4 sm:px-6">
      <div class="max-w-5xl mx-auto">
        <div class="space-y-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold mb-6">
              Privacy & Security First
            </h2>
            <p class="text-lg text-kura-text-secondary">
              Your documents never leave your control. We only store cryptographic hashes.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="p-8 rounded-xl bg-kura-background-light border border-kura-border">
              <h3 class="text-xl font-bold mb-4 text-kura-primary">Zero-Knowledge Architecture</h3>
              <p class="text-kura-text-secondary">
                We never access your document content. Everything happens client-side, then only the cryptographic hash is sent to our servers and blockchain.
              </p>
            </div>

            <div class="p-8 rounded-xl bg-kura-background-light border border-kura-border">
              <h3 class="text-xl font-bold mb-4 text-kura-primary">Regulatory Compliance</h3>
              <p class="text-kura-text-secondary">
                Designed to comply with international digital notarization standards and cross-border legal frameworks.
              </p>
            </div>

            <div class="p-8 rounded-xl bg-kura-background-light border border-kura-border">
              <h3 class="text-xl font-bold mb-4 text-kura-primary">Audit Trail</h3>
              <p class="text-kura-text-secondary">
                Complete immutable audit trail for regulatory compliance, legal disputes, and verification requests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Integration CTA Section -->
    <section class="py-20 md:py-32 px-4 sm:px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center space-y-8 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-kura-primary/10 to-kura-secondary/10 border border-kura-primary/20">
          <h2 class="text-4xl md:text-5xl font-bold">
            Notarize Your First Document
          </h2>
          <p class="text-lg md:text-xl text-kura-text-secondary leading-relaxed">
            Start creating immutable proof of existence for your critical documents. No complex setup required.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="https://app.kura-finance.com" target="_blank" rel="noopener noreferrer" 
               class="px-8 py-4 rounded-lg bg-gradient-to-r from-kura-primary to-kura-secondary text-white font-semibold hover:shadow-lg hover:shadow-kura-primary/50 transition-all duration-300">
              Launch Kura Notary
            </a>
            <NuxtLink to="/docs" class="px-8 py-4 rounded-lg border-2 border-kura-accent text-kura-accent font-semibold hover:bg-kura-accent/10 transition-colors duration-300">
              View Documentation
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-20 md:py-32 px-4 sm:px-6">
      <div class="max-w-3xl mx-auto text-center space-y-8">
        <div class="space-y-4">
          <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-kura-primary to-kura-secondary bg-clip-text text-transparent">
            Enterprise-Grade Notarization, Made Simple
          </h2>
          <p class="text-lg text-kura-text-secondary">
            Transform how you verify and manage critical documents. Start building with Kura Notary today.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a href="https://app.kura-finance.com" target="_blank" rel="noopener noreferrer" 
             class="px-8 py-4 rounded-lg bg-gradient-to-r from-kura-primary to-kura-secondary text-white font-semibold hover:shadow-lg hover:shadow-kura-primary/50 transition-all duration-300">
            Get Started
          </a>
          <NuxtLink to="/about" class="px-8 py-4 rounded-lg border-2 border-kura-accent text-kura-accent font-semibold hover:bg-kura-accent/10 transition-colors duration-300">
            Learn More About Kura
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
