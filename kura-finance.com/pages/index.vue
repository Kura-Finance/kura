<script setup lang="ts">
definePageMeta({
  layout: 'default'
});
</script>

<template>
  <div class="min-h-screen bg-kura-background text-white">
    <!-- Background Ambient Glows -->
    <div class="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-kura-primary/10 blur-[150px] rounded-full pointer-events-none z-0" />
    <div class="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-kura-secondary/10 blur-[150px] rounded-full pointer-events-none z-0" />

    <!-- Content -->
    <div class="relative z-10">
      <!-- Header -->
      <Header />

      <!-- Hero Section -->
      <HeroSection />

      <!-- Features Section -->
      <FeaturesSection />

      <!-- CTA Section Before Footer -->
      <section class="w-full px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
        <div class="max-w-5xl mx-auto">
          <div class="rounded-3xl border border-kura-primary/30 bg-gradient-to-br from-kura-primary/10 to-kura-secondary/10 backdrop-blur-xl p-12 md:p-16 text-center relative overflow-hidden">
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-kura-primary/20 via-transparent to-transparent pointer-events-none" />
            
            <div class="relative z-10">
              <h2 class="text-4xl md:text-5xl font-black mb-6">Ready to Unify Your Finances?</h2>
              <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Join elite users who trust Kura Finance to aggregate, track, and visualize their entire financial universe.
              </p>
              
              <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="https://app.kura-finance.com" target="_blank" rel="noopener noreferrer" class="px-8 py-4 bg-gradient-to-r from-kura-primary to-kura-secondary rounded-lg font-bold text-white hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center">
                  Launch App Now
                </a>
                <button class="px-8 py-4 border-2 border-kura-primary/50 rounded-lg font-bold text-white hover:bg-kura-primary/10 hover:border-kura-primary transition-all duration-300 w-full sm:w-auto">
                  Schedule Enterprise Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>
