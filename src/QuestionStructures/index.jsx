import React, { useCallback, useEffect, useState } from 'react'
import Struct1 from './Struct1';
import Struct2 from './Struct2';
import q1s1 from "../questions/q1s1.png"
import q1s1o1 from "../questions/q1s1o1.png"
import q1s2 from "../questions/q1s2.png"
import q1s2ans from "../questions/q1s2ans.png"
import q1s1o2 from "../questions/q1s1o2.png"
import q1s1o3 from "../questions/q1s1o3.png"
import q1s1o4 from "../questions/q1s1o4.png"
import q1s2active from "../questions/q1s2active.png"
import q1s2inactive from "../questions/q1s2inactive.png"
import q1s3 from "../questions/q1s3.mp3"
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import apiUrl from '../apiUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getQuestions } from '../redux/actions/assessmentActions';

const QuestionStructures = () => {
   const navigate = useNavigate()
   const user = useSelector(state => state.user);
   const allQuestions = useSelector(state => state.allQuestions);
   // const question = useSelector(state => state.assessment.currentQuestion);
   const dispatch = useDispatch();

   const fetchQuestions = async () => {
      const { data } = await axios.post(apiUrl + "assessment/agewise", { ageGroup: user.age });
      dispatch(getQuestions(data.questions));
   };

   // STRUCTURE 3
   // const [question, setQuestion] = useState({
   //    structure: 3,
   //    questionText: "Circle beginning letter sound",
   //    questionSound: q1s3,
   //    totalOptions: 4,
   //    option: {
   //       o1: q1s1o1,
   //       o2: q1s1o2,
   //       o3: q1s1o3,
   //       o4: q1s1o4
   //    }
   // });
   useEffect(() => {
      if (user.name === undefined) navigate("/");
   });

   useEffect(() => {
      if (allQuestions.length !== 0)
         fetchQuestions()
   }, [allQuestions, fetchQuestions]);

   // STRUCTURE 2
   // const [question, setQuestion] = useState({
   //    structure: 2,
   //    questionText: "Choose the spot where the egg is.",
   //    questionImage: q1s2,
   //    option: {
   //       active: q1s2active,
   //       inactive: q1s2inactive
   //    },
   //    answerImage: q1s2ans
   // });

   // STRUCTURE 1
   // const [question, setQuestion] = useState({
   //    structure: 1,
   //    questionText: "Select the correct symbol inside the shape.",
   //    questionImage: q1s1,
   //    totalOptions: 4,
   //    option: {
   //       o1: q1s1o1,
   //       o2: q1s1o2,
   //       o3: q1s1o3,
   //       o4: q1s1o4
   //    }
   // });
   const [lastQuestion, setLastQuestion] = useState(0);
   const [activeOption, setActiveOption] = useState();

   return (
      <div className='questionStructure'>
         <div className='questionSubStructure'>
            {/* <div className="quesHeadContainer">
               <h3 className="quesHead">{question.questionText}</h3>
            </div>
            <div style={{ margin: "40px 0", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
               <Struct1 question={question} activeOption={activeOption} setActiveOption={setActiveOption} />
            </div> */}
            <div className='submitBtn'>{lastQuestion ? "Submit" : "Next"}</div>
         </div>
      </div>
   )
}

export default QuestionStructures