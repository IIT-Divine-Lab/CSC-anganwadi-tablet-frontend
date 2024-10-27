import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { answeredQuesReducer, assessmentReducer, currQuesReducer } from "./assessmentReducer";
// import familyTreeReducer from "./familytree";

const reducers = combineReducers({
   user: userReducer,
   allQuestions: assessmentReducer,
   currentQuestion: currQuesReducer,
   questionAnswered: answeredQuesReducer,
   // familyTree: familyTreeReducer
})

export default reducers