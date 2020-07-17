import Api from './Api'

export default {
  register(user: any) {
    return Api.post('/users/register', user)
  },
  login(user: any) {
    return Api.post('/users/login', user)
  }
}
