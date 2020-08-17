export const toggleGlobalTheme = (context: any) => {
  context.commit('TOGGLE_GLOBAL_THEME')
}
export const snackbar = (context: any, text: string) => {
  context.commit('TOGGLE_SNACKBAR', text)
}
export const hideSnackbar = (context: any) => {
  context.commit('CLOSE_SNACKBAR')
}
export const navbar = (context: any, show: boolean) => {
  context.commit('TOGGLE_NAV_SHOW', show)
}