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
    path: "/conference",
    name: "Conference",
    component: () => import('@/views/Conference.vue'),
    meta: {
      requiresAuth: true
    }
  }
]