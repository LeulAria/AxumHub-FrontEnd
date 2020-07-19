export const globalTheme = (state: any) => {
  return state.globalTheme;
}

export const accessToken = (state: any) => {
  return state.token
}

export const loggedIn = (state: any) => {
  return (
    state.token !== null &&
    state.token !== undefined &&
    state.token.length > 10 &&
    state.token !== ''
  );
}