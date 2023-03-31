import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";

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
        console.log(res.data);
        setData(res.data.content);
        setPageCount(res.data.pageableCustom.totalPages);
      });

    return response;
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  console.log(currentPage);

  const NavButton = (detailId) => {

    navigate(`/diaries/${diaryId}/${detailId}`)
  }

  return (
    <>
      <Title size='18'>다이어리 상세보기</Title>
      {data?.map((item, index) => {
        return (
          <div key={item.id}>
            {index === 0 && (
              <>
                <div>{item.diaryTitle}</div>
                <div>{getDate(item.createdAt)}</div>
              </>
            )}
          </div>
        );
      })}
      <div>
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          pagination={{
            clickable: true,
            // renderBullet: (index,className )=>{
            //   return '<span class="' + className + '">' + (index + 1) + '</span>';
            // }
          }}
          modules={[Pagination]}
          className='mySwiper'
        >
          {data?.map((item) => (
            <SwiperSlide key={item.id}>
              <img src={item.url} alt={item.title} />
              {/* <StButton onClick={()=>{navTest(item.id)}}><StPageCard>{item.customJson}</StPageCard></StButton> */}
              <StButton onClick={()=>NavButton(item.id)}>
                <StPageCard>
                  <DecorationBoard
                    customJson={item.customJson}
                  ></DecorationBoard>
                </StPageCard>
              </StButton>
            </SwiperSlide>
          ))}
        </Swiper>
        <StyledPagination
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousLabel='<'
          nextLabel='>'
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
  /* background: #f9f9f9; */
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
