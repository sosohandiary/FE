import React from "react";
import styled from "styled-components";
import { HiPencil, HiOutlineXCircle } from "react-icons/hi";
import { useRef } from "react";

function Profile() {
  const fileInput = useRef();

  const onImgButton = (event) => {
    event.preventDefault();
    fileInput.current.click();
  };

  return (
    <>
      <StLayout>
        <ProfileLayout>
          <Title>프로필 편집</Title>
          <form encType='multipart/form-data'>
            <ProfileArea>
              <StButton onClick={onImgButton}>
                <img
                  style={ProfileImg}
                  //사진 여기로 전달 받기!
                  src='https://avatars.githubusercontent.com/u/109452831?v=4'
                  alt='profile image'
                />
              </StButton>
              <EditPencilArea>
                <HiPencil />
              </EditPencilArea>
            </ProfileArea>
            <input
              type='file'
              accept='img/*'
              // onChange={onImgPostHandler}
              ref={fileInput}
              style={{ display: "none" }}
            />
            <Container>
              <Content>
                <Label>이름(별명)</Label>
                <IconContainer>
                  <input type='text' />
                  <ClearButton>
                    <HiOutlineXCircle color="#D0D0D0"/>
                  </ClearButton>
                </IconContainer>
                <Label>소개</Label>
                <textarea />
              </Content>
            </Container>
          </form>
        </ProfileLayout>
      </StLayout>
    </>
  );
}

export default Profile;

const StLayout = styled.div`
  background-color: #524f4f;
`;

const ProfileLayout = styled.div`
  max-width: 720px;
  margin: 0 auto;
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

const Title = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #fff;

  display: flex;
  padding: 10px;
`;

const EditPencilArea = styled.div`
  background-color: gray;
  position: relative;
  right: 20px;
  top: 60px;
  border-radius: 70%;
  overflow: hidden;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(256, 256, 256, 0.8);
`;

const StButton = styled.div`
  border: none;
  cursor: pointer;
`;

const Container = styled.div`
  background: #fff;

  height: 100vh;
  margin-top: 20px;
  border-radius: 50px 50px 0px 0px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  padding: 50px;
  flex-direction: column;

  input {
    box-sizing: border-box;
    height: 55px;
    width: 100%;
    outline: none;
    border-radius: 8px;
    padding: 0 10px;
    font-size: 14px;
    border: 1px solid #eee;
    background: #f5f5f5;
  }
  textarea {
    width: 100%;
    height: 100px;
    border: 1px solid #eee;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 12px;
    font-size: 12px;
    margin-bottom: 20px;
    background: #f5f5f5;
  }
`;

const Label = styled.div`
  color: #9a9696;
  font-size: 12px;
  display: block;
  font-weight: ${(props) => props.fontWeight};
  margin: 10px;
`;

const IconContainer = styled.div`
  position: relative;
`;

const ClearButton = styled.button`
  position: absolute;
  font-size: 18px;
  top: 15px;
  right: 10px;

  border: none;
  background: none;
  cursor: pointer;
`;
