import Api from './Api'

const route = '/project'

export default {
  getAll() {
    return Api.get(`${route}/all`)
  },
  getContributers(id: string) {
    return Api.get(`${route}/${id}/contributers`)
  },
  getAdmins(id: string) {
    return Api.get(`${route}/${id}/admins`)
  },
  getApplicants(id: string) {
    return Api.get(`${route}/${id}/applicants`)
  },
  createProject(project: any) {
    return Api.post(`${route}/create`, project)
  },
  updateProject(id: string, project: any) {
    return Api.put(`${route}/${id}`, project)
  },
  deleteProject(id: string) {
    return Api.delete(`${route}/${id}`)
  },
  applyJoin(id: string) {
    return Api.post(`${route}/${id}/apply`)
  },
  acceptApplicant(id: string, user_id: string) {
    return Api.post(`${route}/${id}/user/${user_id}/accept`)
  },
  rejectApplicant(id: string, user_id: string) {
    return Api.post(`${route}/${id}/user/${user_id}/reject`)
  }
}