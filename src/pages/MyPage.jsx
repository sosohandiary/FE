import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { WholeArea, WholeAreaWithMargin } from "../styles/WholeAreaStyle";

import {ProfilePicMedium, ProfilePicLarge} from "../components/ProfilePics"

function MyPage() {
  const navigate = useNavigate();

  const navToProfile = () => {
    navigate("/profile");
  };

  const navToFriendsList = () => {
    navigate("/friends-list");
  }
  return (
    <>
      <WholeArea>
        <Title size='18'>마이페이지</Title>
        <ProfilePicLarge src='https://avatars.githubusercontent.com/u/109452831?v=4' />
        <Title size='22'>김소다</Title>

        <NavButton alignSelf='flex-end' onClick={navToProfile}>
          <Label size='16'>프로필 편집</Label>
        </NavButton>

        <MenuBox>
          <EachMenuBox boderRight='1px solid'>
            <NavButton onClick={navToFriendsList}><LabelSpan>친구</LabelSpan></NavButton>
            <div>10</div>
          </EachMenuBox>
          <EachMenuBox>
            <LabelSpan>마일리지</LabelSpan>
            <div>20</div>
          </EachMenuBox>
        </MenuBox>
        <Label size='18' alignSelf='flex-start'>
          내 다이어리
        </Label>

        <DiaryBox>
          <ThumbnailBox>??</ThumbnailBox>
          <div style={{ marginLeft: "80px" }}>
            <Title>같이 여행가자</Title>
            <Label>개설일: 2023.02.10</Label>
          </div>
        </DiaryBox>

        <DiaryBox>
          <ThumbnailBox>??</ThumbnailBox>
          <div style={{ marginLeft: "80px" }}>
            <Title>하드코딩</Title>
            <Label>개설일: 2023.02.10</Label>
          </div>
        </DiaryBox>

        <DiaryBox>
          <ThumbnailBox>??</ThumbnailBox>
          <div style={{ marginLeft: "80px" }}>
            <Title>하드코딩</Title>
            <Label>개설일: 2023.02.10</Label>
          </div>
        </DiaryBox>
      </WholeArea>
    </>
  );
}

export default MyPage;

const Title = styled.div`
  font-weight: bold;
  font-size: ${({ size }) => `${size}px`};
  color: black;

  display: flex;
  padding: 10px;
`;

const Label = styled.div`
  color: #858585;
  font-size: ${({ size }) => `${size}px`};
  display: block;
  font-weight: ${(props) => props.fontWeight};
  margin: 10px;

  display: flex;
  align-self: ${({ alignSelf }) => alignSelf};
`;

const NavButton = styled.button`
  border: none;
  background: none;
  font-size: 16px;

  /* display: flex;
  align-self: flex-end; */
  align-self: ${({ alignSelf }) => alignSelf};
`;

const MenuBox = styled.div`
  /* box-sizing: border-box; */
  display: flex;
  height: 55px;
  width: 50%;
  max-width: 300px;
  outline: none;
  border-radius: 15px;
  padding: 0 10px;
  font-size: 16px;
  border: 1px solid #eee;
  background: #d9d9d9;
  margin-bottom: 20px;

  text-align: center;
  align-items: center;
  justify-content: center;
`;

const EachMenuBox = styled.div`
  cursor: pointer;
  flex: 1;
  line-height: 1.3rem;
  color: ${(props) => props.color};
  border-right: ${(props) => props.boderRight};
  border-right-color: #9e9b9b;

  text-align: center;
  align-items: center;
  justify-content: center;
`;

const DiaryBox = styled.div`
  border-radius: 23px;
  width: 90%;
  max-width: 500px;
  position: relative;

  background: #d9d9d9;

  margin: 5px;
`;

const ThumbnailBox = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;

  box-sizing: border-box;
  background: white;
  padding: 20px;
  border-radius: 18px;
`;

const LabelSpan = styled.span`
  color: #858585;
`;
