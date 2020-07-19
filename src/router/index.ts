import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from '@/store'
import Api, { baseURL } from '@/api/Api'
import User from '@/api/User'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/chatborad",
    name: "ChatBoard",
    component: () => import('@/components/chat/ChatBoard.vue'),
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: "/",
    name: "Login",
    component: () => import('@/views/Login.vue'),
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('@/views/Login.vue'),
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import('@/views/Signup.vue'),
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/qa",
    name: "QA",
    component: () => import('@/views/QA.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/chatspace",
    name: "ChatSpace",
    component: () => import('@/views/ChatSpace.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import('@/views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import('@/views/Logout.vue'),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// Auth Guard
router.beforeEach((to, form, next) => {
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'Login'
      });
    } else {
      next()
    }
  } else if (to.matched.some((record: any) => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'Dashboard'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

Api.interceptors.request.use(
  (config) => {
    const token = store.getters.accessToken;
    if (token) {
      config.headers['Authorization'] = token;
      console.log('req: ', config.headers);
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default router;
