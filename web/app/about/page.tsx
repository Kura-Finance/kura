'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      {/* Header with back button */}
      <header className="fixed top-0 w-full border-b border-[#1A1A24] bg-[#0B0B0F]/80 backdrop-blur-md z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="p-2 hover:bg-[#1A1A24] rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">About Kura</h1>
        </div>
      </header>

      {/* Main content */}
      <motion.main
        className="pt-24 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <motion.section
            className="mb-20"
            variants={itemVariants}
          >
            <div className="rounded-3xl border border-[#1A1A24] bg-gradient-to-br from-[#1A1A24]/40 to-[#0B0B0F]/40 backdrop-blur-xl p-12 text-center">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
                Your Financial Nexus
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Kura is revolutionizing personal finance by seamlessly bridging traditional and decentralized finance. Manage all your financial assets in one powerful, intuitive platform.
              </p>
            </div>
          </motion.section>

          {/* Mission Section */}
          <motion.section
            className="mb-20"
            variants={itemVariants}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-[#1A1A24] bg-gradient-to-br from-[#1A1A24]/40 to-[#0B0B0F]/40 backdrop-blur-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-[#8B5CF6]">Our Mission</h3>
                <p className="text-gray-400 leading-relaxed">
                  We believe that managing your finances shouldn&apos;t require juggling multiple apps and platforms. Our mission is to create a unified ecosystem where you can seamlessly manage, track, and grow your wealth—whether it&apos;s traditional investments, cryptocurrencies, or decentralized finance protocols.
                </p>
              </div>

              <div className="rounded-2xl border border-[#1A1A24] bg-gradient-to-br from-[#1A1A24]/40 to-[#0B0B0F]/40 backdrop-blur-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-[#A78BFA]">Our Vision</h3>
                <p className="text-gray-400 leading-relaxed">
                  We envision a future where financial freedom is accessible to everyone. By combining the stability of traditional finance with the innovation of Web3, we&apos;re building the financial operating system for the next generation of users.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            className="mb-20"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold mb-8">Why Choose Kura?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Unified Dashboard',
                  description: 'View all your financial assets in one place—stocks, crypto, savings, and more.',
                  icon: '📊',
                },
                {
                  title: 'Smart Analytics',
                  description: 'Get AI-powered insights and recommendations to optimize your financial strategy.',
                  icon: '🧠',
                },
                {
                  title: 'Cross-Chain Support',
                  description: 'Seamlessly manage assets across multiple blockchains and traditional financial networks.',
                  icon: '🔗',
                },
                {
                  title: 'Bank-Level Security',
                  description: 'Your assets are protected with enterprise-grade encryption and security protocols.',
                  icon: '🔒',
                },
                {
                  title: 'Real-Time Tracking',
                  description: 'Monitor your portfolio performance and market movements in real-time.',
                  icon: '⚡',
                },
                {
                  title: 'Easy Integration',
                  description: 'Connect your existing investment accounts and wallets with just a few clicks.',
                  icon: '🔌',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="rounded-2xl border border-[#1A1A24] bg-gradient-to-br from-[#1A1A24]/40 to-[#0B0B0F]/40 backdrop-blur-xl p-6 hover:border-[#8B5CF6]/30 transition-colors"
                  variants={itemVariants}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Technology Section */}
          <motion.section
            className="mb-20"
            variants={itemVariants}
          >
            <div className="rounded-2xl border border-[#1A1A24] bg-gradient-to-br from-[#1A1A24]/40 to-[#0B0B0F]/40 backdrop-blur-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-[#8B5CF6]">Built With Modern Tech</h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-400">
                <div>
                  <p className="font-semibold text-white mb-2">Frontend & Web3</p>
                  <p className="text-sm">Next.js 16, React 19, Wagmi, Web3Modal, Tailwind CSS, Framer Motion</p>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">Backend & Infrastructure</p>
                  <p className="text-sm">Firebase, Cloud Run, Plaid API, Ethereum & Multi-Chain Support</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            className="mb-20"
            variants={itemVariants}
          >
            <div className="rounded-3xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#8B5CF6]/10 to-[#0B0B0F]/40 backdrop-blur-xl p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Ready to Take Control?</h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already managing their complete financial portfolio with Kura.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/dashboard"
                  className="px-8 py-3 bg-[#8B5CF6] text-white font-semibold rounded-xl hover:bg-[#A78BFA] transition-colors shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                >
                  Open Dashboard
                </Link>
                <Link
                  href="/"
                  className="px-8 py-3 bg-[#1A1A24] border border-white/5 text-gray-400 font-semibold rounded-xl hover:border-white/10 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Footer Info */}
          <motion.footer
            className="pt-12 border-t border-[#1A1A24] text-center text-gray-500 text-sm"
            variants={itemVariants}
          >
            <p>© 2026 Kura Finance. All rights reserved. Bridging TradFi and DeFi.</p>
          </motion.footer>
        </div>
      </motion.main>
    </div>
  );
}
