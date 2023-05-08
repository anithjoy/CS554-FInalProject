import React from "react"

export default function Comment({comment,own}){
  const getTime =(time)=>{
    return time.split('T')[0] + " " + time.split('T')[1].split(".")[0]
  }
  return(
    <div className="commentContainer">
      <div className="commentText">
           <p>{comment.text}</p>
      </div>
      <div className="commentDetails">
        <span className="commentSender">{comment.sender}</span>
        <span className="commentTimestamp">{getTime(comment.timeStamp)}</span>
      </div>
    </div>
  )
};