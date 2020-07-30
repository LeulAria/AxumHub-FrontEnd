export const SET_PROJECT = (state: any, project: any) => {
  state.project = project
}
export const SET_ADMINS = (state: any, admins: any) => {
  state.admins = admins
}
export const SET_CONTRIBUTERS = (state: any, contributers: any) => {
  state.contributers = contributers
}
export const SET_CHATS = (state: any, chats: any) => {
  state.chats = chats
}
export const SET_LOADING = (state: any, loading: any) => {
  state.loading = loading
}
export const SET_ROOM_ID = (state: any, chatName: string) => {
  state.roomid = chatName
}

// socket server dispatched events
export const ADD_ONLINE_USER = (state: any, uid: string) => {
  console.log(uid, 'adding user sto online users')
  state.onlineusers.push(uid)
  console.log('the online usrs are: ', state.onlineusers)
}
export const REMOVE_ONLINE_USER = (state: any, uid: string) => {
  const removeIndex = state.onlineusers.indexOf(uid)
  state.onlineusers.splice(removeIndex, 1)
}