export const mediaURI = (state: any) => {
  // return 'http://localhost:8000/axumhub/upload_medias/'
  return 'https://axumhub.herokuapp.com/axumhub/upload_medias/'
}

export const globalTheme = (state: any) => {
  return state.globalTheme;
}

export const accessToken = (state: any) => {
  return state.token
}
export const navbar = (state: any) => {
  return state.navbar
}
export const loggedIn = (state: any) => {
  return (
    state.token !== null &&
    state.token !== undefined &&
    state.token.length > 10 &&
    state.token !== ''
  );
}
export const snackbarText = (state: any) => {
  return state.snackbar.text
}
export const snackbarShow = (state: any) => {
  return state.snackbar.show
}
export const snackbarTimeout = (state: any) => {
  return state.snackbar.timeout
}
