import vm from '@/main'
import Project from '@/api/Project'

export const getProjectByChatName = (context: any, chatName: string) => {
  context.commit('SET_LOADING', true)
  Project.getProjectByChatName(chatName)
    .then((res: any) => {
      console.log('the project data...', res)
      context.commit('SET_LOADING', false)
      context.commit('SET_PROJECT', res.data)
      context.commit('SET_ADMINS', res.data.admins)
      context.commit('SET_CONTRIBUTERS', res.data.contributers)
      context.commit('SET_CHATS', res.data.chatgroup.chats)
    })
    .catch((err: any) => {
      context.commit('SET_LOADING', false)
      console.log(err)
    })
}

export const setRoomId = (context: any, chatName: string) => {
  context.commit('SET_ROOM_ID', chatName)
}

// Socket Events from server dipatched
export const addOnlineUser = (context: any, uid: string) => {
  context.commit('ADD_ONLINE_USER', uid)
}


// Socket Dispatched Actions Events

// connect to chat room
export const joinGroupChat = (context: any, payload: any) => {
  console.log('send this: uhhh: ', payload)
  const { username, userid, roomid } = payload;
  vm.$socket.client.emit('joinGroupChat', { username, userid, roomid })
}
