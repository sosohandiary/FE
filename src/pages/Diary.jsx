import React, { useEffect, useState } from "react";
import styled from "styled-components"; 
import { VscBlank } from "react-icons/vsc";
import { GrayButtonMedium, MintButtonSmall } from "../styles/Buttons"; 
import axios from "axios";  

function Diary() {

   //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState("");

  // 파일 저장
  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Wholebox>
      <TopBox>
        <VscBlank className="VscBlank" />
        <Textbox>다이어리 만들기</Textbox>
        <VscBlank className="VscBlank" />
      </TopBox>
      {fileImage && ( 
        <img alt="sample" 
        src={fileImage} 
        style={{ margin: "auto", width: "300px", height: "300px", borderRadius: "25px" }}
        />
      )}
      <label>제목</label>
      <input
        type="text"
      />
      <label>소개</label>
      <input
        type="text"
      />
      <label>표지 설정</label>
       
      <input
      name="imgUpload"
        type="file"
        accept="image/jpg, image/png, image/jpeg" 
        onChange={saveFileImage}
      /> 

      <GrayButtonMedium>사진으로 설정하기</GrayButtonMedium>
      <MintButtonSmall >생성하기</MintButtonSmall>
    </Wholebox>
  );
};

export default Diary; 

const Wholebox = styled.div`
  display: flex;
  flex-direction: column; 
`; 

const TopBox = styled.div`
background-color: white;
  position: sticky;
  top: 0%;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
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
  margin: 15px;
`;