import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Navigationbar from "../../components/Navigationbar";

import { SlMagnifier } from "react-icons/sl";
import { MdOutlineCancel } from "react-icons/md";
import { ProfilePicSmall } from "../../components/ProfilePics";
import { useNavigate } from "react-router-dom";

const NewFriend = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  const [friendName, setFriendName] = useState("");
  const [list, setList] = useState([]);
  const [friendStatus, setFriendStatus] = useState("");
  const navigate = useNavigate();

  //로그인 할때 이름? 멤버아이디? 받으면 적용하기
  // const state = useSelector((state) => {
  //   console.log(state.currentUserInfoSlice);
  // })

  const findFriend = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/search?name=${friendName}`, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => console.log(err));
  };

  // console.log(list);

  const addFriend = (id) => {
    console.log(id);
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/friend/request/${id}`,
        {},
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    list?.map((item) => {
      if (item.friendStatus === null) setFriendStatus("null");
      if (item.friendStatus === "ACCEPTED") setFriendStatus("ACCEPTED");
      if (item.friendStatus === "PENDING") setFriendStatus("PENDING");
    });
  }, [findFriend]);

  const goToAcceptFriend = () => {
    navigate("/acceptTest");
  };
  return (
    <>
      <SearchTotalBox>
        <SearchStyleBox>
          <SlMagnifier className="SlMagnifier" />
          <SearchStyle>
            <Searchinput
              type="text"
              name="searchbox"
              placeholder="아이디를 검색해 친구를 추가해보세요"
              onChange={(e) => {
                setFriendName(e.target.value);
              }}
            />
          </SearchStyle>
          <button onClick={findFriend}>찾기</button>
        </SearchStyleBox>
      </SearchTotalBox>
      <button onClick={goToAcceptFriend}>친구 수락</button>
      {list?.map((item) => (
        <ListCards key={item.memberId}>
          <ProfilePicSmall src="https://avatars.githubusercontent.com/u/109452831?v=4" />
          <ListContentBox>{item.name}</ListContentBox>
          {friendStatus !== "ACCEPTED" && (
            <button
              onClick={() => {
                addFriend(item.memberId);
              }}
            >
              추가하기
            </button>
          )}
        </ListCards>
      ))}
    </>
  );
};

export default NewFriend;

const SearchTotalBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 15px 25px 15px;
`;

const SearchStyleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  background-color: #d9d9d948;
  border: none;
  border-radius: 13px;
  padding: 12px 15px 12px 15px;
  .SlMagnifier {
    font-size: 25px;
    color: #7a7a7a;
    padding-left: 5px;
  }
  .MdOutlineCancel {
    font-size: 25px;
    color: #9b9b9b;
    padding-right: 5px;
  }
`;

const SearchStyle = styled.div`
  width: 95%;
  margin-left: 3%;
`;

const Searchinput = styled.input`
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  border: none;
  width: 300px;
`;

const ListCards = styled.div`
  display: flex;
  align-self: flex-start;

  padding: 10px;
`;

const ListContentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 10px;
`;
