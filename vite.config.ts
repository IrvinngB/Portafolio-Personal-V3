import { defineConfig } from 'vite'
import type {} from 'vite-ssg'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  build: {
    minify: 'terser',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    reportCompressedSize: true
  },

  optimizeDeps: {
    include: ['gsap', 'vue', 'lucide-vue-next']
  },

  ssgOptions: {
    // /freelance/index.html works on any static host without rewrite rules
    dirStyle: 'nested',
  },

  server: {
    port: 3000,
    open: true
  }
})

