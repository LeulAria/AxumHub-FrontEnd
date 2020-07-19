export const userInfo = (store: any) => {
  return { name: store.user.name, email: store.user.email }
}