import React from "react";
import styled from "styled-components";
import Navigationbar from "../components/Navigationbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { VscBlank } from "react-icons/vsc";
import { TbBellFilled, TbBellRingingFilled } from "react-icons/tb";

const Notification = () => {
  return (
    <>
      <TopBox>
        <VscBlank className="VscBlank" />
        <Textbox>알림</Textbox>
        <VscBlank className="VscBlank" />
      </TopBox>

      <ArrowBox>
        <AiOutlineArrowLeft className="AiOutlineArrowLeft" />
      </ArrowBox>

      <AlarmBox>
        <AlarmUnread>
          <TbBellRingingFilled className="TbBellRingingFilled" />

          <AlarmUnreadTextBox>
            <AlarmHead>
              <AlarmUnreadTitle>Seryoung_S2 님의 새 댓글 </AlarmUnreadTitle>
              <AlarmUnreadDay>‧ 17시간</AlarmUnreadDay>
            </AlarmHead>
            <AlarmUnreadBody>소다 화이팅!!</AlarmUnreadBody>
          </AlarmUnreadTextBox>
        </AlarmUnread>

        <AlarmRead>
          <TbBellFilled className="TbBellFilled" />
          <AlarmReadTextBox>
            <AlarmHead>
              <AlarmReadTitle>Seryoung_S2 님의 새 메시지</AlarmReadTitle>
              <AlarmReadDay>‧ 2주</AlarmReadDay>
            </AlarmHead>
            <AlarmReadBody>소다 최고!!</AlarmReadBody>
          </AlarmReadTextBox>
        </AlarmRead>

        <AlarmRead>
          <TbBellFilled className="TbBellFilled" />
          <AlarmReadTextBox>
            <AlarmHead>
              <AlarmReadTitle>
                Seryoung_S2 님과 친구가 되었습니다
              </AlarmReadTitle>
              <AlarmReadDay>‧ 2023.03.16</AlarmReadDay>
            </AlarmHead>
            <AlarmReadBody></AlarmReadBody>
          </AlarmReadTextBox>
        </AlarmRead>
      </AlarmBox>

      <Navigationbar />
    </>
  );
};

export default Notification;

const AlarmUnreadDay = styled.div`
  font-size: 90%;
  margin-left: 5px;
`;

const AlarmReadDay = styled.div`
  color: #6b6b6b;
  font-size: 90%;
  margin-left: 5px;
`;
const AlarmHead = styled.div`
  display: flex;
  flex-direction: row;
`;
const AlarmReadTitle = styled.div`
  color: #6b6b6b;
  font-weight: bold;
  font-size: 110%;
`;
const AlarmReadBody = styled.div`
  color: gray;
  font-size: 100%;
  padding-top: 5px;
`;
const AlarmReadTextBox = styled.div`
  padding-top: 12px;
  padding-left: 10px;
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

const AlarmRead = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #38383818;
  background-color: #f7f7f7;
  width: 100%;
  height: 80px;
  .TbBellFilled {
    font-size: 30px;
    margin: 10px 10px 10px 20px;
    color: #a3a3a3;
  }
`;

const AlarmBox = styled.div`
  background-color: white;
  margin-top: 10px;
  margin-bottom: 80px;
`;

const TopBox = styled.div`
  background-color: white;
  position: sticky;
  top: 0%;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
  .VscBlank {
    font-size: 35px;
  }
`;

const Textbox = styled.div`
  font-size: 110%;
  font-weight: bolder;
`;

const ArrowBox = styled.div`
  z-index: 2;
  position: sticky;
  top: 0%;
  background-color: white;
  .AiOutlineArrowLeft {
    font-size: 40px;
    color: #afafaf;
    padding: 10px;
  }
`;
