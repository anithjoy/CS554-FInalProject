import React from "react"

export default function Comment({comment,own}){
  const getTime =(time)=>{
    return time.split('T')[0] + " " + time.split('T')[1].split(".")[0]
  }
  return(
    <div>
      <div>
           <p>{comment.text}</p>
      </div>
      <div>
          {getTime(comment.timeStamp)}
      </div>
      <div>
          {comment.sender}
      </div>
    </div>
  )
};