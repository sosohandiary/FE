import React from "react";
import styled from "styled-components";
import Searchbox from "../components/Searchbox";
import { WholeArea, WholeAreaWithMargin } from "../styles/WholeAreaStyle";

const FriendsList = () => {
  return (
    <>
      <WholeArea>
        <Title size='18'>친구</Title>
        <Searchbox placeholder='친구 검색' />
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
