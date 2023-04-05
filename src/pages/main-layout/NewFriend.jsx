import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";

import { ProfilePicSmall } from "../../components/ProfilePics";
import { useNavigate } from "react-router-dom";
import Searchbox from "../../components/Searchbox";
import { WholeViewWidth } from "../../styles/WholeAreaStyle";

const NewFriend = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  const [list, setList] = useState([]);
  const [friendStatus, setFriendStatus] = useState("");
  const [userId, setUserId] = useState(null);
  const [requested, setRequested] = useState(false);

  //프로필 get 해오기!!!

  const getProfile = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/mypage/profile`, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        setUserId(res.data.memberId);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfile();
  }, []);

  const findFriend = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASEURL}/search?name=${inputRef.current}`,
        {
          headers: { Authorization: accessToken },
        }
      );
      console.log(res.data);
      setList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  let inputRef = useRef();

  const onChangeInput = (e) => {
    inputRef.current = e.target.value;
    if (inputRef.current.trim() == '') {
      setList([]);
    } else {
      findFriend();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      findFriend(event);
    }
  };

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
        setRequested(true);
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

  return (
    <>
      <WholeViewWidth>
        <Searchbox
          placeholder='아이디를 검색해 친구를 추가해보세요'
          onChangeInput={onChangeInput}
          onKeyPress={handleKeyDown}
          // value={inputRef}
        />
        {list?.map((item) => (
          <ListCards key={item.memberId}>
            <ListBox>
              <ProfilePicSmall src={item.profileImageUrl} />
              <ListContentBox>
                <StText fontWeight='bold'>{item.name}</StText>
                <StText>{item.statusMessage}</StText>
              </ListContentBox>
            </ListBox>

            <ButtonBox>
              {friendStatus !== "ACCEPTED" &&
                userId != item.memberId &&
                friendStatus !== "PENDING" &&
                !requested && (
                  <AddButton
                    onClick={() => {
                      addFriend(item.memberId);
                    }}
                  >
                    <StText color='#9A9A9A' fontWeight='700'>
                      추가하기 +
                    </StText>
                  </AddButton>
                )}
            </ButtonBox>
          </ListCards>
        ))}
      </WholeViewWidth>
    </>
  );
};

export default NewFriend;

const ListCards = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 24px 0 24px;

  padding: 5px;
`;

const ListBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListContentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  margin-left: 10px;
`;

const StText = styled.div`
  font-size: ${({ size }) => `${size}px`};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;

const ButtonBox = styled.div``;

const AddButton = styled.button`
  height: 25px;
  width: 87px;
  border: none;
  border-radius: 20px;
  text-align: center;
  background: #e3e3e3;

  cursor: pointer;
`;
