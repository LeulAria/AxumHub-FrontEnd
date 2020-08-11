import Api from './Api'

const route = '/users'

export default {
  register(user: any) {
    return Api.post(`${route}/register`, user)
  },
  login(user: any) {
    return Api.post(`${route}/login`, user)
  },
  currentUser() {
    return Api.get(`${route}/current`);
  },
  uploadAvatar(avatarPic: FormData) {
    return Api.post(`${route}/avatar`, avatarPic);
  }
}
