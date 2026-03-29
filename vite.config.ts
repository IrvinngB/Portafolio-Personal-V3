import { defineConfig } from 'vite'
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

  server: {
    port: 3000,
    open: true
  }
})

