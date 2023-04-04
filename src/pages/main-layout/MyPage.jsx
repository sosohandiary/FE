import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";

import {
  getFriendsCount,
  getMypage,
  getProfile,
  getDiaryCount,
} from "../../api/mypage";
import { getDate } from "../../utils/getDate";
import { WholeArea, WholeViewWidth } from "../../styles/WholeAreaStyle";
import { ProfilePicLarge } from "../../components/ProfilePics";
import { IoIosArrowForward } from "react-icons/io";
import { MdArrowBack } from "react-icons/md";
import Navigationbar from "../../components/Navigationbar";

function MyPage() {
  const accessToken = localStorage.getItem("accessToken");

  const { data: myPageData } = useQuery(["getMypage"], () =>
    getMypage(accessToken)
  );

  const { data: profileData } = useQuery(["getProfile"], () =>
    getProfile(accessToken)
  );

  const { data: friendsCount } = useQuery(["getFriendsCount"], () =>
    getFriendsCount(accessToken)
  );

  const { data: diaryCount } = useQuery(["getDiaryCount"], () =>
    getDiaryCount(accessToken)
  );

  const mypage = myPageData?.data;
  const profile = profileData?.data;

  console.log(mypage);

  const navigate = useNavigate();

  const navToProfile = () => {
    navigate("/profile");
  };

  const navToFriendsList = () => {
    navigate("/myfriends/list");
  };

  const navToModifyCover = (diaryId, index) => {
    console.log("TARGET", mypage[index]);
    navigate(`/diary/${diaryId}`, {
      state: {
        data: mypage[index],
      },
    });
  };
  console.log(mypage);

  const navToBack = () => {
    navigate(-1);
  };

  const LogoutHandler = () => {
    localStorage.removeItem("accessToken");
    alert("로그아웃! 이 메세지 없애주세요");
    navigate("/login");
  };
  return (
    <>
      <WholeViewWidth style={{ margin: "30px auto", maxWidth: "720px" }}>
        <StArrow>
          <StyledGobackButton onClick={navToBack} />
        </StArrow>
        <Title size='18'>마이페이지</Title>
        <FlexContainer justifyContent='center'>
          <ProfilePicLarge src={profile?.profileImageUrl} />
        </FlexContainer>

        <Title size='22'>{profile?.nickname}</Title>

        <FlexContainer justifyContent='flex-end'>
          <NavButton onClick={navToProfile}>
            <Label size='16'>프로필 편집</Label>
          </NavButton>
        </FlexContainer>

        <FlexContainer justifyContent='center'>
          <MenuBox>
            <EachMenuBox boderRight='1px solid'>
              <NavButton onClick={navToFriendsList}>
                <LabelSpan>친구</LabelSpan>
                <div>{friendsCount?.data?.myFriendCount}</div>
              </NavButton>
            </EachMenuBox>
            <EachMenuBox>
              <LabelSpan>다이어리</LabelSpan>
              <div>{diaryCount?.data?.myDiaryCount}</div>
            </EachMenuBox>
          </MenuBox>
        </FlexContainer>

        <Label size='18' alignSelf='flex-start'>
          내 다이어리
        </Label>

        {mypage?.map((item, index) => {
          return (
            <FlexContainer justifyContent='center' key={item.id}>
              <DiaryCards>
                <ThumbnailBox>
                  <ThumbnailImg src={item.img} />
                </ThumbnailBox>
                <div style={{ marginLeft: "70px" }}>
                  <StText fontWeight='bold' size='20'>
                    {item.title}
                  </StText>
                  <StText size='16' color='#B0B0B0'>
                    개설일: {getDate(item.createdAt)}{" "}
                  </StText>
                </div>
                <ConfirmButton onClick={() => navToModifyCover(item.id, index)}>
                  <IoIosArrowForward size={28} color='#959494' />
                </ConfirmButton>
              </DiaryCards>
            </FlexContainer>
          );
        })}

        <StLogout>
          <LougoutBtn onClick={LogoutHandler}>로그아웃</LougoutBtn>
        </StLogout>

        <Navigationbar />
      </WholeViewWidth>
    </>
  );
}

export default MyPage;

const StArrow = styled.div`
  max-width: 720px;
  margin: 0 auto;
  position: relative;
  left: 0;
  top: 30px;
`;

const StyledGobackButton = styled(MdArrowBack)`
  position: absolute;
  /* padding-top: 50px; */
  font-size: 40px;
  color: #adaaaa;
  cursor: pointer;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: ${({ size }) => `${size}px`};
  color: black;

  display: flex;
  padding: 10px;
  justify-content: center;
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

const FlexContainer = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
`;

const NavButton = styled.button`
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  /* display: flex;
  justify-content: flex-end; */
  align-items: flex-end;
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

const ConfirmButton = styled.button`
  position: absolute;
  top: 35px;
  right: 45px;

  background: none;
  border: none;

  cursor: pointer;
`;

const StLogout = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #8E8F94;

  margin-top: 10px;
  padding-bottom: 80px;
`;

const LougoutBtn = styled.button`
  border: none;
  background: none;
`;
