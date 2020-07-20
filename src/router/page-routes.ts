export default [
  {
    path: "/chatborad",
    name: "ChatBoard",
    component: () => import('@/components/chat/ChatBoard.vue'),
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
  }
]