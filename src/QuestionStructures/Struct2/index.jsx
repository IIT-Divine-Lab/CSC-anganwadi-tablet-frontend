import React, { useState } from 'react'
import Grandpa from "../../questions/drag-drop/Family member - Grandpa.png"
import Dad from "../../questions/drag-drop/Family member - Dad.png"
import Daughter from "../../questions/drag-drop/Family member - Daughter.png"
import Grandma from "../../questions/drag-drop/Family member - Grandma.png"
import Mom from "../../questions/drag-drop/Family member - Mom.png"
import Son from "../../questions/drag-drop/Family member - Son.png"
import "./style.css"
import FamilyMemberDropGrandma from "../../questions/drag-drop/Family member - drop location - grandma.png"
import FamilyMemberDropGrandpa from "../../questions/drag-drop/Family member - drop location - grandpa.png"
import FamilyMemberDropDad from "../../questions/drag-drop/Family member - drop location - dad.png"
import FamilyMemberDropMom from "../../questions/drag-drop/Family member - drop location - mom.png"
import FamilyMemberDropSon from "../../questions/drag-drop/Family member - drop location - son.png"
import FamilyMemberDropDaughter from "../../questions/drag-drop/Family member - drop location - daughter.png"
import { DndContext } from '@dnd-kit/core'
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';

const Struct2 = () => {

   const [parent, setParent] = useState(null);
   const [draggedIds, setDraggedIds] = useState([String]);

   function handleDragEnd(event) {
      const { over } = event;
      // console.log(event, over);
      // If the item is dropped over a container, set it as the parent
      // otherwise reset the parent to `null`
      setParent(over ? over.id : null);
      console.log([...draggedIds, over.id])
      setDraggedIds([...draggedIds, over.id])

   }

   return (
      <div className='familyQuestContainer'>
         <div className='question'>Select</div>
         <DndContext onDragEnd={handleDragEnd}>

            <div className='familyMembers'>
               <Draggable id="grandpa" draggable={draggedIds.includes("grandpa") ? false : true}>
                  <img src={Grandpa} alt="" />
               </Draggable>
               <Draggable id="dad" draggable={draggedIds.includes("dad") ? false : true}>
                  <img src={Dad} alt="" />
               </Draggable>
               <Draggable id="daughter" draggable={draggedIds.includes("daughter") ? false : true}>
                  <img src={Daughter} alt="" />
               </Draggable>
               <Draggable id="grandma" draggable={draggedIds.includes("grandma") ? false : true}>
                  <img src={Grandma} alt="" />
               </Draggable>
               <Draggable id="mom" draggable={draggedIds.includes("mom") ? false : true}>
                  <img src={Mom} alt="" />
               </Draggable>
               <Draggable id="son" draggable={draggedIds.includes("son") ? false : true}>
                  <img src={Son} alt="" />
               </Draggable>
            </div>
            <div className='familyTree'>
               <Droppable id="grandpa">
                  {parent === "grandpa" || draggedIds.includes("grandpa") ? <img src={Grandpa} alt="" /> : <img src={FamilyMemberDropGrandpa} alt="" />}
               </Droppable>
               <Droppable id="mom">
                  {parent === "mom" || draggedIds.includes("mom") ? <img src={Mom} alt="" /> : <img src={FamilyMemberDropMom} alt="" />}
               </Droppable>
               <Droppable id="son">
                  {parent === "son" || draggedIds.includes("son") ? <img src={Son} alt="" /> : <img src={FamilyMemberDropSon} alt="" />}
               </Droppable>
               <Droppable id="daughter">
                  {parent === "daughter" || draggedIds.includes("daughter") ? <img src={Daughter} alt="" /> : <img src={FamilyMemberDropDaughter} alt="" />}
               </Droppable>
               <Droppable id="dad">
                  {parent === "dad" || draggedIds.includes("dad") ? <img src={Dad} alt="" /> : <img src={FamilyMemberDropDad} alt="" />}
               </Droppable>
               <Droppable id="grandma">
                  {parent === "grandma" || draggedIds.includes("grandma") ? <img src={Grandma} alt="" /> : <img src={FamilyMemberDropGrandma} alt="" />}
               </Droppable>
            </div>
         </DndContext>
      </div>
   )
}

export default Struct2