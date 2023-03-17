import React, { useState } from "react";
import "../../styles/detail.css";
import { CiEraser, CiTrash } from "react-icons/ci";

const Comment = ({ id, userName, content, handleDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // 변경된 댓글 내용을 저장하는 함수 호출
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setUpdatedContent(content);
    setIsEditing(false);
  };

  const handleContentChange = (event) => {
    setUpdatedContent(event.target.value);
  };

  const handleDeleteClick = () => {
    handleDelete(id);
  };

  if (isEditing) {
    return (
      <div className="commentDiv">
        <input type="text" value={updatedContent} onChange={handleContentChange} />
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={handleCancelClick}>Cancel</button>
      </div>
    );
  } else {
    return (
      <div className="commentDiv">
        <p>
          {userName}: {content}
        </p>
        <CiEraser onClick={handleEditClick}>Edit</CiEraser>
        <CiTrash onClick={handleDeleteClick}></CiTrash>
      </div>
    );
  }
};

export default Comment;
