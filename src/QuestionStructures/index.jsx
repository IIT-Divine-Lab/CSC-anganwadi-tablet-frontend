import React, { useCallback, useEffect, useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import apiUrl from '../apiUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { currentQuestion, firstQuestionAnswered, getQuestions, questionAnswered, resetAssessment } from '../redux/actions/assessmentActions';
import { resetUser } from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import ParentContainer from '../Common/ParentContainer';
import Button from '../Common/Button';
import Structure1to4 from './Structure1-4';
import Structure5 from './Structure5';
import Structure6 from './Structure6';


const QuestionStructures = () => {
   const [selected, setSelected] = useState([]);
   const navigate = useNavigate()
   const user = useSelector(state => state.user);
   const allQuestions = useSelector(state => state.allQuestions);
   const counter = useSelector(state => state.currentQuestion);
   const questionDet = useSelector(state => state.allQuestions)[counter];
   const question = questionDet !== undefined ? questionDet.question : "";

   const questionAnswer = useSelector(state => state.questionAnswered);
   const dispatch = useDispatch();

   const fetchQuestions = useCallback(async () => {
      await axios.post(apiUrl + "assessment/agewise", { ageGroup: user.age })
         .then(({ data }) => {
            console.log(data);
            dispatch(getQuestions(data.questions));
            dispatch(currentQuestion(0));
         })
         .catch(({ message }) => {
            toast(message, {
               type: "error",
               autoClose: 3000,
               theme: "colored",
               hideProgressBar: true
            })
         })
   }, [dispatch, user]);

   const saveQuestion = async () => {
      if (activeOption === undefined) return;
      let answer = {
         quesId: questionDet._id,
         AnswerMarked: "o" + activeOption
      }
      if (questionAnswer.questions.length === 0) {
         dispatch(firstQuestionAnswered(user._id, answer));
      }
      else {
         dispatch(questionAnswered(answer));
      }
      dispatch(currentQuestion(counter + 1));
      setLastQuestion(allQuestions.length - counter - 2);
      setActiveOption();
   }

   const submitAssessment = async () => {
      let answer = {
         quesId: questionDet._id,
         AnswerMarked: "o" + activeOption
      }
      if (questionAnswer.questions.length === 0) {
         dispatch(firstQuestionAnswered(user._id, answer));
      }
      else if (questionAnswer.questions.length !== allQuestions.length) {
         dispatch(questionAnswered(answer));
      }
      console.log(questionAnswer);

      await axios.post(apiUrl + "result", { userId: user._id, questions: [...questionAnswer.questions, answer] })
         .then(async ({ data }) => {
            await axios.patch(apiUrl + "user/" + user._id, {
               assessId: data.question._id
            })
               .then((res) => {
                  setActiveOption();
                  dispatch(resetUser())
                  dispatch(resetAssessment())
                  console.log(res.data);
                  console.log(data);
               })
         })
         .catch(({ message }) => {
            toast(message, {
               type: "error",
               autoClose: 3000,
               theme: "colored",
               hideProgressBar: true
            })
         })
   }

   // works if structure 5th is in use
   const handleSelection = (str) => {
      let newSelection = [];
      if (selected.includes(str)) {
         newSelection = selected.filter((value) => value !== str)
      }
      else {
         newSelection = [...selected, str];
      }
      console.log(newSelection);
      setSelected(newSelection);
   }

   useEffect(() => {
      if (user.name === undefined) navigate("/");
   });

   useEffect(() => {
      if (allQuestions.length === 0 && user.name !== undefined)
         fetchQuestions();
   }, [allQuestions, fetchQuestions, user]);
   const [lastQuestion, setLastQuestion] = useState(allQuestions.length - counter - 1);
   const [activeOption, setActiveOption] = useState();

   console.log(allQuestions.length - counter - 1);
   return (
      <ParentContainer>
         {
            question !== undefined ?
               <>
                  {
                     question.structure >= 1 && question.structure <= 4 ?
                        <Structure1to4 question={question} activeOption={activeOption} setActiveOption={setActiveOption} />
                        : question.structure === 5 ?
                           <Structure5 question={question} selected={selected} handleSelection={handleSelection} />
                           : question.structure === 6 ?
                              <Structure6 question={question} activeOption={activeOption} setActiveOption={setActiveOption} />
                              : ""
                  }
                  {
                     lastQuestion !== 0 ?
                        <Button className='submitBtn' onClick={saveQuestion}>Next</Button>
                        :
                        <Button className='submitBtn' onClick={submitAssessment}>Submit</Button>
                  }
               </>
               : <></>
         }
      </ParentContainer>
   )
}

export default QuestionStructures