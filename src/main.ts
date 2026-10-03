import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import { spotlight } from './directives/spotlight'
import './style.css'

export const createApp = ViteSSG(App, { routes, scrollBehavior }, ({ app }) => {
  app.directive('spotlight', spotlight)
})
