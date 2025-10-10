import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGSAP() {
  const timeline = ref<gsap.core.Timeline | null>(null)

  onMounted(() => {
    // Hero animations
    gsap.fromTo('.hero-content', {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    })

    gsap.fromTo('.hero-image', {
      opacity: 0,
      scale: 0.8
    }, {
      opacity: 1,
      scale: 1,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    })

    // Section animations
    gsap.utils.toArray('.section').forEach((section: any) => {
      gsap.fromTo(section, {
        opacity: 0,
        y: 100
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    // Card animations
    gsap.utils.toArray('.card').forEach((card: any, index: number) => {
      gsap.fromTo(card, {
        opacity: 0,
        y: 50,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    // Skills animation
    gsap.utils.toArray('.skill-item').forEach((skill: any, index: number) => {
      gsap.fromTo(skill, {
        opacity: 0,
        x: -50
      }, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: index * 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: skill,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    // Floating animation for hero image
    gsap.to('.hero-image', {
      y: -20,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1
    })

    // Parallax effect for background elements
    gsap.utils.toArray('.parallax').forEach((element: any) => {
      gsap.to(element, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    })
  })

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    if (timeline.value) {
      timeline.value.kill()
    }
  })

  const animateIn = (element: string | Element, options = {}) => {
    return gsap.fromTo(element, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', ...options }
    )
  }

  const animateOut = (element: string | Element, options = {}) => {
    return gsap.to(element, 
      { opacity: 0, y: -30, duration: 0.5, ease: 'power3.in', ...options }
    )
  }

  const staggerIn = (elements: string | Element[], options = {}) => {
    return gsap.fromTo(elements,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', ...options }
    )
  }

  return {
    timeline,
    animateIn,
    animateOut,
    staggerIn
  }
}