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

    // Không preload particles/swiper chunk — để thực sự lazy-load sau LCP
    modulePreload: {
      resolveDependencies: (_url, deps) =>
        deps.filter(dep =>
          !dep.includes('particles') &&
          !dep.includes('swiper')
        ),
    },

    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return;
          // Particles → chunk riêng, lazy-loaded sau idle
          if (id.includes('@tsparticles') || id.includes('/tsparticles')) return 'vendor-particles';
          // Dỡ bỏ ép chunk 'vendor-framer' để Rollup kích hoạt thuật toán Tree-shaking độc lập, giúp loại bỏ 22KB code thừa mà Lighthouse cảnh báo. 
          // Swiper → chỉ load trên desktop
          if (id.includes('/swiper/')) return 'vendor-swiper';
          // React core → luôn cần
          if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/scheduler/')) return 'vendor-react';
          // Misc utilities
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

