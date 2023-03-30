import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import HTMLFlipBook from "react-pageflip";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import curDiaryPageSlice, { syncCurPage } from "../contexts/curDiaryPageSlice";
import { Pagination } from "antd";

const DiaryDetail = () => {
  const dispatch = useDispatch();
  const accessToken = window.localStorage.getItem("accessToken");
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/diary/1/detail?page=1&size=5`, {
        headers: { Authorization: accessToken },
      })
      .then((res) => setBooks(res.data.content))
      .catch((err) => console.log(err));
  }, []);

  // books?.map((item, i) => {
  //   return (
  //     <div key={i} className="demoPage">
  //       <div>diaryTitle: {item.diaryTitle}</div>
  //       <div>content: {item.content}</div>
  //       <div>createdAt: {item.createdAt}</div>
  //       <div>diaryTitle: {item.diaryTitle}</div>
  //       <div>modifiedAt: {item.modifiedAt}</div>
  //       <div>name: {item.name}</div>
  //     </div>
  //   );
  // });

  //플립 페이지 책 관련
  const [curPage, setCurPage] = useState(1);
  const onFlip = useCallback((e) => {
    console.log("Current page: " + e.data);
    setCurPage(e.data);
  }, []);

  return (
    <div>
      <CardStyle>
        {books?.map((item) => {
          return (
            <div>
              <div>diaryTitle: {item.diaryTitle}</div>
              <div>content: {item.content}</div>
              <div>createdAt: {item.createdAt}</div>
              <div>diaryTitle: {item.diaryTitle}</div>
              <div>modifiedAt: {item.modifiedAt}</div>
              <div>name: {item.name}</div>
            </div>
          );
        })}
      </CardStyle>
      <HTMLFlipBook width={300} height={500} onFlip={onFlip} id="flip-book">
        <div className="demoPage">Page 1</div>
        <div className="demoPage">Page 2</div>
        <div className="demoPage">Page 3</div>
        <div className="demoPage">Page 4</div>
        {books.map((item) => (
          <div className="demoPage">
            <div>diaryTitle: {item.diaryTitle}</div>
            <div>Name : {item.name}</div>
            <div>content: {item.content}</div>
            <div>createdAt: {item.createdAt}</div>
            <div>diaryTitle: {item.diaryTitle}</div>
            <div>modifiedAt: {item.modifiedAt}</div>
          </div>
        ))}
      </HTMLFlipBook>
      <Pagination
        defaultCurrent={1}
        total={500}
        current={curPage + 1}
        onChange={() => {}}
        showSizeChanger={false}
      />
    </div>
  );
};

export default DiaryDetail;

const CardStyle = styled.div``;

// 페이지네이션 스타일
const PaginationStyle = styled.div`
  .item {
    align-items: center;
    color: #fff;
    cursor: pointer;
    display: flex;
    font-size: 14px;
    height: 40px;
    justify-content: center;
    width: 40px;
  }

  .disabled-page {
    color: #808e9b;
  }

  .active {
    border: solid 1px #808e9b;
    border-radius: 40px;
    color: #808e9b;
  }

  .break-me {
  }

  .next {
    border-left: solid 1px #808e9b;
    font-size: 4px;
    height: 60px;
    position: absolute;
    right: 0;
    width: 150px;
  }

  .pagination {
    align-items: center;
    background-color: #0fbcf9;
    display: flex;
    flex-direction: row;
    height: 60px;
    justify-content: center;
    list-style-type: none;
    position: relative;
    width: 1000px;
  }

  .pagination-page {
    font-weight: 700;
  }

  .previous {
    border-right: solid 1px #808e9b;
    font-size: 4px;
    height: 60px;
    left: 0;
    position: absolute;
    width: 150px;
  }
`;
