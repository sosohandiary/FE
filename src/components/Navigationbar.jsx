import React, { memo, useState } from "react";
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
import { Badge } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";

const Navigationbar = () => {
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem("accessToken");
  const [navMode, setNavMode] = useState("HOME");

  const { data: dataForInviteAlarm } = useQuery(["getData"], () => {
    return axios.get(`${process.env.REACT_APP_BASEURL}/invite/alarm`, {
      headers: { Authorization: accessToken },
    });
  });

  const { data: dataForFriendAlarm } = useQuery(["getData"], () => {
    return axios.get(`${process.env.REACT_APP_BASEURL}/friend/request`, {
      headers: { Authorization: accessToken },
    });
  });

  const { data: dataForCommentAlarm } = useQuery(["getData"], () => {
    return axios.get(
      `${process.env.REACT_APP_BASEURL}/detail/{detail-id}/comment`,
      {
        headers: { Authorization: accessToken },
      }
    );
  });

  const goToPage = (to) => {
    console.log(to);
    navigate(to);
  };

  return (
    <NavbarArea>
      <div
        onClick={() => {
          goToPage("/");
          setNavMode("HOME");
        }}
      >
        <Button src={home} buttonType={"HOME"} navMode={navMode} />
      </div>
      <div
        onClick={() => {
          goToPage("/notification");
          setNavMode("BELL");
        }}
      >
        <Badge badgeContent={9999} color="primary">
          <Button src={bell} buttonType={"BELL"} navMode={navMode} />
        </Badge>
      </div>
      <div
        onClick={() => {
          goToPage("/diary");
          setNavMode("PLUS");
        }}
      >
        <Button src={plus} buttonType={"PLUS"} navMode={navMode} />
      </div>
      <div
        onClick={() => {
          goToPage("/new-friend");
          setNavMode("MAGNIFIER");
        }}
      >
        <Button src={magnifier} buttonType={"MAGNIFIER"} navMode={navMode} />
      </div>
      <div
        onClick={() => {
          goToPage("/mypage");
          setNavMode("PERSON");
        }}
      >
        <Button src={person} buttonType={"PERSON"} navMode={navMode} />
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

const Button = styled.img`
  transition: 0.1s;
  opacity: ${({ buttonType, navMode }) => (navMode === buttonType ? 1 : 0.3)};
`;
