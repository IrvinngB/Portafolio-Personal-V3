<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" @click="$emit('close')">
    <div class="relative max-w-2xl mx-auto px-4" @click.stop>
      <!-- Close button -->
      <button 
        @click="$emit('close')"
        class="absolute -top-12 right-0 text-white hover:text-green-400 transition-colors z-10"
        aria-label="Close easter egg"
      >
        <X class="h-8 w-8" />
      </button>

      <!-- Matrix rain animation -->
      <div class="bg-gradient-to-br from-green-900 to-black rounded-lg p-8 border-2 border-green-400 overflow-hidden">
        <div class="matrix-rain mb-6">
          <div v-for="i in 12" :key="i" class="matrix-char">{{ getRandomChar() }}</div>
        </div>
            
        <div class="text-center">
          <h2 class="text-3xl font-bold text-green-400 mb-4 font-mono" style="text-shadow: 0 0 10px rgba(74, 222, 128, 0.5);">
            ¡ACCESO CONCEDIDO!
          </h2>
          <p class="text-green-300 mb-4 font-mono text-sm leading-relaxed">
            ¡Hey! Encontraste mi easter egg secreto<br>
            Veo que te gusta explorar tanto como a mí programar.<br>
            <br>
            Soy Irvin, un desarrollador que ama crear experiencias<br>
            digitales increíbles con código limpio y animaciones fluidas ✨<br>
            <br>
            <span class="text-green-400">Curiosidad Level: {{ optimizationLevel }}% ✓</span><br>
            <span class="text-green-400">Easter Eggs Found: 1/1 </span>
          </p>
          
          <div class="grid grid-cols-3 gap-2 mb-6">
            <div v-for="item in ['Curioso', 'Explorador', 'Genial']" :key="item" 
              class="bg-green-400/20 border border-green-400 rounded px-2 py-1 text-xs text-green-300">
              {{ item }}
            </div>
          </div>
          
          <button 
            @click="$emit('close')"
            class="px-6 py-2 bg-green-400 text-black font-bold rounded hover:bg-green-300 transition-all"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'

const optimizationLevel = ref(Math.floor(Math.random() * (99 - 85)) + 85)

const getRandomChar = () => {
  const chars = '01アイウエオカキク∆ño'
  return chars[Math.floor(Math.random() * chars.length)]
}
</script>

<style scoped>
.matrix-rain {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 8px;
  margin-bottom: 24px;
  animation: rain-fall 3s ease-in-out infinite;
}

.matrix-char {
  font-size: 20px;
  font-weight: bold;
  color: #4ade80;
  text-align: center;
  font-family: monospace;
  text-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
  animation: glow-pulse 1s ease-in-out infinite;
}

@keyframes rain-fall {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

@keyframes glow-pulse {
  0%, 100% { text-shadow: 0 0 10px rgba(74, 222, 128, 0.5); }
  50% { text-shadow: 0 0 20px rgba(74, 222, 128, 0.8); }
}
</style>
