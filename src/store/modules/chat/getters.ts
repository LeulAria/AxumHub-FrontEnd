export const admins = (state: any) => {
  return state.admins
}
export const contributers = (state: any) => {
  state.contributers
}
export const chats = (state: any) => {
  return state.chats
}
export const members = (state: any, getters: any) => {
  const members = [...state.admins, ...state.contributers];
  members.forEach((member) => {
    member.isOnline = (getters.onlineusers.indexOf(member.id) !== -1)
    console.log(member.isOnline)
    console.log(member.id,)
    console.log(getters.onlineusers)
  })
  return members
}
export const loading = (state: any) => {
  return state.loading
}
export const roomid = (state: any) => {
  return state.roomid
}
export const onlineusers = (state: any) => {
  return state.onlineusers
}