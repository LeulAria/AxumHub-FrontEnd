const routePath = '/callback'

export default [
    {
        path: `${routePath}`,
        name: "CallBack",
        component: () => import('@/views/CallBack.vue'),
    },
]