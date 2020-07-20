export default [
  {
    path: "/qa/:id",
    name: "QuestionDetail",
    component: () => import('@/components/qa/QuestionPostDetail.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/qa",
    name: "QA",
    component: () => import('@/views/QA.vue'),
    meta: {
      requiresAuth: true
    }
  }
]