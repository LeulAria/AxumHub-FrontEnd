import Profile from '@/api/Profile'

export const test = (context: any) => {
  return context.commit('TEST');
}

export const setProfileInfo = (context: any, userinfo: any) => {
  new Promise((resolve, reject) => {
    Profile.updateProfile(userinfo)
      .then((res) => {
        console.log(res)
        context.commit('SET_USER_PROFILE', res.data)
        resolve(res)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export const addExpeianceProfile = (context: any, experiance: any) => {
  new Promise((resolve, reject) => {
    Profile.createExperiance(experiance)
      .then((res) => {
        console.log(res)
        context.commit('SET_USER_EXPERIANCE', res.data)
        resolve(res)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export const addEducationProfile = (context: any, education: any) => {
  new Promise((resolve, reject) => {
    Profile.createEducation(education)
      .then((res) => {
        console.log(res)
        context.commit('SET_USER_EDUCATION')
        resolve(res)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}
