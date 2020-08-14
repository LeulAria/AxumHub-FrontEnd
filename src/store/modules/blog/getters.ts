export const blogs = (state: any) => {
  return state.blogs
}
export const loading = (state: any) => {
  return state.loading
}
export const userBlogs = (state: any) => {
  return userBlogs
}
export const loadingUser = (state: any) => {
  return loadingUser
}

export const articleBlogsExist = (state: any) => {
  return state.blogs.filter((blog: any) => blog.postType == 'article').length > 0;
}
export const blogBlogsExist = (state: any) => {
  return state.blogs.filter((blog: any) => blog.postType == 'blog').length > 0;
}
export const jobBlogsExist = (state: any) => {
  return state.blogs.filter((blog: any) => blog.postType == 'job').length > 0;
}
export const newsBlogsExist = (state: any) => {
  return state.blogs.filter((blog: any) => blog.postType == 'news').length > 0;
}