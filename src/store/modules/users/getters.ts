export const userInfo = (store: any) => {
  return store.user
}
export const userAvatar = (store: any) => {
  return store.user.avatar || "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_female_woman_avatar-512.png";
}
