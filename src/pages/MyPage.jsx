import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";


import {
  getFriendsCount,
  getMypage,
  getProfile,
  getDiaryCount,
} from "../api/mypage";
import { getDate } from "../utils/getDate";
import { WholeArea } from "../styles/WholeAreaStyle";
import { ProfilePicLarge } from "../components/ProfilePics";

function MyPage() {
  const accessToken = localStorage.getItem("accessToken");

  const { data: myPageData } = useQuery(["getMypage"], () =>
    getMypage(accessToken)
  );

  const { data: profileData } = useQuery(["getProfile"], () =>
    getProfile(accessToken)
  );

  const { data: friednsCount } = useQuery(["getFriendsCount"], () =>
    getFriendsCount(accessToken)
  );

  const { data: diaryCount } = useQuery(["getDiaryCount"], () =>
    getDiaryCount(accessToken)
  );

  const mypage = myPageData?.data;
  const profile = profileData?.data;

  console.log(mypage)

  const navigate = useNavigate();

  const navToProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      <WholeArea style={{ margin: "30px auto", maxWidth: "720px" }}>
        <Title size='18'>마이페이지</Title>
        <ProfilePicLarge src='https://avatars.githubusercontent.com/u/109452831?v=4' />
        <Title size='22'>{profile?.nickname}</Title>

        <NavButton onClick={navToProfile}>
          <Label size='16'>프로필 편집</Label>
        </NavButton>

        <MenuBox>
          <EachMenuBox boderRight='1px solid'>
            <LabelSpan>친구</LabelSpan>
            <div>{friednsCount?.data?.myFriendCount}</div>
          </EachMenuBox>
          <EachMenuBox>
            <LabelSpan>다이어리</LabelSpan>
            <div>{diaryCount?.data?.myDiaryCount}</div>
          </EachMenuBox>
        </MenuBox>
        <Label size='18' alignSelf='flex-start'>
          내 다이어리
        </Label>

        {mypage?.map((item) => {
          return (
            
              <DiaryCards key={item.id}>
                <ThumbnailBox><ThumbnailImg src={item.img}/></ThumbnailBox>
                <div style={{ marginLeft: "70px" }}>
                  <StText fontWeight='bold' size='20'>{item.title}</StText>
                  <StText size='16' color='#B0B0B0'>개설일: {getDate(item.createdAt)} </StText>
                </div>
              </DiaryCards>
            
          );
        })}

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

  display: flex;
  align-self: flex-end;
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

const DiaryCards = styled.div`
  border-radius: 23px;
  width: 80%;
  max-width: 500px;
  padding: 30px;
  position: relative;

  background: #d9d9d9;

  margin: 5px;
`;

const ThumbnailBox = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;

  box-sizing: border-box;
  border-radius: 18px;
`;

const ThumbnailImg = styled.img`
  width: 80px;
  height: 80px;
  background: content-box;
  border-radius: 18px;
`;

const LabelSpan = styled.span`
  color: #858585;
`;

const StText = styled.div`
    font-weight: ${(props) => props.fontWeight};
    font-size: ${({ size }) => `${size}px`};
    color: ${(props) => props.color};
`;