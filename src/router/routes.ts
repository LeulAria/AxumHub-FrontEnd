import pageRoutes from './page-routes'
import authRoutes from './auth-route'
import questionRoutes from './questions-route'
import profileRoutes from './profile-route'
import projectRoutes from './project-routes'
import blogRoutes from './blog-routes'
import callbackRoutes from './callback-route'

export default [
  ...authRoutes,
  ...pageRoutes,
  ...profileRoutes,
  ...projectRoutes,
  ...questionRoutes,
  ...blogRoutes,
  ...callbackRoutes
]