import ActionTypes from "../constants/action-types";

export const assessmentReducer = (state = [], { type, payload }) => {
   switch (type) {
      case ActionTypes.GET_QUESTIONS_AGE_WISE:
         return [...state, ...payload];
      default:
         return state;
   }
}

export const currQuesReducer = (state = {}, { type, payload }) => {
   switch (type) {
      case ActionTypes.CURRENT_QUESTION:
         return payload;
      default:
         return state;
   }
}

export const answeredQuesReducer = (state = {}, { type, payload }) => {
   switch (type) {
      case ActionTypes.QUESTIONS_ANSWERED:
         return [...state, payload];
      default:
         return state;
   }
}