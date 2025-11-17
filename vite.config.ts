import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap-core': ['gsap'],
          'gsap-plugins': ['gsap/ScrollTrigger', 'gsap/all'],
          'vendor': ['vue'],
          'icons': ['lucide-vue-next']
        }
      }
    },
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
