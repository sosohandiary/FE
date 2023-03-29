import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import HTMLFlipBook from "react-pageflip";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import curDiaryPageSlice, { syncCurPage } from "../contexts/curDiaryPageSlice";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const Items = ({ currentItems }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
};

const PaginatedItems = ({ itemsPerPage }) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <PaginationStyle>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          activeClassName={"item active "}
          breakClassName={"item break-me "}
          containerClassName={"pagination"}
          disabledClassName={"disabled-page"}
          marginPagesDisplayed={2}
          nextClassName={"item next "}
          pageClassName={"item pagination-page "}
          previousClassName={"item previous"}
        />
      </PaginationStyle>
    </>
  );
};

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
  const onFlip = useCallback((e) => {
    console.log("Current page: " + e.data);
    dispatch(syncCurPage(e.data));
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
      <PaginatedItems itemsPerPage={1} />
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
