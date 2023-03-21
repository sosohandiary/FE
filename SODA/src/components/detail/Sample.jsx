import React, { useState } from "react";
import CommentList from "./CommentList";

//form
const Sample = () => {
  const [inputValue, setInputValue] = useState("");
  const { commentList, setCommentList } = useState([]);
  const addComment = () => {
    console.log("value 여기있어", inputValue);
    setCommentList([...commentList, inputValue]);
  };

  return (
    <div>
      <input value={inputValue} type="text" onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={addComment}>추가</button>
      <CommentList />
    </div>
  );
};

export default Sample;
