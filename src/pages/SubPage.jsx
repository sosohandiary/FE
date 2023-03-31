import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import HTMLFlipBook from "react-pageflip";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";
import ReactPaginate from "react-paginate";

import { getDate } from "../utils/getDate";
import DecorationBoard from "../components/DecorationBoard";

function SubPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const { diaryId } = useParams();

  const accessToken = window.localStorage.getItem("accessToken");

  const fetchData = async (page) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASEURL}/diary/${diaryId}/detail?page=${page}&size=5`,
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => {
        setData([...res.data.content]); // 객체로 반환되길래 배열로 만듬
        setPageCount(res.data.pageableCustom.totalPages);
      });

    return response;
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const goToInnerPaperDetail = (paperId) => {
    navigate(`/test/${diaryId}/${paperId}`);
  };
  const newInnerPaper = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/diary/${diaryId}/detail`,
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
  return (
    <>
      <Title size="18">다이어리 상세보기</Title>
      {data?.map((item, index) => (
        <div key={item.id}>
          {index === 0 && (
            <>
              <div>{item.diaryTitle}</div>
              <div>{getDate(item.createdAt)}</div>
            </>
          )}
        </div>
      ))}
      <button onClick={newInnerPaper}>한장 더 쓰기</button>
      <HTMLFlipBook width={300} height={500}>
        <InnerThumb onClick={() => goToInnerPaperDetail(data[0]?.id)}>
          <div>id : {data[0]?.id}</div>
          <div>diaryTitle : {data[0]?.diaryTitle}</div>
          <div>nickname : {data[0]?.nickname}</div>
          <div>createdAt : {data[0]?.createdAt}</div>
          <div>modifiedAt : {data[0]?.modifiedAt}</div>
          <div>likeCount : {data[0]?.likeCount}</div>
        </InnerThumb>
        <InnerThumb onClick={() => goToInnerPaperDetail(data[1]?.id)}>
          <div>id : {data[1]?.id}</div>
          <div>diaryTitle : {data[1]?.diaryTitle}</div>
          <div>nickname : {data[1]?.nickname}</div>
          <div>createdAt : {data[1]?.createdAt}</div>
          <div>modifiedAt : {data[1]?.modifiedAt}</div>
          <div>likeCount : {data[1]?.likeCount}</div>
        </InnerThumb>
        <InnerThumb onClick={() => goToInnerPaperDetail(data[2]?.id)}>
          <div>id : {data[2]?.id}</div>
          <div>diaryTitle : {data[2]?.diaryTitle}</div>
          <div>nickname : {data[2]?.nickname}</div>
          <div>createdAt : {data[2]?.createdAt}</div>
          <div>modifiedAt : {data[2]?.modifiedAt}</div>
          <div>likeCount : {data[2]?.likeCount}</div>
        </InnerThumb>
        <InnerThumb onClick={() => goToInnerPaperDetail(data[3]?.id)}>
          <div>id : {data[3]?.id}</div>
          <div>diaryTitle : {data[3]?.diaryTitle}</div>
          <div>nickname : {data[3]?.nickname}</div>
          <div>createdAt : {data[3]?.createdAt}</div>
          <div>modifiedAt : {data[3]?.modifiedAt}</div>
          <div>likeCount : {data[3]?.likeCount}</div>
        </InnerThumb>
        <InnerThumb onClick={() => goToInnerPaperDetail(data[4]?.id)}>
          <div>id : {data[4]?.id}</div>
          <div>diaryTitle : {data[4]?.diaryTitle}</div>
          <div>nickname : {data[4]?.nickname}</div>
          <div>createdAt : {data[4]?.createdAt}</div>
          <div>modifiedAt : {data[4]?.modifiedAt}</div>
          <div>likeCount : {data[4]?.likeCount}</div>
        </InnerThumb>
      </HTMLFlipBook>
      <div>
        <StyledPagination
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousLabel="<"
          nextLabel=">"
        />
      </div>
    </>
  );
}

export default SubPage;

const Title = styled.div`
  font-weight: bold;
  font-size: ${({ size }) => `${size}px`};
  color: black;

  display: flex;
  padding: 10px;
`;

const StPageCard = styled.div`
  height: 600px;
  width: 200px;
  background: #f9f9f9;
`;

const StyledPagination = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  & li {
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
    padding: 5px 10px;
    border: none;

    &.active {
      background-color: #007bff;
      color: #fff;
      border-color: #007bff;
    }
  }

  & a {
    display: inline-block;
    padding: 5px 10px;
    /* border: 1px solid #ccc; */
    /* border-radius: 3px; */
    color: #007bff;
    cursor: pointer;
    transition: all 0.3s ease;
    color: black;

    &:hover {
      background-color: #007bff;
      color: #fff;
      border-color: #007bff;
    }
  }

  & .disabled {
    color: #ccc;
    cursor: not-allowed;
    border-color: #ccc;
  }
`;

const StButton = styled.button`
  border: none;
  background: none;
  padding: 0;
`;

const InnerThumb = styled.div`
  background-color: #f3f3f3;
`;
