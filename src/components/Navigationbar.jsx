import React, { memo } from "react";
import styled from "styled-components";
import { VscHome, VscBell, VscBlank } from "react-icons/vsc";
import { RxMagnifyingGlass, RxPerson } from "react-icons/rx";
import { BiPlus } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import home from "../assets/navbar/home.png";
import bell from "../assets/navbar/bell.png";
import magnifier from "../assets/navbar/magnifier.png";
import person from "../assets/navbar/person.png";
import plus from "../assets/navbar/plus.png";

const Navigationbar = () => {
  const navigate = useNavigate();

  const goToPage = (to) => {
    console.log(to);
    navigate(to);
  };

  return (
    <NavbarArea>
      <div onClick={() => goToPage("/")}>
        <img src={home} />
      </div>
      <div onClick={() => goToPage("/notification")}>
        <img src={bell} />
      </div>
      <div onClick={() => goToPage("/diary")}>
        <img src={plus} />
      </div>
      <div onClick={() => goToPage("/new-friend")}>
        <img src={magnifier} />
      </div>
      <div onClick={() => goToPage("/mypage")}>
        <img src={person} />
      </div>
    </NavbarArea>
  );
};

export default Navigationbar;

const NavbarArea = styled.div`
  width: 100%;
  height: 80px;
  background-color: #fff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  z-index: 1;
  bottom: -1px;
  border-radius: 20px 20px 0 0;
  box-shadow: -2px -2px 9px rgba(0, 0, 0, 0.2);
`;
