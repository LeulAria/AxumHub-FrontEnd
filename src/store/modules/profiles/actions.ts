import Profile from '@/api/Profile'

export const getUserProfile = (context: any, id: string) => {
  Profile.getById(id)
    .then(res => {
      console.log('getting user profile info', res)
      context.commit('SET_USER_PROFILE', res.data)
    })
    .catch((err) => {
      console.log('what the hack is that: ', err)
    })
}

export const setProfileInfo = (context: any, userinfo: any) => {
  console.log('we are here...', userinfo)
  new Promise((resolve, reject) => {
    Profile.updateProfile(userinfo)
      .then((res) => {
        console.log('wohooo sent: ', res)
        context.commit('SET_USER_PROFILE', res.data)
        resolve(res)
      })
      .catch((err) => {
        console.log('what the hack is that: ', err)
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
