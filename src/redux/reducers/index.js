import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { answeredQuesReducer, assessmentReducer, currQuesReducer } from "./assessmentReducer";

const reducers = combineReducers({
   user: userReducer,
   allQuestions: assessmentReducer,
   currentQuestion: currQuesReducer,
   questionAnswered: answeredQuesReducer
})

export default reducers