import React from "react";
import styled from "styled-components";
import { MdArrowBack } from "react-icons/md";
import { VscBlank } from "react-icons/vsc";

function BackButtonTitle() {
  return (
    <>
      <TopBox>
        <MdArrowBack className="MdArrowBack" />
        <Textbox> ←버튼 + 타이틀</Textbox>
        <VscBlank className="VscBlank" />
      </TopBox>
    </>
  );
}

export default BackButtonTitle;

const TopBox = styled.div`
  position: sticky;
  top: 0%;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  .VscBlank {
    font-size: 35px;
  }
  .MdArrowBack {
    font-size: 40px;
    color: #afafaf;
    padding: 10px;
  }
`;

const Textbox = styled.div`
  font-size: 140%;
  font-weight: bolder;
  margin-top: 15px;
`;
