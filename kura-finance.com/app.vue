<template>
  <div class="min-h-screen bg-kura-background text-white">
    <!-- Background Ambient Glows -->
    <div class="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-kura-primary/10 blur-[150px] rounded-full pointer-events-none z-0" />
    <div class="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-kura-secondary/10 blur-[150px] rounded-full pointer-events-none z-0" />

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
