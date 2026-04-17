# 🎨 Vue CSS 快速参考

## 已完成的工作 ✅

### 核心 CSS
- ✅ `css/globals.css` - 301 行完整样式表
- ✅ `postcss.config.mjs` - PostCSS 配置
- ✅ `tailwind.config.ts` - 扩展主题配置

### 配置文件
- ✅ `nuxt.config.ts` - CSS 路径已修正
- ✅ `package.json` - 依赖已更新
- ✅ `app.vue` - 根组件已创建

### 项目文件
- ✅ `layouts/default.vue` - 默认布局
- ✅ `components.d.ts` - 类型定义
- ✅ `.gitignore` - Git 规则
- ✅ `.nvmrc` - Node.js 版本

## 立即开始

```bash
# 1️⃣ 进入 Vue 目录
cd Vue

# 2️⃣ 安装依赖
npm install

# 3️⃣ 启动开发服务器
npm run dev

# 4️⃣ 在浏览器打开
# http://localhost:3000
```

## 常用 CSS 类

### 按钮
```html
<button class="btn-primary">主按钮</button>
<button class="btn-secondary">次按钮</button>
<button class="btn-outline">轮廓</button>
<button class="btn-ghost">幽灵</button>
```

### 卡片
```html
<div class="card">
  <h2 class="text-gradient">标题</h2>
  <p>内容</p>
</div>

<div class="card-elevated">
  升高的卡片
</div>
```

### 特效
```html
<div class="glass p-6">玻璃态</div>
<div class="glow-primary">紫色发光</div>
<div class="blur-bg">模糊背景</div>
```

### 动画
```html
<div class="animate-fade-in">淡入</div>
<div class="animate-slide-in-up">向上滑入</div>
<div class="animate-pulse-slow">缓慢脉冲</div>
```

### 文字
```html
<h1 class="text-gradient">渐变标题</h1>
```

## 颜色使用

```html
<!-- Tailwind 颜色 -->
<div class="bg-kura-primary">紫色背景</div>
<div class="bg-kura-secondary">蓝色背景</div>
<div class="bg-kura-background">暗背景</div>

<!-- CSS 变量 -->
<style>
  .custom {
    background: var(--color-primary);
    color: var(--color-foreground);
  }
</style>
```

## 构建命令

```bash
npm run dev      # 开发模式
npm run build    # 生产构建
npm run generate # 静态生成
npm run preview  # 预览生产版本
```

## 文件结构

```
Vue/
├── css/
│   └── globals.css           # 301 行完整样式
├── components/
│   └── Footer.vue            # 页脚组件
├── pages/
│   ├── index.vue             # 首页
│   └── about.vue             # 关于页
├── layouts/
│   └── default.vue           # 默认布局
├── app.vue                   # 根组件
├── nuxt.config.ts            # Nuxt 配置
├── tailwind.config.ts        # Tailwind 配置
├── postcss.config.mjs        # PostCSS 配置
└── package.json              # 依赖项
```

## 颜色代码

| 颜色 | 代码 |
|------|------|
| 主紫 | #8B5CF6 |
| 主蓝 | #3B82F6 |
| 背景 | #0B0B0F |
| 边框 | #2D2D35 |

---

**状态**: ✅ 完成  
**日期**: April 18, 2026  
**Ready**: 可以开始开发 🚀
