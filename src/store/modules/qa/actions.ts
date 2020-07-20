import QA from '@/api/QA'

export const getAllQuestions = (context: any) => {
  console.log('get single question')
  // fetch is their is no question (first time)
  if (context.state.questions.length) {
    context.commit('LOADING', true)
    QA.getAll()
      .then((res => {
        // remove in prod...
        setTimeout(() => context.commit('LOADING', false), 1000)
        context.commit('SET_QUESTION_POSTS', res.data)
      }))
      .catch((err) => {
        console.log(err)
        context.commit('LOADING', false)
      })
  }
  // if thier exist a questions.. (updating...)
  else {
    QA.getAll()
      .then((res => {
        // checking if thir is new question show loading...
        if (res.data.length > context.state.questions.length) {
          context.commit('LOADING', true)
          // remove in prod...
          setTimeout(() => context.commit('LOADING', false), 1000)
          context.commit('SET_QUESTION_POSTS', res.data)
        }
        // commit any way... if any change...
        context.commit('SET_QUESTION_POSTS', res.data)
      }))
      .catch((err) => {
        console.log(err)
        context.commit('LOADING', false)
      })
  }
}

export const getSingleQuestion = (context: any, id: string) => {
  context.commit('LOADING_QUESTION_DETAIL', true)
  QA.getOne(id)
    .then((res => {
      context.commit('LOADING_QUESTION_DETAIL', false)
      context.commit('SET_SINGLE_QUESTION_POST', res.data)
    }))
    .catch((err) => {
      console.log(err)
      context.commit('LOADING_QUESTION_DETAIL', false)
    })
}

export const answerOnQuestion = (context: any, data: any) => {
  QA.answer(data)
    .then(res => {
      context.dispatch('getSingleQuestion', data.id)
    })
    .catch((err) => {
      console.log('so we have error.........: ', err);
    })
}

export const likePostedQuestion = (context: any, id: string) => {
  QA.like(id)
    .then((res) => {
      context.dispatch('getAllQuestions')
      context.dispatch('getSingleQuestion', id)
    })
    .catch((err) => console.log('err: ', err))
}