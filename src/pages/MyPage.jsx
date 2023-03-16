import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function MyPage() {
  const navigate = useNavigate();

  const navToProfile = () => {
    navigate("/profile");
  };
  return (
    <>
      <StLayout>
        <StContainer>
          <Title size='18'>마이페이지</Title>
          <ProfileArea>
            <img
              style={ProfileImg}
              //사진 여기로 전달 받기!
              //성별 구분하기? 이건 확인받기
              src='https://avatars.githubusercontent.com/u/109452831?v=4'
              alt='profile image'
            />
          </ProfileArea>
          <Title size='22'>김소다</Title>
          <NavButton onClick={navToProfile}>
            <Label size='16'>프로필 편집</Label>
          </NavButton>
          <MenuBox>여기에 친구 등등</MenuBox>
          <Label size='18' alignSelf='flex-start'>
            내 다이어리
          </Label>

          <DiaryBox>
            <ThumbnailBox>사진</ThumbnailBox>
            <div style={{marginLeft:"80px"}}>
              <Title>같이 여행가자</Title>
              <Label>개설일: 2023.02.10</Label>
            </div>
          </DiaryBox>
        </StContainer>
      </StLayout>
    </>
  );
}

export default MyPage;

const StLayout = styled.div`
  background: #524f4f;
`;

const StContainer = styled.div`
  background: #fff;

  border-radius: 50px 50px 0px 0px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: ${({ size }) => `${size}px`};
  color: black;

  display: flex;
  padding: 10px;
`;

const ProfileImg = {
  padding: "2px",
  borderRadius: "50%",
  width: "80px",
  height: "80px",
};

const ProfileArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const Label = styled.div`
  color: #9a9696;
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
  box-sizing: border-box;
  height: 55px;
  width: 50%;
  max-width: 300px;
  outline: none;
  border-radius: 15px;
  padding: 0 10px;
  font-size: 16px;
  border: 1px solid #eee;
  background: #d9d9d9;
`;

const DiaryBox = styled.div`
  border-radius: 6px;
  width: 90%;
  max-width: 500px;
  position: relative;

  background: #d9d9d9;
`;

const ThumbnailBox = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;

  box-sizing: border-box;
  background: white;
  padding: 20px;
`;

const ContentBox = styled.div``;
