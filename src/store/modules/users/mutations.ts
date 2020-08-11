export const SET_USER = (store: any, user: any) => {
  store.user = user;
}

export const LOGOUT_USER = (store: any) => {
  store = '';
}


export const UPDATE_USER_AVATAR = (state: any, uploadedAvatar: any) => {
  alert(uploadedAvatar.avatar)
  state.user.avatar = uploadedAvatar.avatar
}