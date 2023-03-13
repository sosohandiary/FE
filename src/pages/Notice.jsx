import React from "react";
import styled from "styled-components";
import BoardForm from "../styles/BoardForm";
import Body from "../components/Body";

const Notice = () => {
  return (
    <div>
      <NoticeStyle>
        <Body />
      </NoticeStyle>
    </div>
  );
};

export default Notice;

const NoticeStyle = styled.div`
  height: 100vh;
`;
