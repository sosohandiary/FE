import React, { useEffect, useState } from "react";
import styled from "styled-components"; 
import { VscBlank } from "react-icons/vsc";
import { GrayButtonMedium, MintButtonSmall } from "../styles/Buttons"; 
import axios from "axios";  
import { Thumbnail } from "react-bootstrap";  

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
        style={{ margin: "auto", width: "230px", height: "230px", borderRadius: "25px" }}
        />
      )}

      <TitleText>제목</TitleText>
      <TitleContent>
        <input type="text" required />
      </TitleContent>

      <TitleText>소개</TitleText>
      <DescContent>
      <textarea required/>
      </DescContent>

      <TitleText>표지 설정</TitleText>
       
      <input
      name="imgUpload"
        type="file"
        accept="image/jpg, image/png, image/jpeg" 
        onChange={saveFileImage}
      /> 

      <GrayButtonMedium>사진으로 설정하기</GrayButtonMedium>
      <MintButtonSmall>생성하기</MintButtonSmall>

    </Wholebox>
  );
};

export default Diary; 

const TitleContent = styled.div`
  padding: 10px;
  position: relative;
  input {
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    outline: none;
    border-radius: 20px;
    padding: 10px 10px 10px 25px;
    font-size: 16px;
    border: 1px solid #eee;
    background: #f5f5f5;
  } 
`;

const DescContent = styled.div`
  padding: 10px;
  position: relative;
  textarea {
    box-sizing: border-box;
    height: 100px;
    width: 100%;
    outline: none;
    border-radius: 20px;
    padding: 10px 10px 10px 25px;
    font-size: 16px;
    border: 1px solid #eee;
    background: #f5f5f5;
  } 
`;



const TitleText = styled.div`
font-size: 120%;
color: gray; 
`;  

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
  margin-bottom: 10px;
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
  font-size: 110%;
  font-weight: bolder;
  margin: 15px;
`;