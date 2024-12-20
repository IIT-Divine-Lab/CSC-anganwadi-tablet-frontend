import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export function Draggable(props) {
   const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: props.id,
   });
   const style = transform ? {
      transform: CSS.Transform.toString(transform),
   } : undefined;


   return (
      <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
         {props.children}
      </button>
   );
}