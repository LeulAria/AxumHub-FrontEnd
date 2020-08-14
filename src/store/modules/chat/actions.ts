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
export const setOnlineUsers = (context: any, payload: [string]) => {
  context.commit('SET_ONLINE_USERS', payload)
}

export const setFetchedChats = (context: any, payload: any) => {
  context.commit('SET_CHATS', payload)
}

export const addNewChat = (context: any, payload: any) => {
  context.commit('ADD_NEW_CHAT', payload)
}

// Socket Dispatched Actions Events

// connect to chat room
export const joinGroupChat = (context: any, payload: any) => {
  vm.$socket.client.emit('joinRoom', payload)
}

export const sendChat = (context: any, payload: any) => {
  vm.$socket.client.emit("sendChat", payload);
}
