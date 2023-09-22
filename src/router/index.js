import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArenaView from '../views/ArenaView.vue'
import LoginCallbackView from '../views/LoginCallbackView.vue'

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
      name: 'loginCallback',
      component: LoginCallbackView
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

//router.beforeEach(vuexOidcCreateRouterMiddleware(store, 'oidc'))


router.beforeEach((to) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too

})

export default router
