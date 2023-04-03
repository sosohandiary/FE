import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { getMyfriends, getFriendsCount, deleteFriend } from "../api/mypage";
import { ProfilePicSmall } from "../components/ProfilePics";
import Searchbox from "../components/Searchbox";
import { WholeArea, WholeAreaWithMargin } from "../styles/WholeAreaStyle";
import Filter from "../components/mypage/Filter";
import { useParams } from "react-router-dom";
import { Checkbox } from "@nextui-org/react";

const MyFriends = () => {
  const [searchFriends, setSearchFriends] = useState(null);

  const [selectedFriends, setSelectedFriends] = useState([]);

  const [friendStatus, setFriendStatus] = useState("");

  const location = useLocation();

  const { mode } = useParams();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  const { data: myFriends } = useQuery(["getMyFriends"], () =>
    getMyfriends(accessToken)
  );

  const { data: friendsCount } = useQuery(["getFriendsCount"], () =>
    getFriendsCount(accessToken)
  );

  console.log(friendsCount);

  const queryClient = useQueryClient();
  //friend-id 넣어주기
  const { mutate: deleteFriendMutate } = useMutation(
    (friendId) => deleteFriend(friendId, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getMyFriends");
        queryClient.invalidateQueries("getFriendsCount");
      },
    }
  );

  const friends = myFriends?.data;

  console.log(friends);
  useEffect(() => {
    setSearchFriends(friends);
  }, [friends]);

  const handleAddFriend = (friend) => {
    setSelectedFriends((prevSelectedFriends) => {
      if (prevSelectedFriends.length >= 7) {
        // Do not allow more than 7 selected friends
        return prevSelectedFriends;
      }
      // Add the friend to the selected friends list
      return [...prevSelectedFriends, friend];
    });
  };

  const handleRemoveFriend = (friend) => {
    setSelectedFriends((prevSelectedFriends) =>
      prevSelectedFriends.filter(
        (selectedFriend) => selectedFriend.nickname !== friend.nickname
      )
    );
  };

  const handleSaveSelectedFriends = () => {
    // Save the selected friends to the navigate state and navigate to the other page
    navigate("/friends-list", { state: { selectedFriends } });
  };

  console.log(selectedFriends);

  const onDeleteHandler = (friendId) => {
    deleteFriendMutate(friendId);
  };

  return (
    <>
      <WholeArea style={{ margin: "30px auto", maxWidth: "720px" }}>
        <Title size="18">친구</Title>
        {/* <Searchbox placeholder='친구 검색' /> */}
        <Filter
          setCards={setSearchFriends}
          existCards={friends}
          placeholder="친구 검색"
        />
        <Label alignSelf="flex-start">
          친구 {friendsCount?.data?.myFriendCount}
        </Label>
        {selectedFriends.length > 0 && (
          <button onClick={handleSaveSelectedFriends}>친구 추가 완료</button>
        )}
        {friends &&
          searchFriends?.map((item, index) => {
            return (
              <ListCards key={index}>
                {item.friendStatus === "ACCEPTED" && (
                  <>
                    <ProfilePicSmall src="https://avatars.githubusercontent.com/u/109452831?v=4" />
                    <ListContentBox>
                      {mode === "add" && !selectedFriends.includes(item) ? (
                        <button onClick={() => handleAddFriend(item)}>
                          추가
                        </button>
                      ) : null}
                      {mode === "add" && selectedFriends.includes(item) ? (
                        <button onClick={() => handleRemoveFriend(item)}>
                          취소
                        </button>
                      ) : null}
                      <StText fontWeight="bold">{item.nickname}</StText>
                      <StText>{item.statusMessage}</StText>
                      <button
                        onClick={() => {
                          onDeleteHandler(item.friendListId);
                        }}
                      >
                        삭제
                      </button>
                    </ListContentBox>
                  </>
                )}
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
