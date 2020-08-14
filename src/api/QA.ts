import Api from './Api'

export default {
  getAll() {
    return Api.get('/question_post/all')
  },
  getOne(id: string) {
    return Api.get(`/question_post/${id}`)
  },
  create(post: any) {
    console.log('now lets send it', post)
    return Api.post('/question_post/create', post)
  },
  like(id: string) {
    return Api.post(`/question_post/like/${id}`)
  },
  unlike(id: string) {
    return Api.post(`/question_post/unlike/${id}`)
  },
  answer(data: any) {
    return Api.post(`/question_post/answer/${data.id}`, { answer: data.answer })
  },
  deleteAnswer(qId: string, ansId: string) {
    return Api.delete(`/question_post/${qId}/answer/${ansId}`)
  },
  deleteQuestion(id: string) {
    return Api.delete(`/question_post/${id}`)
  }
}