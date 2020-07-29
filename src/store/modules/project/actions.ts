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
        context.commit('LOADING', true)
        // remove in prod...
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
        context.dispatch('getAllProjects')
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const applyJoin = (context: any, id: string) => {
  return new Promise((resolve: any, reject: any) => {
    Project.applyJoin(id)
      .then(res => {
        context.dispatch('getAllProjects')
        resolve(res)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export const acceptJoin = (context: any, ids: any) => {
  console.log('accept a user: ', ids)
  return new Promise((resolve: any, reject: any) => {
    Project.acceptApplicant(ids.projectid, ids.userid)
      .then(res => {
        console.log('accepted: ', res)
        context.dispatch('getUserProjects', context.rootState.users.user.id)
        context.dispatch('getAllProjects')
        resolve(res)
      })
      .catch((err) => {
        context.dispatch('getUserProjects', context.rootState.users.user.id)
        context.dispatch('getAllProjects')
        console.log(err)
        reject(err)
      })
  })
}
export const rejectJoin = (context: any, ids: any) => {
  return new Promise((resolve: any, reject: any) => {
    Project.rejectApplicant(ids.projectid, ids.userid)
      .then(res => {
        context.dispatch('getUserProjects', context.rootState.users.user.id)
        context.dispatch('getAllProjects')
        resolve(res)
      })
      .catch((err) => {
        context.dispatch('getUserProjects', context.rootState.users.user.id)
        context.dispatch('getAllProjects')
        console.log(err)
        reject(err)
      })
  })
}