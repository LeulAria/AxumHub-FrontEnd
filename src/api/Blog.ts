import Api from './Api'
import store from '@/store'

const route = '/blog';

export default {
  getAll() {
    return Api.get(`${route}/all`)
  },
  getUserBlogs() {
    return Api.get(`${route}/user_blogs`)
  },
  getUserBlogsById(id: string) {
    return Api.get(`${route}/user/${id}`)
  },
  ceateNewBlog(formData: FormData) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: store.getters.accessToken
      }
    };
    return Api.post(
      `${route}/create`,
      formData,
      config
    )
  },
  updateBlog(id: string, formData: FormData) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: store.getters.accessToken
      }
    };
    console.log(formData)
    return Api.post(
      `${route}/${id}`,
      formData,
      config
    )
  },
  deleteBlog(id: string) {
    return Api.delete(`${route}/${id}`)
  }
}