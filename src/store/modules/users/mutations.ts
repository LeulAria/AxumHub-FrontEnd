export const SET_USER = (store: any, payload: any) => {
  store.user = payload;
}

export const LOGOUT_USER = (store: any) => {
  store = null;
} 