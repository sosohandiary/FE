import React from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { RxTriangleRight } from "react-icons/rx";

const Friendlist = () => {
  return (
    <Style>
      <TextNotice>나를 추가했어요!</TextNotice>

      <FriendList>
        <Friend>
          <CgProfile className="CgProfile" />
          <AcceptButton>+수락하기</AcceptButton>
        </Friend>
        <Friend>
          <CgProfile className="CgProfile" />
          <AcceptButton>+수락하기</AcceptButton>
        </Friend>
        <Friend>
          <CgProfile className="CgProfile" />
          <AcceptButton>+수락하기</AcceptButton>
        </Friend>
      </FriendList>

      <Seemore>
        더보기
        <RxTriangleRight className="RxTriangleRight" />
      </Seemore>

      <AddNotice>연락처에서 추가하기</AddNotice>

      <Seemore>
        모든 연락처
        <RxTriangleRight className="RxTriangleRight" />
      </Seemore>
    </Style>
  );
};

export default Friendlist;

const AddNotice = styled.div`
  margin-top: 60px;
  font-size: 130%;
  font-weight: bold;
  padding-left: 10px;
`;

const Seemore = styled.div`
  color: #afacac;
  font-weight: bold;
  display: flex;
  justify-content: right;
  .RxTriangleRight {
    color: #afacac;
    padding-top: 4px;
  }
`;

const AcceptButton = styled.button`
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #d9d9d9;
  margin-top: 5px;
`;

const FriendList = styled.div`
  display: flex;
  flex-direction: row;
`;

const Friend = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 15px 15px 0px 0px;
  .CgProfile {
    font-size: 95px;
    color: black;
  }
`;

const Style = styled.div`
  margin: 25px;
`;

const TextNotice = styled.div`
  font-size: 130%;
  font-weight: bold;
  padding-left: 10px;
`;
