const routePath = '/qa'

export default [
  {
    path: `${routePath}`,
    name: "QA",
    component: () => import('@/views/QA.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/create`,
    name: "CreateQuestion",
    component: () => import('@/components/qa/CreateQuestionPost.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/userpost`,
    name: "UserPosts",
    component: () => import('@/components/qa/UserQuestionsPost.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/:id`,
    name: "QuestionDetail",
    component: () => import('@/components/qa/QuestionPostDetail.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  }
]