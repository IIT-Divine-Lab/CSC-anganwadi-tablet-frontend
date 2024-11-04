import React, { useRef, useState } from 'react'
import Heading from '../../Common/Heading';
import ParentContainer from '../../Common/ParentContainer';

const Structure7 = () => {
   const leftColumn = [
      {
         val: "Tongue",
         color: "#4a94c3",
         bgCol: "#a2d5f2"
      },
      {
         val: "Eyes",
         color: "#5ea785",
         bgCol: "#b2e7c8"
      },
      {
         val: "Ear",
         color: "#e08d60",
         bgCol: "#ffd7ba"
      },
      {
         val: "Skin",
         color: "#a97bc3",
         bgCol: "#e7cffd"
      },
      {
         val: "Nose",
         color: "#c4a945",
         bgCol: "#fff4b8"
      },
   ]
   const rightColumn = [
      "Ball",
      "Jalebi",
      "Agarbatti",
      "Ice",
      "Speaker"
   ]

   const [selectedLeft, setSelectedLeft] = useState(null);
   const [matches, setMatches] = useState([]);
   const [matchedLeft, setMatchedLeft] = useState([]);
   const [matchedRight, setMatchedRight] = useState([])

   const leftRefs = useRef([]);
   const rightRefs = useRef([]);
   const containerRef = useRef();

   const handleLeftClick = (item) => {
      if (!((matchedLeft.findIndex(val => val.val === item.val) + 1) !== 0)) {
         console.log(item);
         setSelectedLeft(item);
      }
      else {
         console.log("Clicked");
         setMatchedLeft(matchedLeft.filter((val) => val.val !== item.val))
         let right = matches.filter((val) => val.left.val === item.val)[0].right;
         setMatchedRight(matchedRight.filter((val) => val !== right));
         setMatches(matches.filter((val) => val.left.val !== item.val))
         setSelectedLeft(item);
      }
   };
   const handleRightClick = (item) => {
      if (selectedLeft && !matchedRight.includes(item)) {
         const leftIndex = leftColumn.findIndex((val) => val.val === selectedLeft.val);
         const rightIndex = rightColumn.indexOf(item);

         const leftRect = leftRefs.current[leftIndex].getBoundingClientRect();
         const rightRect = rightRefs.current[rightIndex].getBoundingClientRect();

         const containerRect = containerRef.current.getBoundingClientRect();

         const leftCenter = {
            x: leftRect.right - containerRect.left, // Adjusted relative to container
            y: leftRect.top + leftRect.height / 2 - containerRect.top,
         };
         const rightCenter = {
            x: rightRect.left - containerRect.left, // Adjusted relative to container
            y: rightRect.top + rightRect.height / 2 - containerRect.top,
         };

         // Store the match with coordinates
         setMatches([...matches, { left: selectedLeft, right: item, leftCenter, rightCenter }]);
         setMatchedLeft([...matchedLeft, selectedLeft]);
         setMatchedRight([...matchedRight, item]);
         setSelectedLeft(null);
      }
   }

   return (
      <ParentContainer>
         <Heading>
            Match the senses to the objects.
         </Heading>
         <div style={{ display: 'flex', flexDirection: "column", padding: '20px' }}>
            <div style={{ display: "flex" }}>
               <div style={{ backgroundColor: "transparent" }}>
                  {leftColumn.map((item, index) => {
                     return <div
                        key={index}
                        ref={(el) => (leftRefs.current[index] = el)}
                        onClick={() => handleLeftClick(item)}
                        style={{
                           backgroundColor: ((matchedLeft.findIndex(val => val.val === item.val) + 1) !== 0) ? item.bgCol : 'transparent',
                           border: (selectedLeft?.val === item.val || matchedLeft.findIndex(val => val.val === item.val) + 1 !== 0) ? '3px solid ' + item.color : '3px solid black',
                           fontSize: "28px",
                           textAlign: "center",
                           width: "250px",
                           padding: '10px',
                           margin: "25px 0",
                           cursor: "pointer",
                           borderRadius: "10px"
                        }}
                     >
                        {item.val}
                     </div>
                  })}
               </div>

               <div style={{ position: "relative", width: '100px' }} ref={containerRef}>
                  <svg style={{ position: 'absolute', top: 0, left: 0, width: '100px', height: '100%' }}>
                     {
                        matches.map((match, index) => (
                           <line
                              key={index}
                              x1={match.leftCenter.x}
                              y1={match.leftCenter.y}
                              x2={match.rightCenter.x}
                              y2={match.rightCenter.y}
                              stroke={match.left.color}
                              strokeWidth="2"
                           />
                        ))}
                  </svg>
               </div>

               <div>
                  {rightColumn.map((item, index) => (
                     <div
                        key={item}
                        ref={(el) => (rightRefs.current[index] = el)}
                        onClick={() => handleRightClick(item)}
                        style={{
                           backgroundColor: matchedRight.includes(item) ? matches[matches.findIndex((val) => val.right === item)].left.bgCol : 'white',
                           border: matchedRight.includes(item) ? '3px solid' + matches[matches.findIndex((val) => val.right === item)].left.color : '3px solid white',
                           fontSize: "28px",
                           textAlign: "center",
                           width: "250px",
                           padding: '10px',
                           margin: "25px 0",
                           cursor: "pointer",
                           borderRadius: "10px"
                        }}
                     >
                        {item}
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </ParentContainer>
   )
}

export default Structure7