import vm from '@/main'

export const chatEvent = (context: any) => {
  vm.$emit('chatEvent', 'this event was emmited from chat actions...')
  context.commit("TEST")
}