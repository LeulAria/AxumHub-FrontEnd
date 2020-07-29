export const SET_PROJECTS = (state: any, projects: any) => {
  state.projects = projects;
}
export const LOADING = (state: any, loading: boolean) => {
  state.isLoading = loading
}
export const SET_USER_PROJECTS = (state: any, userProjects: any) => {
  state.userProjects = userProjects;
}
export const LOADING_USER = (state: any, loading: boolean) => {
  state.isLoadingUser = loading
}
export const SET_JOINED_PROJECTS = (state: any, joinedProjects: boolean) => {
  state.joinedProjects = joinedProjects
}
export const LOADING_JOINED = (state: any, loading: boolean) => {
  state.isJoinedLoading = loading
}