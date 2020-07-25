import Project from '@/api/Project'

export const getAllProjects = (context: any) => {
  // fetch is their is no question (first time)
  if (context.state.projects.length) {
    context.commit('LOADING', true)
    Project.getAll()
      .then((res => {
        // remove in prod...
        context.commit('LOADING', false)
        context.commit('SET_PROJECTS', res.data)
      }))
      .catch((err) => {
        console.log(err)
        context.commit('LOADING', false)
      })
  }
  // if thier exist a questions.. (updating...)
  else {
    Project.getAll()
      .then((res => {
        // checking if thir is new project show loading...
        if (res.data.length > context.state.projects.length) {
          context.commit('LOADING', true)
          // remove in prod...
          setTimeout(() => context.commit('LOADING', false), 1000)
          context.commit('SET_PROJECTS', res.data)
        }
        // commit any way... if any change...
        context.commit('SET_PROJECTS', res.data)
      }))
      .catch((err) => {
        console.log(err)
        context.commit('LOADING', false)
      })
  }
}

export const getUserProjects = (context: any, id: string) => {
  if (context.state.userProjects.length) {
    context.commit('LOADING_USER', true)
    Project.getUserProjects(id)
      .then((res => {
        context.commit('LOADING_USER', false)
        context.commit('SET_USER_PROJECTS', res.data)
      }))
      .catch((err) => {
        console.log(err)
        context.commit('LOADING_USER', false)
      })
  }
  else {
    Project.getUserProjects(id)
      .then((res => {
        if (res.data.length > context.state.userProjects.length) {
          context.commit('LOADING_USER', true)
          // remove in prod
          setTimeout(() => context.commit('LOADING_USER', false), 1000)
          context.commit('SET_USER_PROJECTS', res.data)
        }
        context.commit('SET_PROJECTS', res.data)
      }))
      .catch((err) => {
        console.log(err)
        context.commit('LOADING_USER', false)
      })
  }
}

export const addNewProject = (context: any, project: any) => {
  console.log(project)
  console.log('we are here....')
  new Promise((resolve, reject) => {
    Project.createProject(project)
      .then(res => {
        console.log('wohhooo....', res)
        resolve(res)
        context.dispatch('getUserProjects', res.data.admins[0])
      })
      .catch((err) => {
        console.log('uhhhh..', err)
        reject(err)
      })
  })
}