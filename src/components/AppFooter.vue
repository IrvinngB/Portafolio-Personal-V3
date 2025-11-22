      class="fixed bottom-8 right-8 p-3 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 z-50 opacity-80 hover:opacity-100 scroll-top-btn"
    >
      <ChevronRight class="h-5 w-5 -rotate-90" />
    </button>
  </footer>
</template>

<script setup lang="ts">

import { 
  ChevronRight,
  Instagram,
  Mail,
  Linkedin,
  Github,
  Heart,
  Coffee
} from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { cvData } = useLanguage()

const currentYear = new Date().getFullYear()





const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  25% {
    transform: translateY(-10px) translateX(5px);
  }
  75% {
    transform: translateY(10px) translateX(-5px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 2s;
}

.scroll-top-btn {
  background-color: #3FA35B;
}

.scroll-top-btn:hover {
  background-color: #0A3D3D;
}
</style>