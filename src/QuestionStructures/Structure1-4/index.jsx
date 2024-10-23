import React from 'react'
import "./style.css"
// import questionImageBefore from "../../questions/q1s1 - top.png"
// import questionImageAfter from "../../questions/q1s1.png"
// import option1 from "../../questions/q1s1o1.png"
// import option2 from "../../questions/q1s1o2.png"
// import option3 from "../../questions/q1s1o3.png"
// import option4 from "../../questions/q1s1o4.png"
import { HiSpeakerWave } from "react-icons/hi2";
// import questionSound from "../../questions/q1s3.mp3"
import Heading from '../../Common/Heading'
import Body from '../../Common/Body';

const Structure1to4 = ({ setActiveOption, activeOption, question }) => {
   // let question = {
   //    structure: 4,
   //    questionText: "Select the correct symbol inside the shape.",
   //    questionSound,
   //    questionSoundText: "Select...",
   //    questionOnlyText: "Select the correct symbol",
   //    questionType: "single",
   //    questionImage: {
   //       before: questionImageBefore,
   //       after: questionImageAfter
   //    },
   //    totalOptions: 4,
   //    option: {
   //       o1: option1,
   //       o2: option2,
   //       o3: option3,
   //       o4: option4
   //    }
   // }

   const playAudio = () => {
      var aud = document.getElementById("audioQues");
      aud.play();
   }

   return (
      <>
         {
            question.structure === 1 ?
               <div>
                  <img className='quesImageBefore' src={question.questionImage.before} alt="" />
               </div>
               :
               <>
               </>
         }
         <Heading>
            {question.questionText}
         </Heading>
         <Body>
            {
               question.structure === 1 || question.structure === 2 ?
                  <div>
                     <img style={question.structure === 2 ? { height: "300px", width: "auto" } : {}} className='quesImageAfter' src={question.questionImage.after} alt="" />
                  </div>
                  : question.structure === 4 ?
                     <>
                        {
                           !question.questionOnlyText && question.questionSound ?
                              <audio loops={false} id='audioQues' className='audioQues' src={question.questionSound}></audio>
                              : ""
                        }
                        <div className='audioContainer'>
                           {
                              !question.questionOnlyText ?
                                 <HiSpeakerWave onClick={playAudio} className='speaker' />
                                 : ""
                           }
                           {
                              question.questionSoundText ?
                                 <span style={{ marginLeft: "10px" }}>{question.questionSoundText}</span>
                                 :
                                 <span>{question.questionOnlyText}</span>
                           }
                        </div>
                     </>
                     : <>
                     </>
            }
            <div className="quesOptionContainer">
               <div className='rowContainer' style={question.totalOptions >= 3 ? { flexWrap: "wrap" } : {}}>
                  <div className="optionContainer">
                     <img src={question.option.o1} alt='' className={activeOption !== 1 ? "option" : "option optionActive"} />
                     <input type="radio" name="q1" id="a1" className='chooseOption' onClick={() => { setActiveOption(1) }} />
                  </div>
                  {question.totalOptions >= 2 ? <div className="optionContainer">
                     <img src={question.option.o2} alt='' className={activeOption !== 2 ? "option" : "option optionActive"} />
                     <input type="radio" name="q1" id="a2" className='chooseOption' onClick={() => { setActiveOption(2) }} />
                  </div> : ""}
                  {question.totalOptions >= 3 ? <div className="optionContainer" style={question.totalOptions >= 3 ? { marginLeft: "0px", marginTop: "40px" } : {}}>
                     <img src={question.option.o3} alt='' className={activeOption !== 3 ? "option" : "option optionActive"} />
                     <input type="radio" name="q1" id="a3" className='chooseOption' onClick={() => { setActiveOption(3) }} />
                  </div> : ""}
                  {question.totalOptions >= 4 ? <div className="optionContainer" style={question.totalOptions >= 3 ? { marginTop: "40px" } : {}}>
                     <img src={question.option.o4} alt='' className={activeOption !== 4 ? "option" : "option optionActive"} />
                     <input type="radio" name="q1" id="a2" className='chooseOption' onClick={() => { setActiveOption(4) }} />
                  </div> : ""}
               </div>
            </div>
         </Body>
      </>
   )
}

export default Structure1to4