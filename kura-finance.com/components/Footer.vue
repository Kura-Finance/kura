<template>
  <footer class="bg-slate-900/50 border-t border-purple-500/20 mt-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center font-bold">
              K
            </div>
            <span class="text-xl font-bold">Kura</span>
          </div>
          <p class="text-gray-400 text-sm">
            為您打造卓越的數位體驗
          </p>
        </div>

        <!-- 產品 -->
        <div>
          <h3 class="font-semibold mb-4">產品</h3>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a href="#" class="hover:text-purple-400 transition">設計服務</a></li>
            <li><a href="#" class="hover:text-purple-400 transition">開發</a></li>
            <li><a href="#" class="hover:text-purple-400 transition">諮詢</a></li>
          </ul>
        </div>

        <!-- 公司 -->
        <div>
          <h3 class="font-semibold mb-4">公司</h3>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><NuxtLink to="/about" class="hover:text-purple-400 transition">關於</NuxtLink></li>
            <li><NuxtLink to="/portfolio" class="hover:text-purple-400 transition">作品</NuxtLink></li>
            <li><a href="#" class="hover:text-purple-400 transition">部落格</a></li>
          </ul>
        </div>

        <!-- 聯絡 -->
        <div>
          <h3 class="font-semibold mb-4">聯絡</h3>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a href="mailto:hello@kura.io" class="hover:text-purple-400 transition">hello@kura.io</a></li>
            <li><a href="tel:+886-1234-5678" class="hover:text-purple-400 transition">+886-1234-5678</a></li>
            <li><NuxtLink to="/contact" class="hover:text-purple-400 transition">聯絡表單</NuxtLink></li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-purple-500/20 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2024 Kura. 版權所有。</p>
          <div class="flex gap-6 mt-4 md:mt-0">
            <a href="#" class="hover:text-purple-400 transition">隱私政策</a>
            <a href="#" class="hover:text-purple-400 transition">使用條款</a>
            <a href="#" class="hover:text-purple-400 transition">社交媒體</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
