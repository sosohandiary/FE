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

  return (
    <BottomBox>
      <VscHome className="VscHome" onClick={() => goToPage("/")} />
      <VscBell className="VscBell" onClick={() => goToPage("/notification")} />
      <div style={{ fontSize: "50px" }} onClick={() => goToPage("/diary")}>
        +
      </div>
      <RxMagnifyingGlass
        className="RxMagnifyingGlass"
        onClick={() => goToPage("/new-friend")}
      />
      <RxPerson className="RxPerson" onClick={() => goToPage("/mypage")} />
    </BottomBox>
  );
};

export default Navigationbar;

const BottomBox = styled.div`
  background-color: #ececec;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  bottom: 0;
  width: 100%;
  .VscHome {
    font-size: 30px;
    padding: 20px;
    transition-duration: 0.5s;
    :hover {
      background-color: #d4d4d4;
    }
    :active {
      background-color: #919191;
    }
  }
  .VscBell {
    font-size: 30px;
    padding: 20px;
    transition-duration: 0.5s;
    :hover {
      background-color: #d4d4d4;
    }
    :active {
      background-color: #919191;
    }
  }
  .BiPlus {
    font-size: 30px;
    padding: 20px;
    color: #ececec;
    transition-duration: 0.5s;
    :hover {
      background-color: #d4d4d4;
    }
    :active {
      background-color: #919191;
    }
  }
  .RxMagnifyingGlass {
    font-size: 30px;
    padding: 20px;
    transition-duration: 0.5s;
    :hover {
      background-color: #d4d4d4;
    }
    :active {
      background-color: #919191;
    }
  }
  .RxPerson {
    font-size: 30px;
    padding: 20px;
    transition-duration: 0.5s;
    :hover {
      background-color: #d4d4d4;
    }
    :active {
      background-color: #919191;
    }
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
