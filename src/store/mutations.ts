export const TOGGLE_GLOBAL_THEME = (state: any) => {
  state.globalTheme = !state.globalTheme;
};

export const SET_TOKEN = (state: any, token: string) => {
  state.token = token;
}

export const REMOVE_TOKEN = (state: any) => {
  state.token = '';
  state = '';
}

export const TOGGLE_SNACKBAR = (state: any, text: string, timeout?: number) => {
  state.snackbar.text = text;
  state.snackbar.show = true;
  state.snackbar.timeout = timeout ? timeout : state.snackbar.timeout;
}
export const CLOSE_SNACKBAR = (state: any) => {
  state.snackbar.show = false;
}