import React from "react";
import styled from "styled-components";

const Thumbnail = () => {
  const goToDiary = () => {
    alert("해당 다이어리로 이동");
  };
  return <ThumbnailCard onClick={goToDiary}>Thumbnail</ThumbnailCard>;
};

export default Thumbnail;

const ThumbnailCard = styled.div`
  background-color: #a6a6a6;
  height: 200px;
  margin-bottom: 20px;
  border-radius: 30px;
`;
