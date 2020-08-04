import Vue from 'vue'

Vue.filter('snnipit', (val: string, truncate: number) => {
  return val.split(' ').slice(0, truncate).join(' ') + '...'
})