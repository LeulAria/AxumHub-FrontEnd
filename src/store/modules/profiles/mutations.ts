export const SET_USER_PROFILE = (state: any, userinfo: any) => {
  alert('ok now set the user profile')
  console.log(userinfo, 'set user profile')
  state.userProfile = userinfo;
}
export const SET_USER_EXPERIANCE = (state: any, userExperiance: any) => {
  state.userProfileExperiance = userExperiance;
}
export const SET_USER_EDUCATION = (state: any, userEducation: any) => {
  state.userProfileEducation = userEducation;
}