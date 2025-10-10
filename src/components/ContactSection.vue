<template>
  <section id="contact" class="section py-20 text-white relative overflow-hidden" style="background: linear-gradient(135deg, #0A3D3D 0%, #3FA35B 100%);">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">{{ t.getInTouch }}</h2>
        <p class="text-xl max-w-2xl mx-auto" style="color: #B4D333;">
          {{ t.contactDescription }}
        </p>
        <div class="w-24 h-1 mx-auto mt-4" style="background-color: #C5D946;"></div>
      </div>

      <div class="max-w-4xl mx-auto">
        <!-- Contact Info -->
        <div class="card bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <h3 class="text-2xl font-bold mb-6">Información de Contacto</h3>
          
          <div class="grid md:grid-cols-2 gap-4">
            <a
              :href="`mailto:${cvData.email}`"
              class="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
            >
              <div class="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                <Mail class="h-6 w-6" />
              </div>
              <div>
                <div class="font-medium">Email</div>
                <div class="text-blue-100">{{ cvData.email }}</div>
              </div>
            </a>

           

            <a
              v-if="cvData.linkedin"
              :href="cvData.linkedin"
              target="_blank"
              class="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
            >
              <div class="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                <Linkedin class="h-6 w-6" />
              </div>
              <div>
                <div class="font-medium">LinkedIn</div>
                <div class="text-blue-100">Ver Perfil</div>
              </div>
            </a>

            <a
              href="https://github.com/IrvinngB"
              target="_blank"
              class="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
            >
              <div class="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                <Github class="h-6 w-6" />
              </div>
              <div>
                <div class="font-medium">GitHub</div>
                <div class="text-blue-100">Ver Repositorios</div>
              </div>
            </a>

            <a
              href="https://www.instagram.com/_irvin.gg/?igsh=dm9waHk2bmdzYmYy"
              target="_blank"
              class="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
            >
              <div class="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                <Instagram class="h-6 w-6" />
              </div>
              <div>
                <div class="font-medium">Instagram</div>
                <div class="text-blue-100">@_irvin.gg</div>
              </div>
            </a>
          </div>

         
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Mail, Linkedin, Instagram, Github } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { t, cvData } = useLanguage()
</script>