export default [
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
    path: "/logout",
    name: "Logout",
    component: () => import('@/views/Logout.vue'),
    meta: {
      requiresAuth: true
    }
  }
]