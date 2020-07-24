const routePath = '/project'

export default [
  {
    path: `${routePath}/`,
    name: "Project",
    component: () => import('@/views/Project.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/chatborad`,
    name: "ChatBoard",
    component: () => import('@/components/chat/ChatBoard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/chatspace`,
    name: "ChatSpace",
    component: () => import('@/views/ChatSpace.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/conference`,
    name: "Conference",
    component: () => import('@/views/Conference.vue'),
    meta: {
      requiresAuth: true
    }
  }
]