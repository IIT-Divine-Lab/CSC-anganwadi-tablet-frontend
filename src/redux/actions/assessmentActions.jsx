import ActionTypes from "../constants/action-types";

export const getQuestions = (questions) => {
   return {
      type: ActionTypes.GET_QUESTIONS_AGE_WISE,
      payload: questions
   }
}

export const currentQuestion = (question) => {
   return {
      type: ActionTypes.CURRENT_QUESTION,
      payload: question
   }
}

export const questionAnswered = (question) => {
   return {
      type: ActionTypes.QUESTIONS_ANSWERED,
      payload: question
   }
}