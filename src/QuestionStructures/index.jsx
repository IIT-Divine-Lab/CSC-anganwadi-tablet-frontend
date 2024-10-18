import React, { useCallback, useEffect, useState } from 'react'
import Struct1 from './Struct1';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import apiUrl from '../apiUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { currentQuestion, firstQuestionAnswered, getQuestions, questionAnswered } from '../redux/actions/assessmentActions';


const QuestionStructures = () => {
   // const question = 0;
   const navigate = useNavigate()
   const user = useSelector(state => state.user);
   const allQuestions = useSelector(state => state.allQuestions);
   const counter = useSelector(state => state.currentQuestion);
   const questionDet = useSelector(state => state.allQuestions)[counter];
   const question = questionDet !== undefined ? questionDet.question : "";

   const questionAnswer = useSelector(state => state.questionAnswered);
   const dispatch = useDispatch();

   const fetchQuestions = useCallback(async () => {
      const { data } = await axios.post(apiUrl + "assessment/agewise", { ageGroup: user.age });
      console.log(data.questions);
      dispatch(getQuestions(data.questions));
      dispatch(currentQuestion(0));
   }, [dispatch, user]);
   console.log(question);

   const saveQuestion = async () => {
      if (activeOption === undefined) return;
      let answer = {
         quesId: questionDet._id,
         AnswerMarked: activeOption
      }
      if (questionAnswer.length === undefined) {
         dispatch(firstQuestionAnswered(user._id, answer));
      }
      else {
         dispatch(questionAnswered(answer));
      }
      dispatch(currentQuestion(counter + 1));
      setLastQuestion(allQuestions.length - counter - 2);
   }

   const submitAssessment = async () => {
      let answer = {
         quesId: questionDet._id,
         AnswerMarked: activeOption
      }
      if (questionAnswer.questions.length === undefined) {
         dispatch(firstQuestionAnswered(user._id, answer));
      }
      else if (questionAnswer.questions.length !== allQuestions.length) {
         dispatch(questionAnswered(answer));
      }
      const { data } = await axios.post(apiUrl + "result", questionAnswer);

      console.log(data);
   }

   useEffect(() => {
      if (user.name === undefined) navigate("/");
   });

   useEffect(() => {
      if (allQuestions.length === 0)
         fetchQuestions();
   }, [allQuestions, fetchQuestions]);
   console.log(allQuestions.length, counter);
   const [lastQuestion, setLastQuestion] = useState(allQuestions.length - counter - 1);
   const [activeOption, setActiveOption] = useState();

   return (
      <div className='questionStructure'>
         <div className='questionSubStructure'>
            {
               question !== undefined ?
                  <>
                     <div className="quesHeadContainer">
                        <h3 className="quesHead">{question.questionText}</h3>
                     </div>
                     <div style={{ margin: "40px 0", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <Struct1 question={question} activeOption={activeOption} setActiveOption={setActiveOption} />
                     </div>
                     {
                        lastQuestion !== 0 ?
                           <div className='submitBtn' onClick={saveQuestion}>Next</div>
                           :
                           <div className='submitBtn' onClick={submitAssessment}>Submit</div>
                     }
                  </>
                  : <></>
            }

         </div>
      </div>
   )
}

export default QuestionStructures