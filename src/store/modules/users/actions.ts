import User from '../../../api/User'


export const registerUser = (context: any, user: any) => {
  return new Promise((resolve: any, reject: any) => {
    User.register(user)
      .then((res) => {
        alert('yay')
        resolve(res)
      })
      .catch((err) => {
        reject(err);
      })
  })
}

export const loginUser = (context: any, user: any) => {
  return new Promise((resolve: any, reject: any) => {
    User.login(user)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const logOut = (context: any) => {
  alert('logging out...')
  localStorage.clear();
  localStorage.setItem('AxumHUB', '')
  context.commit('LOGOUT_USER');
  context.commit('REMOVE_TOKEN', null, { root: true });
}