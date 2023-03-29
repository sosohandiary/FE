import React, { useState } from "react";
import styled from "styled-components";
import { WholeArea } from "../styles/WholeAreaStyle";

const TestAnimation = () => {
  const [prevItem, setPrevItem] = useState(0);
  const [centerItem, setCenterItem] = useState(1);
  const [nextItem, setNextItem] = useState(2);

  const [carouselDeg, setCarouselDeg] = useState(17);
  const [itemDeg, setItemDeg] = useState(-17);
  const [carousel, setCarousel] = useState([
    { name: "1", id: 0 },
    { name: "2", id: 1 },
    { name: "3", id: 2 },
    { name: "4", id: 3 },
    { name: "5", id: 4 },
    { name: "6", id: 5 },
    { name: "7", id: 6 },
    { name: "8", id: 7 },
    { name: "9", id: 8 },
  ]);

  const next = () => {
    setCarouselDeg(carouselDeg - 36);
    setItemDeg(itemDeg + 36);
    setNextItem((prev) => (prev == 8 ? 0 : prev + 1));
    setCenterItem((prev) => (prev == 8 ? 0 : prev + 1));
    setPrevItem((prev) => (prev == 8 ? 0 : prev + 1));
  };

  const prev = () => {
    setCarouselDeg(carouselDeg + 36);
    setItemDeg(itemDeg - 36);
  };

  const getCssClass = (id) => {
    console.log(centerItem, nextItem, prevItem);
    if (id === centerItem) {
      return "center";
    } else if (id === nextItem) {
      return "next";
    } else if (id === prevItem) {
      return "prev";
    }
  };

  return (
    <WholeArea>
      <AllStyle>
        <div className="App">
          <button onClick={next}>Next</button>
          <button onClick={prev}>Prev</button>
          <div className="test" />
          <div
            className="carousel"
            style={{ transform: `rotate(${carouselDeg}deg)` }}
          >
            {carousel.map((item, index) => (
              <div
                className={`item-carousel ${getCssClass(index)}`}
                key={item.id}
                id={item.id}
                style={{ transform: `rotate(${itemDeg}deg)` }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </AllStyle>
    </WholeArea>
  );
};

export default TestAnimation;

const AllStyle = styled.div`
  .App {
    font-family: sans-serif;
    overflow: hidden;
    height: 100vh;
  }

  .carousel {
    position: relative;
    width: 140vw;
    height: 140vw;
    border: 2px solid;
    border-radius: 50%;
    transition: 0.5s;
    transform: rotate(15deg);
    transform-origin: center center;
    background-color: #f3f3f3;
  }
  // .test {
  //   position: absolute;
  //   left: 600px;
  //   width: 20px;
  //   height: 364px;
  //   background: #000;

  //   &:before {
  //     content: '';
  //     position: absolute;
  //     width: 20px;
  //     height: 20px;
  //     background: red;
  //     z-index: 1111;
  //     top: 50%;
  //     transform: translateY(-50%);
  //   }
  // }
  .carousel::before {
    /* content: ""; */
    position: absolute;
    width: 50%;
    height: 100%;
    background: #000;
    border-radius: 50% 0 0 50%;
  }
  // с = 2 Pr
  .item-carousel {
    position: absolute;
    border-radius: 10%;
    border: 1px solid red;
    background: #fff;
    width: 100px;
    height: 141px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    margin: 2px;
    bottom: 0;
    transition: 0.5s;

    &.next {
      background: blue;
      color: white;
    }
    &.prev {
      background: green;
      color: white;
    }

    &.center {
      background: #000;
      color: white;
      width: 130px;
      height: 183.3px;
    }

    &:nth-child(1) {
      right: 300px;
      top: 473px;
    }
    &:nth-child(2) {
      right: 26vw;
      top: 110vw;
    }
    &:nth-child(3) {
      right: 30px;
      top: 423px;
    }
    &:nth-child(4) {
      right: 156px;
      top: 337px;
    }
    &:nth-child(5) {
      right: 263px;
      top: 302px;
    }
    &:nth-child(6) {
      right: 330px;
      top: 210px;
    }
    &:nth-child(7) {
      right: 330px;
      top: 100px;
    }
    &:nth-child(8) {
      right: 263px;
      top: 7px;
    }
    &:nth-child(9) {
      right: 156px;
      top: -27px;
    }
    &:nth-child(10) {
      right: 347px;
      top: 524px;
    }
  }
`;
