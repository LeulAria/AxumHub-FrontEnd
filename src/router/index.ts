import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from '@/store'
import Api, { baseURL } from '@/api/Api'

// routes
import urlRoutes from './routes'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  ...urlRoutes,
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
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default router;
