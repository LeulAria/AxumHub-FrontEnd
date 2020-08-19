import Vue from 'vue'

Vue.filter('snnipit', (val: string, truncate: number) => {
  return val.split(' ').slice(0, truncate).join(' ') + '...'
})

Vue.filter('snnipword', (val: string, truncate: number) => {
  return val.substring(0, truncate)
})