import type { RouteRecordRaw, RouterScrollBehavior } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('./pages/HomePage.vue') },
  { path: '/freelance', name: 'freelance', component: () => import('./pages/FreelancePage.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const HEADER_OFFSET = 90

// Sections on the home page are async components, so wait for the target to exist
const waitForElement = (selector: string, timeout = 1500) =>
  new Promise<Element | null>((resolve) => {
    const start = performance.now()
    const check = () => {
      const el = document.querySelector(selector)
      if (el || performance.now() - start > timeout) return resolve(el)
      requestAnimationFrame(check)
    }
    check()
  })

export const scrollBehavior: RouterScrollBehavior = async (to, from, savedPosition) => {
  if (savedPosition) return savedPosition
  if (to.hash) {
    const el = await waitForElement(to.hash)
    if (el) return { el: to.hash, top: HEADER_OFFSET, behavior: from.path === to.path ? 'smooth' : 'auto' }
  }
  return { top: 0 }
}
