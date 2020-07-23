import pageRoutes from './page-routes'
import authRoutes from './auth-route'
import questionRoutes from './questions-route'
import profileRoutes from './profile-route'

export default [
  ...authRoutes,
  ...pageRoutes,
  ...questionRoutes,
  ...profileRoutes
]