import pageRoutes from './page-routes'
import authRoutes from './auth-route'
import questionRoute from './questions-route'

export default [
  ...authRoutes,
  ...pageRoutes,
  ...questionRoute
]