export const TOGGLE_GLOBAL_THEME = (state: any) => {
  state.globalTheme = !state.globalTheme;
};

export const REMOVE_TOKEN = (state: any) => {
  state = null;
}