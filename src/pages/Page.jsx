import React, { useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { VscBlank } from "react-icons/vsc";
import { MdArrowBack } from "react-icons/md";
import HTMLFlipBook from "react-pageflip";

function Page() {
  const accessToken = window.localStorage.getItem("accessToken");
  const location = useLocation();
  const mypage = location.state;
  const navigate = useNavigate();
  console.log(mypage.data);
  const [previewImage, setPreviewImage] = useState(mypage?.data.img);

  // 수정
  const handleClick = () => {
    navigate(`/diaryedit/${mypage.data.id}`, {
      state: {
        data: mypage.data,
      },
    });
  };

  // 삭제
  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: accessToken,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_BASEURL}/diary/${mypage.data.id}`,
        config
      );
      navigate(`/mypage`);
      alert("삭제가 완료되었습니다!");
    } catch (error) {
      console.error("다이어리 삭제에 실패했습니다:", error);
    }
  };

  const newInnerPaper = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/diary/{diaryId}/detail`,
        {
          customJson: "",
          content: "",
        },
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => {
        console.log(res);
        alert("한 장 더 추가되었습니다");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const goToInnerPaperDetail = () => {
    navigate(`/diaries/{diaryId}/{paperId}`);
  };

  return (
    <Wholebox>
      <TopBox>
        <MdArrowBack className="MdArrowBack" />
        <Textbox>다이어리 상세보기</Textbox>
        <VscBlank className="VscBlank" />
      </TopBox>
      <h2>{mypage?.data?.title}</h2>
      <div>개설일: {mypage?.data?.createdAt}</div>
      <div>
        {mypage?.data?.diaryCondition === "public"
          ? "공개 다이어리"
          : "비공개 다이어리"}
      </div>
      <Upbutton onClick={handleClick}>수정하기</Upbutton>
      <Upbutton onClick={handleDelete}>삭제하기</Upbutton>
      {previewImage && ( // 업로드하려는 이미지를 미리 보여줌
        <img
          alt="preview"
          src={previewImage}
          style={{
            margin: "auto",
            width: "300px",
            height: "400px",
            borderRadius: "7px",
          }}
        />
      )}
    </Wholebox>
  );
}

export default Page;

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
    color: #afafaf;
    padding: 10px;
  }
  .MdArrowBack {
    font-size: 35px;
    color: #afafaf;
    padding: 10px;
  }
`;

const Textbox = styled.div`
  font-size: 110%;
  font-weight: bolder;
  margin: 15px;
`;

const InnerThumb = styled.div`
  background-color: #f3f3f3;
`;
