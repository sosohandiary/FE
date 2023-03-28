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

  const navTest = (detailId) => {
      navigate(`detail/${detailId}`)
  }

  return (
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
          <Link to={`/detail/${item.id}`}><StPageCard>{item.customJson}</StPageCard></Link>
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
  );
}

export default SubPage;

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
