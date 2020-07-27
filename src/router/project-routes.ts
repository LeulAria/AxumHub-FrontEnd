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
    path: `${routePath}/new_project`,
    name: "NewProject",
    component: () => import('@/components/project/NewProject.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/chat/:id`,
    name: "Chat",
    component: () => import('@/views/Chat.vue'),
    props: true,
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
  },
  {
    path: `${routePath}/tasks`,
    name: "TaskList",
    component: () => import('@/components/project/TaskList.vue'),
    meta: {
      requiresAuth: true
    }
  }
]