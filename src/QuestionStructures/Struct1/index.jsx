import React from 'react'
import './style.css'
import { HiSpeakerWave } from "react-icons/hi2";

const Struct1 = ({ activeOption, setActiveOption, question }) => {

   const playAudio = () => {
      var aud = document.getElementById("audioQues");
      aud.play();
   }

   return (
      <>
         {
            question.structure === 1 || question.structure === 2 ?
               <div style={question.structure === 1 ? { width: "100%" } : question.structure === 2 ? {} : {}}>
                  <img className='quesImage' src={question.questionImage} alt="" />
               </div>
               : question.structure === 3 ?
                  <>
                     <audio loops={false} id='audioQues' className='audioQues' src={question.questionSound}></audio>
                     <HiSpeakerWave onClick={playAudio} className='speaker' />
                  </>
                  : ""
         }
         {
            question.structure === 1 || question.structure === 3 ?
               <div className="quesOptionContainer">
                  <div className='rowContainer' style={question.totalOptions >= 4 ? { flexWrap: "wrap" } : {}}>
                     <div className="optionContainer">
                        <img src={question.option.o1} alt='' className={activeOption !== 1 ? "option" : "option optionActive"} />
                        <input type="radio" name="q1" id="a1" className='chooseOption' onClick={() => { setActiveOption(1) }} />
                     </div>
                     {question.totalOptions >= 2 ? <div className="optionContainer">
                        <img src={question.option.o2} alt='' className={activeOption !== 2 ? "option" : "option optionActive"} />
                        <input type="radio" name="q1" id="a2" className='chooseOption' onClick={() => { setActiveOption(2) }} />
                     </div> : ""}
                     {question.totalOptions >= 3 ? <div className="optionContainer" style={question.totalOptions >= 4 ? { marginLeft: "0px", marginTop: "40px" } : {}}>
                        <img src={question.option.o3} alt='' className={activeOption !== 3 ? "option" : "option optionActive"} />
                        <input type="radio" name="q1" id="a3" className='chooseOption' onClick={() => { setActiveOption(3) }} />
                     </div> : ""}
                     {question.totalOptions >= 4 ? <div className="optionContainer" style={question.totalOptions >= 4 ? { marginTop: "40px" } : {}}>
                        <img src={question.option.o4} alt='' className={activeOption !== 4 ? "option" : "option optionActive"} />
                        <input type="radio" name="q1" id="a2" className='chooseOption' onClick={() => { setActiveOption(4) }} />
                     </div> : ""}
                  </div>
               </div>
               : question.structure === 2 ?
                  <div className="s2OptionImage">
                     <img src={question.answerImage} alt="" />
                     <div className="options">
                        <img className='egg' src={activeOption === 1 ? question.option.active : question.option.inactive} alt="" onClick={() => setActiveOption(1)} />
                        <img className='egg' src={activeOption === 2 ? question.option.active : question.option.inactive} alt="" onClick={() => setActiveOption(2)} />
                        <img className='egg' src={activeOption === 3 ? question.option.active : question.option.inactive} alt="" onClick={() => setActiveOption(3)} />
                        <img className='egg' src={activeOption === 4 ? question.option.active : question.option.inactive} alt="" onClick={() => setActiveOption(4)} />
                     </div>
                  </div> : ""}
      </>
   )
}

export default Struct1