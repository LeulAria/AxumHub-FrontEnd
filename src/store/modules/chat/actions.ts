import vm from '@/main'
import Project from '@/api/Project'

export const chatEvent = (context: any) => {
  vm.$emit('chatEvent', 'this event was emmited from chat actions...')
  // context.commit("TEST")
}

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