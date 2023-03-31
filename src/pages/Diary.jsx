import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { GrayButtonMedium } from "../styles/Buttons";
import axios from "axios";
import { VscBlank } from "react-icons/vsc";

import Navigationbar from "../components/Navigationbar";

const Diary = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState();
  const [diaryCondition, setDiaryCondition] = useState("PUBLIC");

  const handleConditionChange = (event) => {
    setDiaryCondition(event.target.value);
  };

  const handleChange = useCallback((e) => {
    if (e.target.files === null) return;
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  }, []);

  const handleClick = useCallback(async () => {
    if (!file) return;

    const formData = new FormData();
    console.log(file);
    await formData.append("img", file);

    const data = {
      title: title,
      description: description,
      diaryCondition: diaryCondition,
    };

    // for spring server
    await formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    const res = await axios.post(
      `${process.env.REACT_APP_BASEURL}/diary`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      }
    );
    console.log(res);
    if (res.status === 201) console.log(res.data);
  }, [file]);

  return (
    <Wholebox>
      <TopBox>
        <VscBlank className="VscBlank" />
        <Textbox>다이어리 만들기</Textbox>
        <VscBlank className="VscBlank" />
      </TopBox>
      {previewImage && ( // 업로드하려는 이미지를 미리 보여줌
        <img
          alt="preview"
          src={previewImage}
          style={{
            margin: "auto",
            width: "230px",
            height: "230px",
            borderRadius: "25px",
          }}
        />
      )}
      <form onSubmit={handleClick}>
        <TitleText>제목</TitleText>
        <TitleContent>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </TitleContent>

        <TitleText>소개</TitleText>
        <DescContent>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DescContent>

        <TitleText>표지 설정</TitleText>

        <input type={"file"} onChange={handleChange} />
        <GrayButtonMedium>사진으로 설정하기</GrayButtonMedium>
        <Upbutton onClick={handleClick}>업로드</Upbutton>

        <RadioWrapper>
          <label>
            <input
              type="radio"
              value="PUBLIC"
              checked={diaryCondition === "PUBLIC"}
              onChange={handleConditionChange}
            />
            <span>PUBLIC</span>
          </label>
          <label>
            <input
              type="radio"
              value="PRIVATE"
              checked={diaryCondition === "PRIVATE"}
              onChange={handleConditionChange}
            />
            <span>PRIVATE</span>
          </label>
        </RadioWrapper>
      </form>
      <Navigationbar/>
    </Wholebox>
  );
};

export default Diary;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  label {
    display: flex;
    align-items: center;
  }

  input[type="radio"] {
    margin-right: 0.5rem;
    cursor: pointer;
  }
`;

const Upbutton = styled.button`
  color: black;
  background-color: #e8fefb;
  width: 100px;
  height: 35px;
  border: none;
  border-radius: 5px;
  margin: 0px auto;
  font-weight: 700;
  font-size: 100%;
  cursor: pointer;
`;

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
  gap: 10px;
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
