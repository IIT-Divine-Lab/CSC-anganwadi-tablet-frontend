import React, { useRef, useState } from 'react'
import "./style.css"
import Heading from '../../Common/Heading';
import ParentContainer from '../../Common/ParentContainer';
import Body from '../../Common/Body';
import { Stage, Layer, Line, Rect } from 'react-konva';


const Structure8 = ({ question }) => {
   const [lines, setLines] = useState([]);
   const [isEraser, setIsEraser] = useState(false);
   const [redoLines, setRedoLines] = useState([]); // Track lines for redo
   const isDrawing = useRef(false);
   const stageRef = useRef(null);

   const stageWidth = 450;
   const stageHeight = 450;
   const gridSize = 20;
   const eraserSize = 10; // Define eraser size for deleting lines

   const handleMouseDown = (e) => {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();

      if (isEraser) {
         eraseLineAt(pos);
      } else {
         setLines([...lines, { points: [pos.x, pos.y], stroke: 'black' }]);
         setRedoLines([]); // Clear redo stack on new draw action
      }
   };

   const handleMouseMove = (e) => {
      if (!isDrawing.current) return;

      const stage = stageRef.current;
      const point = stage.getPointerPosition();

      if (isEraser) {
         eraseLineAt(point);
      } else {
         let lastLine = lines[lines.length - 1];
         lastLine.points = lastLine.points.concat([point.x, point.y]);

         lines.splice(lines.length - 1, 1, lastLine);
         setLines(lines.concat());
      }
   };

   const handleMouseUp = () => {
      isDrawing.current = false;
   };

   // Function to remove points that are close to the eraser position
   const eraseLineAt = (pos) => {
      const updatedLines = lines.map((line) => {
         const newPoints = [];
         for (let i = 0; i < line.points.length; i += 2) {
            const x = line.points[i];
            const y = line.points[i + 1];
            // Check if the point is outside the eraser area
            if (Math.hypot(x - pos.x, y - pos.y) > eraserSize) {
               newPoints.push(x, y);
            }
         }
         return { ...line, points: newPoints };
      });

      // Remove lines with no points left
      setLines(updatedLines.filter(line => line.points.length > 0));
   };

   // Undo function
   const handleUndo = () => {
      if (lines.length === 0) return;
      const lastLine = lines.pop();
      setRedoLines([...redoLines, lastLine]); // Save last line for redo
      setLines(lines.concat());
   };

   // Redo function
   // eslint-disable-next-line
   const handleRedo = () => {
      if (redoLines.length === 0) return;
      const lastRedoLine = redoLines.pop();
      setLines([...lines, lastRedoLine]);
   };

   // Toggle eraser mode
   const toggleEraser = () => {
      setIsEraser(!isEraser);
   };

   // Gridlines function
   const renderGridLines = () => {
      const lines = [];
      for (let i = 0; i <= stageWidth / gridSize; i++) {
         lines.push(
            <Line
               key={`v-${i}`}
               points={[i * gridSize, 0, i * gridSize, stageHeight]}
               stroke="#ddd"
               strokeWidth={1}
            />
         );
      }
      for (let j = 0; j <= stageHeight / gridSize; j++) {
         lines.push(
            <Line
               key={`h-${j}`}
               points={[0, j * gridSize, stageWidth, j * gridSize]}
               stroke="#ddd"
               strokeWidth={1}
            />
         );
      }
      return lines;
   };

   return (
      <ParentContainer>
         <Heading>
            {question.questionText}
         </Heading>
         <Body>
            <div style={{
               marginBottom: "40px"
            }}>
               <img style={{ height: "300px", width: "auto" }} className='quesImageAfter' src={question.questionImage.after} alt="" />
            </div>
            <div style={{ marginBottom: '10px' }}>
               <button onClick={handleUndo}>Undo</button>
               <button onClick={toggleEraser}>
                  {isEraser ? 'Switch to Draw' : 'Switch to Eraser'}
               </button>
            </div>
            <Stage
               width={stageWidth}
               height={stageHeight}
               onMouseDown={handleMouseDown}
               onMousemove={handleMouseMove}
               onMouseup={handleMouseUp}
               ref={stageRef}
            >
               <Layer listening={false}>
                  {/* Border */}
                  <Rect
                     x={0}
                     y={0}
                     width={stageWidth}
                     height={stageHeight}
                     stroke="black"
                     strokeWidth={2}
                  />
                  {/* Gridlines */}
                  {renderGridLines()}
               </Layer>
               <Layer>
                  {lines.map((line, i) => (
                     <Line
                        key={i}
                        points={line.points}
                        stroke={line.stroke}
                        strokeWidth={10}
                        tension={0.5}
                        lineCap="round"
                        lineJoin="round"
                     />
                  ))}
               </Layer>
            </Stage>
         </Body>
      </ParentContainer>
   )
}

export default Structure8