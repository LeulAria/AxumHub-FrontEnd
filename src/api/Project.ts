import Api from './Api'

const route = '/project'

export default {
  getAll() {
    return Api.get(`${route}/all`)
  },
  getUserProjects(id: string) {
    return Api.get(`${route}/user_projects/${id}`)
  },
  getProjectById(id: string) {
    return Api.get(`${route}/${id}`)
  },
  getProjectByChatName(chatName: string) {
    return Api.get(`${route}/chat/${chatName}`)
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
  acceptApplicant(id: string, userId: string) {
    return Api.post(`${route}/${id}/user/${userId}/accept`)
  },
  rejectApplicant(id: string, userId: string) {
    return Api.post(`${route}/${id}/user/${userId}/reject`)
  }
}