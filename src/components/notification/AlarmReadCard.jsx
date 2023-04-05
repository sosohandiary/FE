import React from "react";
import styled from "styled-components";
import { TbBellFilled } from "react-icons/tb";

function AlarmReadCard() {
  return (
    <AlarmRead>
      <TbBellFilled className="TbBellFilled" />
      <AlarmReadTextBox>
        <AlarmHead>
          <AlarmReadTitle>Seryoung_S2 님과 친구가 되었습니다</AlarmReadTitle>
          <AlarmReadDay>‧ 2023.03.16</AlarmReadDay>
        </AlarmHead>
        <AlarmReadBody></AlarmReadBody>
      </AlarmReadTextBox>
    </AlarmRead>
  );
}

export default AlarmReadCard;

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
