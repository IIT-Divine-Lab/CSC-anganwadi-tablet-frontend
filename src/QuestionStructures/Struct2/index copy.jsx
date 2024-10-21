import React, { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import "./style.css"

const Struct3 = ({ question }) => {
   const { availableMembers } = useSelector((state) => state.familyTree.familyMembers);
   const members = availableMembers;
   const [droppedMembers, setDroppedMembers] = useState({});
   const [usedMembers, setUsedMembers] = useState([]); // Track globally dropped members

   const handleDrop = (slotName, member) => {
      if (usedMembers.includes(member.name)) return; // Prevent multiple drops for the same member

      setDroppedMembers((prev) => ({ ...prev, [slotName]: member }));
      setUsedMembers((prev) => [...prev, member.name]); // Mark the member as used
   };

   return (
      <div>
         <h2>Drag family members correctly to complete the tree.</h2>
         {/* Available family members for dragging */}
         <FamilyMembers members={members} usedMembers={usedMembers} />

         {/* Family tree flow diagram with drop slots */}
         <FamilyTreeFlow handleDrop={handleDrop} droppedMembers={droppedMembers} />
      </div>
   )
}

export default Struct3

const FamilyMembers = ({ members, usedMembers }) => {
   return (
      <div className="family-members">
         {members.map((member) => (
            <FamilyMember
               key={member.id}
               member={member}
               isDropped={usedMembers.includes(member.name)} // Check if the member is already dropped
            />
         ))}
      </div>
   );
};

const FamilyTreeFlow = () => {
   // Track which members are already dropped and their slots
   const [droppedMembers, setDroppedMembers] = useState({});
   const [usedMembers, setUsedMembers] = useState([]); // Track globally dropped members

   const handleDrop = (slotName, member) => {
      // If the member has already been dropped in another slot, do nothing
      if (usedMembers.includes(member.name)) {
         return;
      }

      // Add member to the dropped members state with their full details
      setDroppedMembers((prev) => ({
         ...prev,
         [slotName]: member
      }));

      // Add this member to the globally used members
      setUsedMembers((prev) => [...prev, member.name]);
   };

   return (
      <div className="family-tree-flow">
         <ul>
            {/* First level (Grandparents) */}
            <li>
               <div className="flow-row">
                  <TreeSlot
                     slotName="grandpa"
                     droppedMember={droppedMembers.grandpa}
                     onDrop={handleDrop}
                  />
                  <TreeSlot
                     slotName="grandma"
                     droppedMember={droppedMembers.grandma}
                     onDrop={handleDrop}
                  />
               </div>

               <ul>
                  {/* Second level (Parents) */}
                  <li>
                     <div className="flow-row">
                        <TreeSlot
                           slotName="dad"
                           droppedMember={droppedMembers.dad}
                           onDrop={handleDrop}
                        />
                        <TreeSlot
                           slotName="mom"
                           droppedMember={droppedMembers.mom}
                           onDrop={handleDrop}
                        />
                     </div>

                     <ul>
                        {/* Third level (Children) */}
                        <li>
                           <div className="flow-row">
                              <TreeSlot
                                 slotName="son"
                                 droppedMember={droppedMembers.son}
                                 onDrop={handleDrop}
                              />
                              <TreeSlot
                                 slotName="daughter"
                                 droppedMember={droppedMembers.daughter}
                                 onDrop={handleDrop}
                              />
                           </div>
                        </li>
                     </ul>
                  </li>
               </ul>
            </li>
         </ul>
      </div>
   );
};

const TreeSlot = ({ slotName, droppedMember, onDrop }) => {
   const [{ isOver }, drop] = useDrop(() => ({
      accept: 'FAMILY_MEMBER',
      drop: (item) => onDrop(slotName, item),
      canDrop: () => !droppedMember, // Only allow drop if the slot is empty
      collect: (monitor) => ({
         isOver: !!monitor.isOver(),
      }),
   }));

   return (
      <div ref={drop} className={`tree-slot ${isOver ? 'over' : ''}`}>
         {droppedMember ? (
            <div className="member">
               <img src={droppedMember.imgSrc} alt={droppedMember.name} />
               <p>{droppedMember.name}</p>
            </div>
         ) : (
            <p>{slotName}</p> // Show the slot name until something is dropped
         )}
      </div>
   );
};

const FamilyMember = ({ member, isDropped }) => {
   const [{ isDragging }, drag] = useDrag(() => ({
      type: 'FAMILY_MEMBER',
      item: { name: member.name, imgSrc: member.imgSrc }, // Pass the image source and name when dragging
      canDrag: () => !isDropped, // Disable dragging if already dropped
      collect: (monitor) => ({
         isDragging: !!monitor.isDragging(),
      }),
   }));

   return (
      <div
         ref={drag}
         className="family-member"
         style={{ opacity: isDragging || isDropped ? 0.5 : 1 }} // Adjust opacity for dropped members
      >
         <img src={member.imgSrc} alt={member.name} />
         <p>{member.name}</p>
      </div>
   );
};