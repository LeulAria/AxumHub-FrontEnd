const routePath = '/profile'

export default [
  {
    path: `${routePath}/`,
    name: "Profile",
    component: () => import('@/views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/edit_profile_info`,
    name: "ProfileInfo",
    component: () => import('@/components/profile/ProfileInfos.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/edit_profile_experiance`,
    name: "ProfileExperiance",
    component: () => import('@/components/profile/ProfileExperiance.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${routePath}/edit_profile_education`,
    name: "ProfileEducation",
    component: () => import('@/components/profile/ProfileEducation.vue'),
    meta: {
      requiresAuth: true
    }
  },
]