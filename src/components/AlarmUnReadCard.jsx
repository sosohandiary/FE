import React from "react";
import styled from "styled-components";
import { TbBellRingingFilled } from "react-icons/tb";

function AlarmUnReadCard() {
  return (
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
  );
}

export default AlarmUnReadCard;

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
