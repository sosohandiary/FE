import React from "react";
import styled from "styled-components";
import { MdArrowBack, MdOutlineClose } from "react-icons/md";
import { VscBlank } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

export const TitleAndBack = ({ title }) => {
  const navigate = useNavigate();
  const goBackRoute = () => {
    navigate(-1);
  };
  return (
    <>
      <TopBox>
        <MdArrowBack className="MdArrowBack" onClick={goBackRoute} />
        <Textbox>{title}</Textbox>
        <VscBlank className="VscBlank" />
      </TopBox>
    </>
  );
};

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
  .MdOutlineClose {
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

// export const CloseButtonTitle = ({ title }) => {
//   return (
//     <>
//       <TopBox>
//         <MdOutlineClose className="MdOutlineClose" />
//         <Textbox>{title}</Textbox>
//         <VscBlank className="VscBlank" />
//       </TopBox>
//     </>
//   );
// };
