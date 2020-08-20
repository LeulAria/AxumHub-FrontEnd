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
    path: `${routePath}/explore_projects`,
    name: "ExploreProjects",
    component: () => import('@/components/project/ExploreProjects.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/schedule`,
    name: "Schedule",
    component: () => import('@/components/project/Schedule.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/:id/uploads`,
    name: "Uploads",
    component: () => import('@/components/project/Uploads.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/:id`,
    name: "ProjectDetail",
    component: () => import('@/components/project/ProjectDetail.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/explore_projects/:id`,
    name: "ProjectExploreDetail",
    component: () => import('@/components/project/ProjectExploreDetail.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/:id/chat/`,
    name: "Chat",
    component: () => import('@/views/Chat.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/:id/conference`,
    name: "Conference",
    component: () => import('@/views/Conference.vue'),
    props: true,
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