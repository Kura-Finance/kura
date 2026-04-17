# Kura Finance - Brand Website (Nuxt)

This is the **brand website** portion of Kura Finance, built with Nuxt 3 and Vue 3.

## 📋 What's Here

- **About Page** - Company information and mission
- **Footer** - Global footer with links and social media
- **Home Page** - Public landing page

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Runs the dev server at `http://localhost:3000` (or another available port).

### Build

```bash
npm run build
```

### Generate Static Site

```bash
npm run generate
```

## 📁 Project Structure

```
Vue/
├── pages/                  # Nuxt pages
│   ├── index.vue          # Home page
│   └── about.vue          # About page
├── components/             # Reusable components
│   └── Footer.vue         # Global footer
├── assets/                 # Static assets
│   └── css/               # Global styles
├── nuxt.config.ts         # Nuxt configuration
├── tailwind.config.ts     # Tailwind CSS config
└── package.json           # Dependencies
```

## 🎨 Styling

This project uses **Tailwind CSS** for styling. All components use the same color scheme as the React app:

- Primary: `#8B5CF6` (Purple)
- Secondary: `#3B82F6` (Blue)
- Background: `#0B0B0F` (Dark)

## 🔗 Linking to React App

To link to the main dashboard:

```vue
<NuxtLink to="https://app.kura-finance.com/dashboard">
  Open Dashboard
</NuxtLink>
```

Or use environment variables:

```vue
<NuxtLink :to="`${$config.public.appUrl}/dashboard`">
  Open Dashboard
</NuxtLink>
```

## 📦 Deployment

### Static Hosting (Recommended)

```bash
npm run generate
# Deploy the `dist` folder to Netlify, Vercel, or similar
```

### Server Deployment

```bash
npm run build
npm run preview
```

Then deploy with your preferred hosting (Cloud Run, Heroku, etc.)

## 🔒 Environment Variables

Create `.env.local`:

```
VITE_APP_URL=https://app.kura-finance.com
```

## 📚 Resources

- [Nuxt Documentation](https://nuxt.com)
- [Vue Documentation](https://vuejs.org)
- [Tailwind CSS](https://tailwindcss.com)

---

**Part of**: Kura Finance - Dual Application Architecture
**See**: `../ARCHITECTURE_SEPARATION.md` for full architecture details
