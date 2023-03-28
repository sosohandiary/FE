import React from "react";
import styled from "styled-components";
import { VscHome, VscBell, VscBlank } from "react-icons/vsc";
import { RxMagnifyingGlass, RxPerson } from "react-icons/rx";
import { BiPlus } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navigationbar = () => {
  const navigate = useNavigate();

  const goToPage = (to) => {
    console.log(to);
    navigate(to);
  };

  const test = () => {
    console.log("dd");
  };
  return (
    <>
      <BiPlus className="BiPlus" onClick={test} />

      <BottomBox onClick={test}>
        <VscHome className="VscHome" onClick={test} />
        <VscBell className="VscBell" onClick={test} />
        <BiPlus className="BiPlus" onClick={test} />
        <RxMagnifyingGlass className="RxMagnifyingGlass" onClick={test} />
        <RxPerson className="RxPerson" onClick={test} />
      </BottomBox>

      {/* <CircleBox>
        <VscBlank className="VscBlank" />
        <FaCircle className="FaCircle" />
        <VscBlank className="VscBlank" />
      </CircleBox>

      <PlusBox>
        <VscBlank className="VscBlank" />
        <BiPlus className="BiPlus" />
        <VscBlank className="VscBlank" />
      </PlusBox> */}
    </>
  );
};

export default Navigationbar;

const BottomBox = styled.div`
  background-color: #ececec;
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
  .BiPlus {
    font-size: 30px;
    padding: 20px;
    color: #ececec;
  }
  .RxMagnifyingGlass {
    font-size: 30px;
    padding: 20px;
  }
  .RxPerson {
    font-size: 30px;
    padding: 20px;
  }
`;

const PlusBox = styled.div`
  position: fixed;
  bottom: 0%;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-evenly;
  background-color: transparent;

  .BiPlus {
    font-size: 35px;
    color: white;
    background-color: #525252;
    border-radius: 35px;
    padding: 8px 8px 8px 8px;
  }
  .VscBlank {
    font-size: 35px;
    color: white;
  }
`;

const CircleBox = styled.div`
  position: fixed;
  bottom: 0%;
  margin-bottom: 7px;
  display: flex;
  justify-content: space-evenly;
  background-color: transparent;
  .FaCircle {
    font-size: 57px;
    color: #bebebe;
    background-color: #bebebe;
    border-radius: 57px;
  }
  .VscBlank {
    font-size: 35px;
    color: white;
  }
`;
