export const projects = (state: any, getters: any, rootState: any) => {
  if (state.projects.length > 0) {
    const userId = rootState.users.user.id
    const projects = [...state.projects];

    projects.forEach((project: any) => {
      project.isOwn = (project.author == userId);
      project.isContrib = project.contributers.some((contributer: any) => contributer._id == userId)
    });

    return projects
  }
  else return []
}
export const isLoading = (state: any) => {
  return state.isLoading
}
export const userProjects = (state: any) => {
  return state.userProjects.map((project: any) => {
    project.menu = false
    return project
  })
}
export const isLoadingUser = (state: any) => {
  return state.isLoading
}
export const joinedProjects = (state: any) => {
  return state.joinedProjects.map((project: any) => {
    project.menu = false
    return project
  })
}
export const isJoinedLoading = (state: any) => {
  return state.isJoinedLoading
}

// notification
export const joinNotifications = (state: any, getters: any) => {
  let joinRequests: any;

  joinRequests = []
  getters.userProjects.forEach((project: any) => {
    joinRequests = [...joinRequests, ...project.joinrequests]
  })

  return joinRequests
}

//project detail
export const project = (state: any) => {
  return state.project
}
export const contributers = (state: any) => {
  return state.project?.contributers
}
export const loadingProject = (state: any) => {
  return state.loadingProject
}