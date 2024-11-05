import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { answeredQuesReducer, assessmentReducer, currQuesReducer } from "./assessmentReducer";
// import familyTreeReducer from "./familytree";

const AllReducer = combineReducers({
   user: userReducer,
   allQuestions: assessmentReducer,
   currentQuestion: currQuesReducer,
   questionAnswered: answeredQuesReducer,
})

export default AllReducer