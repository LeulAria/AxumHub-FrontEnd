export default [
  {
    path: "/",
    name: "Home",
    component: () => import('@/views/Home.vue'),
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
    path: "/settings",
    name: "Settings",
    component: () => import('@/views/Settings.vue'),
    meta: {
      requiresAuth: true
    }
  },
]