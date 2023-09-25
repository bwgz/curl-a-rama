import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginCallbackView from "../views/LoginCallbackView.vue";
import { useUser } from "../store";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/callback", // Needs to match redirectUri (redirect_uri if you use snake case) in you oidcSettings
            name: "loginCallback",
            component: LoginCallbackView,
        },
        {
            path: "/arena",
            name: "arena",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/ArenaView.vue"),
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/AboutView.vue"),
            meta: {
                authRequired: "true",
            },
        },
        {
          path: "/settings",
          name: "settings",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/SettingsView.vue"),
          meta: {
              authRequired: "true",
          },
      },
  ],
});

router.beforeEach((to, from, next) => {
    const { profile } = useUser();

    if (to.meta.authRequired !== "true") {
        return next();
    } else {
        if (profile) {
            return next();
        } else {
            router.push({
                name: "home",
            });
        }
    }
});

export default router;
