<template>
  <main>
    <!-- Page Header -->
    <section class="py-20 px-4 bg-gradient-to-b from-purple-600/10 to-transparent">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-6">聯絡我們</h1>
        <p class="text-xl text-gray-300">
          有任何問題或想開始一個項目？我們很樂意聽聽您的想法。
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div>
          <h2 class="text-3xl font-bold mb-8">發送訊息</h2>

          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Name -->
            <div>
              <label class="block text-sm font-semibold mb-2">名字</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="您的名字"
                class="w-full px-4 py-3 bg-slate-800 border border-purple-500/20 rounded-lg focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 transition"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-semibold mb-2">郵箱</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="您的郵箱"
                class="w-full px-4 py-3 bg-slate-800 border border-purple-500/20 rounded-lg focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 transition"
              />
            </div>

            <!-- Subject -->
            <div>
              <label class="block text-sm font-semibold mb-2">主題</label>
              <input
                v-model="form.subject"
                type="text"
                placeholder="訊息主題"
                class="w-full px-4 py-3 bg-slate-800 border border-purple-500/20 rounded-lg focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 transition"
              />
            </div>

            <!-- Message -->
            <div>
              <label class="block text-sm font-semibold mb-2">訊息</label>
              <textarea
                v-model="form.message"
                placeholder="您的訊息..."
                rows="6"
                class="w-full px-4 py-3 bg-slate-800 border border-purple-500/20 rounded-lg focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 transition resize-none"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <UButton
              type="submit"
              size="lg"
              color="purple"
              variant="solid"
              class="w-full"
              :loading="isSubmitting"
            >
              {{ isSubmitting ? '發送中...' : '發送訊息' }}
            </UButton>

            <!-- Success Message -->
            <div v-if="submitSuccess" class="bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg p-4">
              感謝您的訊息！我們會盡快回覆。
            </div>
          </form>
        </div>

        <!-- Contact Information -->
        <div>
          <h2 class="text-3xl font-bold mb-8">聯絡資訊</h2>

          <div class="space-y-8">
            <!-- Email -->
            <div class="flex gap-4">
              <div class="text-3xl">📧</div>
              <div>
                <h3 class="font-bold text-lg mb-2">郵箱</h3>
                <a href="mailto:hello@kura.io" class="text-purple-400 hover:text-purple-300 transition">
                  hello@kura.io
                </a>
              </div>
            </div>

            <!-- Phone -->
            <div class="flex gap-4">
              <div class="text-3xl">📞</div>
              <div>
                <h3 class="font-bold text-lg mb-2">電話</h3>
                <a href="tel:+886-1234-5678" class="text-purple-400 hover:text-purple-300 transition">
                  +886 (1234) 5678
                </a>
              </div>
            </div>

            <!-- Address -->
            <div class="flex gap-4">
              <div class="text-3xl">📍</div>
              <div>
                <h3 class="font-bold text-lg mb-2">地址</h3>
                <p class="text-gray-300">
                  台北市信義區<br />
                  100 台灣
                </p>
              </div>
            </div>

            <!-- Hours -->
            <div class="flex gap-4">
              <div class="text-3xl">🕐</div>
              <div>
                <h3 class="font-bold text-lg mb-2">營業時間</h3>
                <p class="text-gray-300">
                  週一至週五: 9:00 AM - 6:00 PM<br />
                  週末: 休息
                </p>
              </div>
            </div>

            <!-- Social Links -->
            <div>
              <h3 class="font-bold text-lg mb-4">追蹤我們</h3>
              <div class="flex gap-4">
                <a href="#" class="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center hover:bg-purple-600/40 transition">
                  f
                </a>
                <a href="#" class="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center hover:bg-purple-600/40 transition">
                  𝕏
                </a>
                <a href="#" class="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center hover:bg-purple-600/40 transition">
                  in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQs Section -->
    <section class="py-20 px-4 bg-slate-800/50">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-12">常見問題</h2>

        <div class="space-y-4">
          <UAccordion
            :items="faqs"
            size="lg"
            class="bg-transparent"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const faqs = [
  {
    label: '您的典型項目時間是多長？',
    content: '項目時間根據複雜性而異。小型項目通常需要 2-4 週，中型項目 1-3 個月，大型項目可能需要 3-6 個月或更長。'
  },
  {
    label: '您使用哪些技術？',
    content: '我們使用最新的前端框架（Vue、React、Svelte）、後端技術（Node.js、Python）和現代開發工具。我們會根據項目需求選擇最適合的技術棧。'
  },
  {
    label: '您提供售後支持嗎？',
    content: '是的！我們提供項目完成後的 30 天免費支持期，以及可選的長期維護和支持合同。'
  },
  {
    label: '如何開始合作？',
    content: '首先聯絡我們討論您的項目需求。我們會進行初步諮詢，然後提供報價和項目計劃。一切就緒後，我們就可以開始了！'
  },
  {
    label: '您是否為遠端客戶工作？',
    content: '當然！我們與世界各地的客戶合作。我們使用現代溝通工具確保項目進度透明。'
  }
]

const submitForm = async () => {
  isSubmitting.value = true
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1000))
  isSubmitting.value = false
  submitSuccess.value = true

  // Reset form
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''

  // Hide success message after 3 seconds
  setTimeout(() => {
    submitSuccess.value = false
  }, 3000)
}
</script>
