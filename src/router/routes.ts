import pageRoutes from './page-routes'
import authRoutes from './auth-route'
import questionRoutes from './questions-route'
import profileRoutes from './profile-route'
import projectRoutes from './project-routes'

export default [
  ...authRoutes,
  ...pageRoutes,
  ...profileRoutes,
  ...projectRoutes,
  ...questionRoutes,
]