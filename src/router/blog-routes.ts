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
  {
    path: `${routePath}/create`,
    name: "NewBlog",
    component: () => import('@/components/blog/NewBlog.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/blog_detail/:id`,
    name: "BlogDetail",
    component: () => import('@/components/blog/BlogDetail.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
]