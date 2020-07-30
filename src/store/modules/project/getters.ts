export const projects = (state: any, getters: any, rootState: any) => {
  if (state.projects.length > 0) {
    const userId = rootState.users.user.id
    const projects = [...state.projects];

    console.log('alright here in getter: ', projects)

    projects.forEach((project: any) => {
      project.isOwn = (project.author == userId);
      project.isContrib = project.contributers.some((contributer: any) => contributer._id == userId)
    });

    console.log('after tweking: geter looks like: ', projects)

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