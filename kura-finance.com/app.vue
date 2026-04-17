<template>
  <div class="min-h-screen bg-[#0B0B0F] text-white">
    <!-- Background Ambient Glows -->
    <div class="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8B5CF6]/10 blur-[120px] rounded-full pointer-events-none z-0" />
    <div class="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#3B82F6]/10 blur-[120px] rounded-full pointer-events-none z-0" />

    <!-- Content -->
    <div class="relative z-10">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en'
  }
});
</script>
