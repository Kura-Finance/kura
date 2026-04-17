<template>
  <main>
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center px-4 py-20">
      <div class="max-w-4xl mx-auto text-center">
        <div class="mb-6 inline-block">
          <UBadge color="purple" variant="subtle">
            🚀 歡迎來到 Kura
          </UBadge>
        </div>

        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          打造卓越的數位體驗
        </h1>

        <p class="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          我們是一支專業的設計和開發團隊，致力於為您的品牌創造引人注目的數位解決方案。
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton
            to="/portfolio"
            size="lg"
            color="purple"
            variant="solid"
            class="w-full sm:w-auto"
          >
            查看我們的作品
          </UButton>
          <UButton
            to="/contact"
            size="lg"
            color="white"
            variant="outline"
            class="w-full sm:w-auto"
          >
            開始您的項目
          </UButton>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-20 px-4 bg-slate-800/50">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16">我們的服務</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Service 1 -->
          <div class="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition">
            <div class="text-4xl mb-4">🎨</div>
            <h3 class="text-2xl font-bold mb-4">品牌設計</h3>
            <p class="text-gray-400">
              從標誌設計到完整的品牌識別系統，我們幫助您建立強大的品牌形象。
            </p>
          </div>

          <!-- Service 2 -->
          <div class="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition">
            <div class="text-4xl mb-4">💻</div>
            <h3 class="text-2xl font-bold mb-4">Web 開發</h3>
            <p class="text-gray-400">
              現代化、高性能的網站開發，使用最新技術確保最佳用戶體驗。
            </p>
          </div>

          <!-- Service 3 -->
          <div class="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition">
            <div class="text-4xl mb-4">📱</div>
            <h3 class="text-2xl font-bold mb-4">應用開發</h3>
            <p class="text-gray-400">
              打造跨平台的移動應用，為您的用戶提供無縫的體驗。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4">
      <div class="max-w-4xl mx-auto bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-12 text-center border border-purple-500/30">
        <h2 class="text-4xl font-bold mb-6">準備好開始了嗎？</h2>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          與我們聯絡，討論您的項目需求。我們很樂意幫助您實現您的願景。
        </p>
        <UButton
          to="/contact"
          size="lg"
          color="purple"
          variant="solid"
        >
          聯絡我們
        </UButton>
      </div>
    </section>
  </main>
</template>
