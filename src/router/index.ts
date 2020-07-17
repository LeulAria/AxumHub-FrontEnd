import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('@/views/Login.vue')
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import('@/views/Signup.vue')
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import('@/views/Logout.vue')
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
