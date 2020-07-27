const routePath = '/axum_blogs'

export default [
  {
    path: `${routePath}`,
    name: "Blogs",
    component: () => import('@/views/Blog.vue'),
    meta: {
      requiresAuth: true
    }
  },
]