import User from '../../../api/User'


export const registerUser = (context: any, user: any) => {
  console.log('register the user...', user)
  return new Promise((resolve: any, reject: any) => {
    User.register(user)
      .then((res: any) => {
        console.log("ther user has been registered...", res)
        context.commit('SET_USER', res.user)
        context.commit('SET_TOKEN', res.token, { root: true })
        resolve(res)
      })
      .catch((err) => {
        console.log('nop their is some error lets see', err.response)
        reject(err.response.data);
      })
  })
}

export const loginUser = (context: any, user: any) => {
  return new Promise((resolve: any, reject: any) => {
    User.login(user)
      .then((res: any) => {
        context.commit('SET_USER', res.data.user)
        context.commit('SET_TOKEN', res.data.token, { root: true })
        resolve(res)
      })
      .catch((err: any) => {
        reject(err.response.data.error)
      })
  })
}

export const logOut = (context: any) => {
  localStorage.clear();
  localStorage.setItem('AxumHUB', '')
  context.commit('LOGOUT_USER');
  context.commit('REMOVE_TOKEN', null, { root: true });
}

export const uploadAvatar = (context: any, avatarForm: FormData) => {
  User.uploadAvatar(avatarForm).then((res) => {
    context.commit('UPDATE_USER_AVATAR', res.data)
  })
    .catch((err) => {
      console.log(err)
    })
}