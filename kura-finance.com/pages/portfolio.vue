<template>
  <main>
    <!-- Page Header -->
    <section class="py-20 px-4 bg-gradient-to-b from-purple-600/10 to-transparent">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-6">我們的作品集</h1>
        <p class="text-xl text-gray-300">
          展示我們完成的精選項目和成功案例
        </p>
      </div>
    </section>

    <!-- Filter Tabs -->
    <section class="py-12 px-4 sticky top-16 bg-slate-900/50 backdrop-blur border-b border-purple-500/20">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-wrap gap-4 justify-center">
          <UButton
            v-for="category in categories"
            :key="category"
            :color="activeCategory === category ? 'purple' : 'gray'"
            variant="outline"
            @click="activeCategory = category"
          >
            {{ category }}
          </UButton>
        </div>
      </div>
    </section>

    <!-- Portfolio Grid -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="group cursor-pointer"
          >
            <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition h-64 mb-4 flex items-center justify-center">
              <div class="text-6xl">{{ project.icon }}</div>
            </div>
            <h3 class="text-2xl font-bold mb-2">{{ project.name }}</h3>
            <p class="text-gray-400 mb-3">{{ project.description }}</p>
            <div class="flex gap-2 flex-wrap">
              <UBadge
                v-for="tech in project.technologies"
                :key="tech"
                color="purple"
                variant="subtle"
              >
                {{ tech }}
              </UBadge>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 bg-slate-800/50">
      <div class="max-w-4xl mx-auto bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-12 text-center border border-purple-500/30">
        <h2 class="text-4xl font-bold mb-6">想要類似的項目？</h2>
        <p class="text-xl text-gray-300 mb-8">
          我們可以幫助您從概念到完成。讓我們開始您的下一個項目。
        </p>
        <UButton
          to="/contact"
          size="lg"
          color="purple"
          variant="solid"
        >
          聯絡我們開始
        </UButton>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const categories = ['全部', '品牌', 'Web', '應用']
const activeCategory = ref('全部')

const projects = [
  {
    id: 1,
    name: 'TechStart 品牌重塑',
    category: '品牌',
    description: '為科技初創公司完成完整的品牌識別系統',
    technologies: ['品牌策略', 'UI設計', '平面設計'],
    icon: '🎨'
  },
  {
    id: 2,
    name: 'EcoShop 電商平台',
    category: 'Web',
    description: '開發高性能的電商平台，支持實時庫存管理',
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL'],
    icon: '🛒'
  },
  {
    id: 3,
    name: 'FitFlow 健身應用',
    category: '應用',
    description: '打造跨平台健身跟蹤應用，集成AI教練功能',
    technologies: ['React Native', 'Firebase', 'ML'],
    icon: '💪'
  },
  {
    id: 4,
    name: 'DataViz 數據可視化',
    category: 'Web',
    description: '為企業客戶構建實時數據儀表板',
    technologies: ['D3.js', 'React', 'WebSocket'],
    icon: '📊'
  },
  {
    id: 5,
    name: 'CloudSync 企業軟件',
    category: '應用',
    description: '開發跨平台協作工具，支持實時同步',
    technologies: ['Electron', 'Node.js', 'WebRTC'],
    icon: '☁️'
  },
  {
    id: 6,
    name: 'DesignOps 設計系統',
    category: '品牌',
    description: '構建完整的設計系統和組件庫',
    technologies: ['Storybook', 'CSS-in-JS', 'Figma'],
    icon: '🎯'
  }
]

const filteredProjects = computed(() => {
  if (activeCategory.value === '全部') {
    return projects
  }
  return projects.filter(p => p.category === activeCategory.value)
})
</script>
