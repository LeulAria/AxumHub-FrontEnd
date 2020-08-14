export const SET_USER_PROFILE = (state: any, userinfo: any) => {
  console.log(userinfo, 'set user profile')
  state.userProfile = userinfo;
}