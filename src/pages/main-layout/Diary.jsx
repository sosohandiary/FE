import React, { useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { VscBlank } from "react-icons/vsc";
import defaultProfileImg from "../../assets/defaultProfileImg.jpeg";
import { useNavigate } from "react-router-dom";

const Diary = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [previewImage, setPreviewImage] = useState(defaultProfileImg);
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

  const handleClick = useCallback(() => {
    if (!file) return;

    const formData = new FormData();
    formData.append("img", file);

    const data = {
      title: title,
      diaryCondition: diaryCondition,
    };
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    axios
      .post(`${process.env.REACT_APP_BASEURL}/diary`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      })
      .then(() => {
        alert("작성이 완료되었습니다.");
        navigate(`/`);
      })
      .catch((error) => {
        console.error(error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      });
  }, [file]);

  return (
    <Wholebox>
      <TopBox>
        <VscBlank className="VscBlank" />
        <Textbox>다이어리 만들기</Textbox>
        <VscBlank className="VscBlank" />
      </TopBox>

      <InputBox>
        <VscBlank className="VscBlank" />
        <FileInput
          type="file"
          onChange={handleChange}
          className="StyledInput"
        />
        <VscBlank className="VscBlank" />
      </InputBox>

      {previewImage && ( // 업로드하려는 이미지를 미리 보여줌
        <img
          alt="preview"
          src={previewImage}
          style={{
            margin: "auto",
            width: "100px",
            height: "150px",
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

        <PrivateorPublicBox>
          <VscBlank className="VscBlank" />
          <RadioWrapper>
            <label>
              <input
                type="radio"
                value="PRIVATE"
                checked={diaryCondition === "PRIVATE"}
                onChange={handleConditionChange}
              />
              <span>비공개</span>
            </label>
            <label>
              <input
                type="radio"
                value="PUBLIC"
                checked={diaryCondition === "PUBLIC"}
                onChange={handleConditionChange}
              />
              <span>공개</span>
            </label>
          </RadioWrapper>
        </PrivateorPublicBox>

        <UpButtonBox>
          <VscBlank className="VscBlank" />
          <Upbutton onClick={handleClick}>생성하기</Upbutton>
          <VscBlank className="VscBlank" />
        </UpButtonBox>
      </form>
    </Wholebox>
  );
};

export default Diary;
const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  margin-right: 10px;
  justify-content: space-between;
`;

const FileInput = styled.input`
  margin: 0 auto;
  &::-webkit-file-upload-button {
    background-color: #d9d9d9;
    color: gray;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bolder;
  }
`;

const PrivateorPublicBox = styled.div`
  display: flex;
  flex-direction: row;
  margin 10px;
  justify-content: space-between;
`;

const UpButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  justify-content: space-between;
`;

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
  color: gray;
  background-color: #e8fefb;
  width: 100px;
  height: 35px;
  border: none;
  border-radius: 5px;
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

const TitleText = styled.div`
  font-size: 120%;
  color: gray;
`;

const Wholebox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5vw;
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
