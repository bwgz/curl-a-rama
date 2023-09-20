import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArenaView from '../views/ArenaView.vue'
import OidcCallback from '../views/OidcCallback.vue'
import { vuexOidcCreateRouterMiddleware } from '../pinia-oidc/index.js'

import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/callback', // Needs to match redirectUri (redirect_uri if you use snake case) in you oidcSettings
      name: 'oidcCallback',
      component: OidcCallback
    },  
    {
      path: '/arena',
      name: 'arena',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ArenaView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(vuexOidcCreateRouterMiddleware(store, 'oidcStore'))

export default router
