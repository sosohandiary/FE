import React, { useState } from "react";
import styled from "styled-components";
import { TbBellRingingFilled } from "react-icons/tb";
import axios from "axios";
import { useMutation } from "react-query";
import Draggable from "react-draggable";

const AlarmList = ({ alarmSort, item }) => {
  const accessToken = window.localStorage.getItem("accessToken");

  const getDesc = (alarmSort) => {
    switch (alarmSort) {
      case "friendRequest":
        return "새로운 친구요청이 왔습니다.";
      default:
        return;
    }
  };

  console.log(item);
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (friendId) => {
      return axios.put(
        `${process.env.REACT_APP_BASEURL}/friend/request/accept/${friendId}`,
        {},
        {
          headers: { Authorization: accessToken },
        }
      );
    }
  );

  const admitRequest = (friendListId) => {
    console.log(friendListId);
    mutate(friendListId);
  };
  if (isSuccess) {
    alert("친구를 추가하였습니다");
  }

  const [xMove, setXMove] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const handleStart = (e) => {};
  const handleDrag = (e) => {
    setXMove((prev) => prev + e.movementX);
  };
  const handleStop = () => {
    if (xMove <= -50) {
      setXMove(-50);
      setTimeout(() => {
        setIsOpen(true);
      }, 500);
    } else {
      setXMove(0);
      setIsOpen(false);
    }
  };

  const acceptHandler = () => {
    console.log("Button clicked");
  };

  return (
    <WholeLine>
      <InnerLine isOpen={isOpen}>
        <button onClick={acceptHandler}>수락하기</button>
      </InnerLine>
      <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        bounds={{ top: 0, bottom: 0, left: -50, right: 0 }}
        position={{ x: xMove, y: 0 }}
        grid={[1, 1]}
        scale={1}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <OuterLine className="handle">
          <AlarmUnread>
            <TbBellRingingFilled className="TbBellRingingFilled" />
            <AlarmUnreadTextBox>
              <AlarmHead>
                <AlarmUnreadTitle>{getDesc(alarmSort)}</AlarmUnreadTitle>
              </AlarmHead>
              <AlarmUnreadBody>
                <ProfileAndComment>
                  <UserProfileImg src={item?.profileImageUrl}></UserProfileImg>
                  {item?.nickname}님이 친구 요청을 보냈습니다.
                </ProfileAndComment>
                <div>
                  <button onClick={() => admitRequest(item?.friendListId)}>
                    수락하기
                  </button>
                </div>
              </AlarmUnreadBody>
              <AlarmUnreadTime>
                <AlarmUnreadDay>‧ 17시간</AlarmUnreadDay>
              </AlarmUnreadTime>
            </AlarmUnreadTextBox>
          </AlarmUnread>
        </OuterLine>
      </Draggable>
    </WholeLine>
  );
};

export default AlarmList;

const AlarmUnreadDay = styled.div`
  font-size: 90%;
  margin-left: 5px;
`;

const AlarmHead = styled.div`
  display: flex;
  flex-direction: row;
`;
const AlarmUnreadTitle = styled.div`
  color: black;
  font-weight: bold;
  font-size: 110%;
`;
const AlarmUnreadBody = styled.div`
  color: black;
  font-size: 100%;
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
`;

const ProfileAndComment = styled.div`
  display: flex;
  align-items: center;
`;

const AlarmUnreadTime = styled.div`
  width: 80vw;
  display: flex;
  justify-content: flex-end;
  color: #a7a7a7;
`;
const AlarmUnreadTextBox = styled.div`
  padding-top: 12px;
  padding-left: 10px;
`;

const AlarmUnread = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #cbf0ff;
  border-bottom: 1px solid #38383818;
  width: 100%;
  height: 80px;
  .TbBellRingingFilled {
    font-size: 30px;
    margin: 10px 10px 10px 20px;
    color: gold;
  }
`;

const UserProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const WholeLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
`;

const OuterLine = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
  background-color: #e5e5e5;
  transition: 0.5s;
  transition-timing-function: ease;
`;

const InnerLine = styled.div`
  transition: 0.5s;
  position: absolute;
  right: 0;
  background-color: red;
  z-index: ${({ isOpen }) => (isOpen === true ? 1 : -1)};
`;
