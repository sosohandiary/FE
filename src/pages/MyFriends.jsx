import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";

import { getMyfriends, getFriendsCount } from "../api/mypage";
import { ProfilePicSmall } from "../components/ProfilePics";
import Searchbox from "../components/Searchbox";
import { WholeArea, WholeAreaWithMargin } from "../styles/WholeAreaStyle";
import Filter from "../components/mypage/Filter";

const MyFriends = () => {
  const [searchFriends, setSearchFriends] = useState(null);

  const accessToken = localStorage.getItem("accessToken");

  const { data: myFriends } = useQuery(["getMyFriends"], () =>
    getMyfriends(accessToken)
  );

  const { data: friednsCount } = useQuery(["getFriendsCount"], () =>
    getFriendsCount(accessToken)
  );

  const friends = myFriends?.data;

  // console.log(friends);
  // console.log(searchFriends);

  useEffect(() => {
    setSearchFriends(friends);
  }, [friends]);

  return (
    <>
      <WholeArea style={{ margin: "30px auto", maxWidth: "720px" }}>
        <Title size='18'>친구</Title>
        {/* <Searchbox placeholder='친구 검색' /> */}
        <Filter
          setCards={setSearchFriends}
          existCards={friends}
          placeholder='친구 검색'
        />
        <Label alignSelf='flex-start'>
          친구 {friednsCount?.data?.myFriendCount}
        </Label>
        {friends &&
          searchFriends?.map((item, index) => {
            return (
              <ListCards key={index}>
                <ProfilePicSmall src='https://avatars.githubusercontent.com/u/109452831?v=4' />
                <ListContentBox>
                  <StText fontWeight='bold'>{item.nickname}</StText>
                  <StText>{item.statusMessage}</StText>
                </ListContentBox>
              </ListCards>
            );
          })}
      </WholeArea>
    </>
  );
};

export default MyFriends;

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
