import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";

import { WholeArea } from "../styles/WholeAreaStyle";

function SubPage() {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const { diaryId } = useParams();

  const accessToken = window.localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/diary/${diaryId}/detail?page=0&size=5`,
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => {
        setData(res.data.content);
        console.log(res);
        setNumberOfPages(Math.ceil(res.data.length / 5));
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(data);

  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className='mySwiper'
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            {/* <img src={item.url} alt={item.title} /> */}
            <StPageCard>{item.customJson}</StPageCard>
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
}

export default SubPage;

const StPageCard = styled.div`
  height: 500px;
`;
