import React from 'react'
import ReactLoading from 'react-loading';

const Loading = () => {
   return (
      <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
         <ReactLoading type={"spinningBubbles"} color={"#162d3a"} width={100} />
      </div>
   )
}

export default Loading