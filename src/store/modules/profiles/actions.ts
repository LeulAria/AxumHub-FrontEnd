import Profile from '@/api/Profile'

export const getUserProfile = (context: any, id: string) => {
  Profile.getById(id)
    .then(res => {
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
        context.commit('SET_USER_PROFILE', res.data)
        context.dispatch('getUserProfile')
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
        context.commit('SET_USER_PROFILE', res.data)
        context.dispatch('getUserProfile')
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
        context.commit('SET_USER_PROFILE', res.data)
        context.dispatch('getUserProfile')
        resolve(res)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export const deleteExperiance = (context: any, id: string) => {
  new Promise((resolve, reject) => {
    Profile.deleteExperiance(id)
      .then((res) => {
        context.commit('SET_USER_PROFILE', res.data)
        context.dispatch('getUserProfile')
        resolve(res)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export const deleteEducation = (context: any, id: string) => {
  new Promise((resolve, reject) => {
    Profile.deleteEducation(id)
      .then((res) => {
        context.commit('SET_USER_PROFILE', res.data)
        context.dispatch('getUserProfile')
        resolve(res)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}