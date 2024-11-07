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
   const adjustImageSize = (img, container, width, height) => {
      if (img.naturalWidth > img.naturalHeight) {
         img.style.width = width; // Landscape style
         img.style.height = height;
      } else {
         img.style.height = height; // Portrait style
         img.style.width = width;
         if (container) container.style.width = 'unset';
      }
      img.style.backgroundColor = "transparent";
   };

   const questionImageRef = useRef();

   useEffect(() => {
      // imgRef.current.forEach((img, index) => {
      //    const container = containerRef.current[index];
      //    if (img && container) {
      //       console.log("1")
      //       let src = img.src;
      //       if (!img.complete) {
      //          img.src = "unset";
      //          if (img.naturalWidth > img.naturalHeight) {
      //             console.log("4")
      //          }
      //          else {
      //             console.log("5")
      //             img.style.width = "150px";
      //             img.style.height = "200px";
      //             img.style.bgColor = "red";
      //          }
      //       }
      //       else {
      //          img.src = src;
      //          img.onload = () => {
      //             if (img.naturalWidth > img.naturalHeight) {
      //                console.log("2")
      //                adjustImageSize(img, container, "100%"); // Adjust immediately if loaded
      //             }
      //             else {
      //                console.log("3")
      //                adjustImageSize(img, container, "auto", "200px"); // Adjust immediately if loaded
      //             }
      //          }
      //       }
      //    }
      //    console.log("\n\n\n");
      // });
      imgRef.current.forEach((img, index) => {
         const container = containerRef.current[index];
         if (img && container) {
            // Set placeholder dimensions initially
            img.style.width = "180px";
            img.style.height = "220px";
            img.style.backgroundColor = "lightgray"; // Light gray background for placeholder

            let src = img.src;
            if (!img.complete) {
               // Show the placeholder while the image is loading
               img.src = ""; // Set src to empty to avoid any display issues
               img.onload = () => {
                  // Image has finished loading, adjust based on aspect ratio
                  if (img.naturalWidth - img.naturalHeight > 20) {
                     console.log("Landscape image loaded");
                     adjustImageSize(img, container, "100%", "unset"); // Full width
                  } else {
                     console.log("Portrait image loaded");
                     adjustImageSize(img, container, "auto", "200px"); // Fixed height
                  }
               };
               img.src = src; // Re-assign the original source to trigger loading
               console.log(img.src);
            } else {
               // Image is already loaded, apply the correct size immediately
               if (img.naturalWidth - img.naturalHeight > 20) {
                  adjustImageSize(img, container, "100%", "unset");
               } else {
                  adjustImageSize(img, container, "auto", "200px");
               }
            }
         }
      });

      if (questionImageRef.current?.complete) {
         let img = questionImageRef.current;
         if (img.naturalWidth - img.naturalHeight > 200) {
            questionImageRef.current.style.height = "200px";
            questionImageRef.current.style.width = "auto";
         }
         else {
            questionImageRef.current.style.width = "300px";
            questionImageRef.current.style.height = "auto";
         }
      }
      else {
         questionImageRef.current.onload = () => {
            let img = questionImageRef.current;
            if (img?.naturalWidth - img?.naturalHeight > 200) {
               questionImageRef.current.style.height = "200px";
               questionImageRef.current.style.width = "auto";
            }
            else {
               questionImageRef.current.style.width = "300px";
               questionImageRef.current.style.height = "auto";
            }
         }
      }

   }, [question, questionImageRef])

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
                     <img ref={questionImageRef} className='quesImageAfter' src={question.questionImage.after} alt="" />
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
                        return <div key={question.questionText + index} className="optionContainer" ref={(el) => containerRef.current[index] = el}>
                           <img ref={(el) => imgRef.current[index] = el} src={`${question.option["o" + (index + 1)]}`} alt='' className={activeOption !== (index + 1) ? "option" : "option optionActive"} />
                           <input type="radio" name={"q" + (index + 1)} id={"a" + (index + 1)} className='chooseOption' onClick={() => { if (imgRef.current[index].complete) setActiveOption(index + 1); else console.log(imgRef.current[index].complete) }} />
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