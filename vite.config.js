import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/portfolio/' : '/',
  plugins: [react()],
  build: {
    // ESNext → output nhỏ nhất, không polyfill cũ
    target: 'esnext',
    minify: 'esbuild',
    chunkSizeWarningLimit: 800,
    cssCodeSplit: true,
    reportCompressedSize: false,

    // Không preload particles/swiper/chatbot chunk — để thực sự lazy-load sau LCP
    modulePreload: {
      resolveDependencies: (_url, deps) =>
        deps.filter(dep =>
          !dep.includes('particles') &&
          !dep.includes('swiper') &&
          !dep.includes('chatbot') &&
          !dep.includes('ChatBot') &&
          !dep.includes('Experience') &&
          !dep.includes('Projects')
        ),
    },

    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: (id) => {
          // ── App-level code splitting ──────────────────────────────────────
          if (!id.includes('node_modules')) {
            // ChatBot: 22KB + KB data → chunk riêng, chỉ fetch khi user click
            if (id.includes('/ChatBot')) return 'app-chatbot';
            // Experience + Projects cùng chunk → 2 sections nặng nhất
            if (id.includes('/Experience') || id.includes('/Projects') || id.includes('/ScrollableGrid'))
              return 'app-sections';
            // Skills + Contact + Footer → chunk nhẹ
            if (id.includes('/Skills') || id.includes('/Contact') || id.includes('/Footer'))
              return 'app-below-fold';
            return; // Hero, Navbar, hooks → vào index.js (nhỏ sau khi split)
          }

          // ── Vendor code splitting ─────────────────────────────────────────
          // Particles → chunk riêng, lazy-loaded sau idle
          if (id.includes('@tsparticles') || id.includes('/tsparticles')) return 'vendor-particles';
          // Swiper → chỉ load trên desktop
          if (id.includes('/swiper/')) return 'vendor-swiper';
          // React core → luôn cần
          if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/scheduler/')) return 'vendor-react';
          // Framer motion → dùng ở nhiều nơi, tách riêng để cache tốt hơn
          if (id.includes('framer-motion')) return 'vendor-framer';
          // Misc utilities (typewriter, TagCloud, react-icons)
          if (id.includes('TagCloud') || id.includes('typewriter-effect') || id.includes('react-icons')) return 'vendor-misc';
        },
      }
    }
  },

  server: {
    warmup: {
      clientFiles: ['./src/App.jsx', './src/index.css'],
    }
  }
})
