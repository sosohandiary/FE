import React, { useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { VscBlank } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";

function DiaryEdit() {
  const accessToken = window.localStorage.getItem("accessToken");
  const location = useLocation();
  const mypage = location.state;
  const navigate = useNavigate();
  console.log(mypage?.data);

  const [file, setFile] = useState();
  const [title, setTitle] = useState(mypage?.data?.title);
  const [previewImage, setPreviewImage] = useState(mypage?.data?.img);
  const [diaryCondition, setDiaryCondition] = useState(
    mypage?.data?.diaryCondition
  );

  // 공개 비공개 바꾸는거
  const handleConditionChange = (event) => {
    setDiaryCondition(event.target.value);
  };

  // 이미지 파일 올리는 거
  const handleChange = useCallback((e) => {
    if (e.target.files === null) return;
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  }, []);

  // 수정
  const handleClick = useCallback(
    async (e) => {
      e.preventDefault();

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
      console.log(data);
      console.log(...formData);

      try {
        const res = await axios.patch(
          `${process.env.REACT_APP_BASEURL}/diary/${mypage.data.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: accessToken,
            },
          }
        );
        console.log(res.data); // 수정된 다이어리 정보가 포함된 API 응답 데이터
        navigate(`/mypage`);
      } catch (error) {
        console.error("다이어리 수정에 실패했습니다.", error);
      }
    },
    [accessToken, diaryCondition, file, mypage.data.id, navigate, title]
  );

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
          <Upbutton onClick={handleClick}>완료</Upbutton>
        </UpButtonBox>
      </form>
    </Wholebox>
  );
}

export default DiaryEdit;

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
  flex-direction: column;
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

// import React, { useState, useCallback } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import { VscBlank } from "react-icons/vsc";
// import { useLocation, useNavigate } from "react-router-dom";

// function DiaryEdit() {
//   const accessToken = window.localStorage.getItem("accessToken");

//   return (
//     <Wholebox>
//       {previewImage && ( // 업로드하려는 이미지를 미리 보여줌
//         <img
//           alt="preview"
//           src={previewImage}
//           style={{
//             margin: "auto",
//             width: "100px",
//             height: "150px",
//             borderRadius: "25px",
//           }}
//         />
//       )}
//       <div>diaryTitle: {item.diaryTitle}</div>
//       <div>content: {item.content}</div>
//       <div>createdAt: {item.createdAt}</div>
//       <div>diaryTitle: {item.diaryTitle}</div>
//       <div>modifiedAt: {item.modifiedAt}</div>
//       <div>name: {item.name}</div>

//       <Upbutton onClick={handleDelete}>삭제하기</Upbutton>
//     </Wholebox>
//   );
// }

// export default DiaryEdit;

// const Upbutton = styled.button`
//   color: gray;
//   background-color: #e8fefb;
//   width: 100px;
//   height: 35px;
//   border: none;
//   border-radius: 5px;
//   font-weight: 700;
//   font-size: 100%;
//   cursor: pointer;
// `;

// const Wholebox = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 5vw;
// `;
