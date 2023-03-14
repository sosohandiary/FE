import React from "react";
import styled from "styled-components";
import { VscHome, VscBell, VscBlank } from "react-icons/vsc";
import { RxMagnifyingGlass, RxPerson } from "react-icons/rx";
import { BsPlusLg } from "react-icons/bs";

const Navigationbar = () => {
  return (
    <>
      <BottomBox>
        <VscHome className="VscHome" />
        <VscBell className="VscBell" />
        <BsPlusLg className="BsPlusLg" />
        <RxMagnifyingGlass className="RxMagnifyingGlass" />
        <RxPerson className="RxPerson" />
      </BottomBox>

      <PlusBox>
        <VscBlank className="VscBlank" />
        <BsPlusLg className="BsPlusLg" />
        <VscBlank className="VscBlank" />
      </PlusBox>
    </>
  );
};

export default Navigationbar;

const BottomBox = styled.div`
  position: fixed;
  bottom: 0%;
  width: 100%;
  z-index: 1;
  background-color: #d4d4d4;
  display: flex;
  justify-content: space-evenly;
  .VscHome {
    font-size: 30px;
    padding: 20px;
  }
  .VscBell {
    font-size: 30px;
    padding: 20px;
  }
  .RxMagnifyingGlass {
    font-size: 30px;
    padding: 20px;
  }
  .RxPerson {
    font-size: 30px;
    padding: 20px;
  }
  .BsPlusLg {
    font-size: 30px;
    padding: 20px;
    color: #d4d4d4;
  }
  &:hover {
  }
`;

const PlusBox = styled.div`
  position: fixed;
  bottom: 5%;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-evenly;
  background-color: transparent;
  .BsPlusLg {
    font-size: 40px;
    color: white;
    background-color: #464646;
    border-radius: 40px;
    padding: 5px 5px 5px 5px;
  }
  .VscBlank {
    font-size: 40px;
    color: white;
  }
`;
