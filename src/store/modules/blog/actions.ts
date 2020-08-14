import Blog from '@/api/Blog'

export const getAllPostedBlogs = (context: any) => {
  context.commit('SET_LOADING', true)
  Blog.getAll()
    .then((res) => {
      console.log(res)
      context.commit('SET_LOADING', false)
      context.commit('SET_BLOGS', res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getUserPostedBlogs = (context: any) => {
  context.commit('SET_LOADING_USER', true)
  Blog.getUserBlogs()
    .then((res) => {
      console.log(res)
      context.commit('SET_LOADING_USER', false)
      context.commit('SET_USER_BLOGS', res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getUserPostedBlogsById = (context: any, id: string) => {
  context.commit('SET_LOADING_USER', true)
  Blog.getUserBlogsById(id)
    .then((res) => {
      console.log(res)
      context.commit('SET_LOADING_USER', false)
      context.commit('SET_USER_BLOGS', res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const createNewBlog = (context: any, blogData: FormData) => {
  new Promise((resolve, reject) => {
    console.log(blogData)
    Blog.ceateNewBlog(blogData)
      .then((res) => {
        console.log(res)
        context.dispatch('getUserPostedBlogs')
        context.dispatch('getAllPostedBlogs')
        resolve(res)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export const updateBlog = (context: any, payload: any) => {
  new Promise((resolve, reject) => {
    Blog.updateBlog(payload.id, payload.blogData)
      .then((res) => {
        context.dispatch('getUserPostedBlogs')
        resolve(res)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export const deleteBlog = (context: any, id: string) => {
  Blog.deleteBlog(id)
    .then((res) => {
      context.dispatch('getUserPostedBlogs')
      context.dispatch('getAllPostedBlogs')
    })
    .catch((err) => {
      console.log(err)
    })
}