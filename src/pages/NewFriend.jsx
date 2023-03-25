import React, { useState } from "react";
import styled from "styled-components";
import Navigationbar from "../components/Navigationbar";
import { SlMagnifier } from "react-icons/sl";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";

const NewFriend = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  console.log(accessToken);
  const [friendName, setFriendName] = useState("");
  const [list, setList] = useState([]);

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
  console.log(list);

  const addFriend = (id) => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_BASEURL}/friend/request/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
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
      {list?.map((item) => (
        <div>
          <div>{item.member_id}</div>
          <button
            onClick={() => {
              addFriend(item.member_id);
            }}
          >
            추가하기
          </button>
        </div>
      ))}

      <Navigationbar />
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
