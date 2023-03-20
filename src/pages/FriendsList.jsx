import React from "react";
import styled from "styled-components";
import { ProfilePicSmall } from "../components/ProfilePics";
import Searchbox from "../components/Searchbox";
import { WholeArea, WholeAreaWithMargin } from "../styles/WholeAreaStyle";

const FriendsList = () => {
  return (
    <>
      <WholeArea style={{ margin: "30px auto", maxWidth: "720px" }}>
        <Title size='18'>친구</Title>
        <Searchbox placeholder='친구 검색' />
        <Label alignSelf='flex-start'>친구 4</Label>
        <ListCards>
          <ProfilePicSmall src='https://avatars.githubusercontent.com/u/109452831?v=4' />
          <ListContentBox>
            <StText fontWeight='bold'>김소다</StText>
            <StText>상태메세지</StText>
          </ListContentBox>
        </ListCards>
        {/*하드코딩 */}
        <ListCards>
          <ProfilePicSmall src='https://avatars.githubusercontent.com/u/109452831?v=4' />
          <ListContentBox>
            <StText fontWeight='bold'>하드코딩</StText>
            <StText>지우세요</StText>
          </ListContentBox>
        </ListCards>
        <ListCards>
          <ProfilePicSmall src='https://avatars.githubusercontent.com/u/109452831?v=4' />
          <ListContentBox>
            <StText fontWeight='bold'>하드코딩</StText>
            <StText>map으로 바꾸세요</StText>
          </ListContentBox>
        </ListCards>
        <ListCards>
          <ProfilePicSmall src='https://avatars.githubusercontent.com/u/109452831?v=4' />
          <ListContentBox>
            <StText fontWeight='bold'>하드코딩</StText>
            <StText>수정해야합니다</StText>
          </ListContentBox>
        </ListCards>
      </WholeArea>
    </>
  );
};

export default FriendsList;

const Title = styled.div`
  font-weight: bold;
  font-size: ${({ size }) => `${size}px`};
  color: black;

  display: flex;
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

const ListCards = styled.div`
  display: flex;
  align-self: flex-start;

  padding: 10px;
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
