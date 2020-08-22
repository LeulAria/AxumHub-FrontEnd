import Api from './Api'

const route = '/users'

export default {
  register(user: any) {
    return Api.post(`${route}/register`, user)
  },
  login(user: any) {
    return Api.post(`${route}/login`, user)
  },
  loginWithIdentityProvider() {
    alert('go to server...')
    return Api.post(`${route}/etp`, { code: 'change this mame...🔥 dont seep.. you can do it 😺 kidding...' })
  },
  currentUser() {
    return Api.get(`${route}/current`);
  },
  uploadAvatar(avatarPic: FormData) {
    return Api.post(`${route}/avatar`, avatarPic);
  }
}
