export const admins = (state: any) => {
  return state.admins
}
export const contributers = (state: any) => {
  return state.contributers
}
export const chats = (state: any) => {
  return state.chats
}
export const members = (state: any) => {
  return [...state.admins, ...state.contributers]
}
export const loading = (state: any) => {
  return state.loading
}