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
import Tongue from "../Images/tongue.png"
import Agarbatti from "../Images/Agarbatti.png"
import Food from "../Images/Food.png"
import IceBowl from "../Images/IceBowl.png"
import RedBall from "../Images/RedBall.png"
import Speaker from "../Images/Speaker.png"
import Ear from "../Images/ear.png"
import Eyes from "../Images/eyes.png"
import Hand from "../Images/hand.png"
import Nose from "../Images/nose.png"
import Structure7 from './Structure7';


const QuestionStructures = () => {
   const [selected, setSelected] = useState([]);
   const navigate = useNavigate()
   const user = useSelector(state => state.user);
   const allQuestions = useSelector(state => state.allQuestions);
   const counter = useSelector(state => state.currentQuestion.counter);
   const questionDet = useSelector(state => state.allQuestions)[counter];
   const question = questionDet !== undefined ? questionDet.question : "";

   const questionAnswer = useSelector(state => state.questionAnswered);
   const dispatch = useDispatch();

   const leftColumn = [
      {
         val: "जीभ",
         src: Tongue
      },
      {
         val: "आंख",
         src: Eyes
      },
      {
         val: "कान",
         src: Ear
      },
      {
         val: "त्वचा",
         src: Hand
      },
      {
         val: "नाक",
         src: Nose
      },
   ]
   const rightColumn = [
      {
         val: "Ball",
         src: RedBall
      },
      {
         val: "Jalebi",
         src: Food
      },
      {
         val: "Agarbatti",
         src: Agarbatti
      },
      {
         val: "Ice",
         src: IceBowl
      },
      {
         val: "Speaker",
         src: Speaker
      }
   ]

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
      let answer;
      if (activeOption === undefined && question.questionType !== "multi") return;
      if (question.questionType === "single")
         answer = {
            quesId: questionDet._id,
            quesCategory: questionDet.quesCategory,
            AnswerMarked: "o" + activeOption
         }
      else {
         let a = []
         for (let i = 0; i < selected.length; i++) {
            a.push(selected[i])
         }
         answer = {
            quesId: questionDet._id,
            quesCategory: questionDet.quesCategory,
            AnswerMarked: a
         }
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
      let answer;
      if (activeOption === undefined && question.questionType !== "multi") return;
      if (question.questionType === "single")
         answer = {
            quesId: questionDet._id,
            quesCategory: questionDet.quesCategory,
            AnswerMarked: "o" + activeOption
         }
      else {
         let a = []
         for (let i = 0; i < selected.length; i++) {
            a.push(selected[i])
         }
         answer = {
            quesId: questionDet._id,
            quesCategory: questionDet.quesCategory,
            AnswerMarked: a
         }
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

   const [lastQuestion, setLastQuestion] = useState(allQuestions.length === 1 ? allQuestions.length - counter : allQuestions.length - counter - 1);
   const [activeOption, setActiveOption] = useState();

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
                              : question.structure === 7 ?
                                 <Structure7 leftColumn={leftColumn} rightColumn={rightColumn} selected={selected} handleSelection={handleSelection} />
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