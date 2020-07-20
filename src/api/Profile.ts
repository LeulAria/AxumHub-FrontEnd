import Api from './Api'

const route = '/profile'

export default {
  getAll() {
    return Api.get(`${route}/all`)
  },
  getByHandle(handle: string) {
    return Api.get(`${route}/handle/${handle}`)
  },
  getById(id: string) {
    return Api.get(`${route}/user/${id}`)
  },
  updateProfile(profile: any) {
    return Api.post(`${route}/`, profile)
  },
  createExperiance(experiance: any) {
    return Api.post(`${route}/experiance`, experiance)
  },
  createEducation(education: any) {
    return Api.post(`${route}/education`, education)
  },
  deleteExperiance(id: string) {
    return Api.delete(`${route}/experiance/${id}`)
  },
  deleteEducation(id: string) {
    return Api.delete(`${route}/education/${id}`)
  },
  deleteAccount() {
    return Api.delete(`${route}/`)
  }
}