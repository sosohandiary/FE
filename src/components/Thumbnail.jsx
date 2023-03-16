import React from "react";
import styled from "styled-components";
import Navigationbar from "./Navigationbar";

const Thumbnail = () => {
  const goToDiary = () => {
    alert("해당 다이어리로 이동");
  };
  return (
    <div>
      <ThumbnailCard onClick={goToDiary}>Thumbnail</ThumbnailCard>
      <Navigationbar />
    </div>
  );
};

export default Thumbnail;

const ThumbnailCard = styled.div`
  background-color: #a6a6a6;
  height: 200px;
  margin-bottom: 20px;
`;
