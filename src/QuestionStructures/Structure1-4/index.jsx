import React, { useEffect, useRef } from 'react'
import "./style.css"
import { HiSpeakerWave } from "react-icons/hi2";
import Heading from '../../Common/Heading'
import Body from '../../Common/Body';

const Structure1to4 = ({ setActiveOption, activeOption, question }) => {

   const containerRef = useRef([]);
   const imgRef = useRef([]);

   const playAudio = () => {
      var aud = document.getElementById("audioQues");
      aud.play();
   }
   const adjustImageSize = (img, container) => {
      if (img.naturalWidth > img.naturalHeight) {
         img.style.width = '100%'; // Landscape style
      } else {
         img.style.height = '200px'; // Portrait style
         img.style.width = 'auto';
         container.style.width = 'unset';
      }
   };

   useEffect(() => {
      imgRef.current.forEach((img, index) => {
         const container = containerRef.current[index];
         if (img && container) {
            if (img.complete) {
               adjustImageSize(img, container); // Adjust immediately if loaded
            } else {
               img.onload = () => adjustImageSize(img, container); // Adjust on load
            }
         }
      });
   }, [question])

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
                  {
                     Array(question?.totalOptions || 2).fill(0).map((_, index) => {
                        return <div className="optionContainer" ref={(el) => containerRef.current[index] = el}>
                           <img ref={(el) => imgRef.current[index] = el} src={`${question.option["o" + (index + 1)]}`} alt='' className={activeOption !== (index + 1) ? "option" : "option optionActive"} />
                           <input type="radio" name={"q" + (index + 1)} id={"a" + (index + 1)} className='chooseOption' onClick={() => { setActiveOption(index + 1) }} />
                        </div>
                     })
                  }
                  {/* {question.totalOptions >= 2 ? <div className="optionContainer">
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
                  </div> : ""} */}
               </div>
            </div>
         </Body>
      </>
   )
}

export default Structure1to4