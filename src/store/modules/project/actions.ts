import Project from '@/api/Project'

export const getAllProjects = (context: any) => {
  Project.getAll()
    .then(res => {
      context.commit('SET_PROJECTS', res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}