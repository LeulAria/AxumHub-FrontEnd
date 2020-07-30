import Project from '@/api/Project'

export const getAllProjects = (context: any) => {
  // fetch is their is no question (first time)
  if (context.state.projects.length) {
    context.commit('LOADING', true)
    Project.getAll()
      .then((res => {
        // remove in prod...
        context.commit('LOADING', false)
        console.log('got the data successfully', res.data)
        console.log('setting for the first time......')
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
        context.commit('LOADING', true)
        // remove in prod...
        console.log('fi second time couse len is > 0: ', res.data)
        setTimeout(() => context.commit('LOADING', false), 1000)
        context.commit('SET_PROJECTS', res.data)
        // commit any way... if any change...
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
        context.commit('LOADING_USER', true)
        // remove in prod
        setTimeout(() => context.commit('LOADING_USER', false), 1000)
        context.commit('SET_USER_PROJECTS', res.data)
      }))
      .catch((err) => {
        console.log(err)
        context.commit('LOADING_USER', false)
      })
  }
}

export const getJoinedProjects = (context: any, id: string) => {
  if (context.state.joinedProjects.length) {
    context.commit('LOADING_JOINED', true)
    Project.getJoinedProjects(id)
      .then((res => {
        context.commit('LOADING_JOINED', false)
        context.commit('SET_JOINED_PROJECTS', res.data)
      }))
      .catch((err) => {
        console.log(err)
        context.commit('LOADING_JOINED', false)
      })
  }
  else {
    Project.getJoinedProjects(id)
      .then((res => {
        if (res.data.length > context.state.joinedProjects.length) {
          context.commit('LOADING_JOINED', true)
          // remove in prod
          setTimeout(() => context.commit('LOADING_JOINED', false), 1000)
          context.commit('SET_JOINED_PROJECTS', res.data)
        }
      }))
      .catch((err) => {
        console.log(err)
        context.commit('LOADING_JOINED', false)
      })
  }
}

export const addNewProject = (context: any, project: any) => {
  new Promise((resolve, reject) => {
    Project.createProject(project)
      .then(res => {
        resolve(res)
        context.dispatch('getUserProjects', res.data.admins[0])
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const applyJoin = (context: any, id: string) => {
  Project.applyJoin(id)
    .then(res => {
      context.dispatch('getUserProjects', res.data.admins[0])
    })
    .catch((err) => {
      console.log(err)
    })
}