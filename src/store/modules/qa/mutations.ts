export const SET_QUESTION_POSTS = (state: any, questions: any) => {
  state.questions = questions
}

export const LOADING = (state: any, loading: boolean) => {
  state.isLoading = loading
}


export const LOADING_QUESTION_DETAIL = (state: any, loading: boolean) => {
  state.loadingDetail = loading
}

export const SET_SINGLE_QUESTION_POST = (state: any, question: any) => {
  console.log('in mutation: ', question)
  state.question = question
}

export const SET_LIKE_TOPOST = (state: any, data: any) => {
  console.log(data.user, data.id)
  state = state.questions.forEach((question: any) => {
    if (question.id == data.id) {
      question.like.push(data.user)
    }
  })
}