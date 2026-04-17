<template>
  <nav class="sticky top-0 z-50 backdrop-blur-md bg-[#0B0B0F]/80 border-b border-[#8B5CF6]/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] rounded-lg flex items-center justify-center font-bold text-sm">
            K
          </div>
          <span class="text-xl font-bold hidden sm:inline bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
            Kura Finance
          </span>
        </NuxtLink>

        <!-- Navigation Links -->
        <div class="hidden md:flex gap-8">
          <NuxtLink
            to="/"
            class="text-gray-300 hover:text-[#A78BFA] transition-colors duration-200"
            active-class="text-[#8B5CF6]"
          >
            首頁
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="text-gray-300 hover:text-[#A78BFA] transition-colors duration-200"
            active-class="text-[#8B5CF6]"
          >
            關於我們
          </NuxtLink>
          <NuxtLink
            to="/portfolio"
            class="text-gray-300 hover:text-[#A78BFA] transition-colors duration-200"
            active-class="text-[#8B5CF6]"
          >
            產品
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="text-gray-300 hover:text-[#A78BFA] transition-colors duration-200"
            active-class="text-[#8B5CF6]"
          >
            聯絡我們
          </NuxtLink>
        </div>

        <!-- CTA Button -->
        <NuxtLink
          to="/contact"
          class="hidden sm:block px-6 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] rounded-lg font-semibold transition-shadow duration-200 text-white no-underline"
        >
          開始合作
        </NuxtLink>

        <!-- Mobile Menu -->
        <button class="md:hidden text-[#A78BFA] hover:text-[#8B5CF6]">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>
