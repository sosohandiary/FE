import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";

import { getMyfriends, getFriendsCount, deleteFriend } from "../api/mypage";
import { ProfilePicSmall } from "../components/ProfilePics";
import { MdArrowBack } from "react-icons/md";
import Searchbox from "../components/Searchbox";
import {
  WholeArea,
  WholeAreaWithMargin,
  WholeViewWidth,
} from "../styles/WholeAreaStyle";
import Filter from "../components/mypage/Filter";
import { useParams } from "react-router-dom";
import { Checkbox } from "@nextui-org/react";

const MyFriends = () => {
  const [searchFriends, setSearchFriends] = useState(null);

  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

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

  const onDeleteHandler = (friendId) => {
    deleteFriendMutate(friendId);
  };

  const navToBack = () => {
    navigate("/mypage");
  };

  return (
    <>
      <WholeViewWidth>
        <StArrow>
          <StyledGobackButton onClick={navToBack} />
        </StArrow>
        <Title size='18'>친구</Title>
        {/* <Searchbox placeholder='친구 검색' /> */}
        <Filter
          setCards={setSearchFriends}
          existCards={friends}
          placeholder='친구 검색'
        />
        <Label alignSelf='flex-start'>
          친구 {friendsCount?.data?.myFriendCount}
        </Label>

        <Wrapper>
          {friends &&
            searchFriends
              ?.filter((item) => item.friendStatus === "ACCEPTED")
              .map((item) => {
                return (
                  <Item key={item.memberId}>
                    {item.friendStatus === "ACCEPTED" ? (
                      <>
                        <div className='slide'>
                          <ListCards>
                            <ProfilePicSmall src={item.profileImageUrl} />
                            <ListContentBox>
                              <StText fontWeight='bold'>{item.nickname}</StText>
                              <StText>{item.statusMessage}</StText>
                            </ListContentBox>
                          </ListCards>
                        </div>

                        <DeleteButton
                          onClick={() => {
                            onDeleteHandler(item.friendListId);
                          }}
                        >
                          삭제
                        </DeleteButton>
                      </>
                    ) : (
                      <div style={{ border: "none" }}>야호</div>
                    )}
                  </Item>
                );
              })}
        </Wrapper>
      </WholeViewWidth>
    </>
  );
};

export default MyFriends;

const StArrow = styled.div`
  margin: 0 auto;
  position: relative;
  top: 30px;
  left: 16px;
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
  padding-top: 30px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
`;

const Label = styled.div`
  color: #858585;
  font-size: ${({ size }) => `${size}px`};
  display: block;
  font-weight: ${(props) => props.fontWeight};
  margin: 0 24px 5px 24px;

  display: flex;
  align-self: ${({ alignSelf }) => alignSelf};
`;

const ListCards = styled.div`
  display: flex;
  align-self: flex-start;

  /* padding: 10px; */
  margin: 0 24px 0 24px;
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

const Wrapper = styled.div`
  width: 100%;
  /* border-top: 1px solid #d9d9d9; */
  overflow: hidden;
`;

const DeleteButton = styled.button`
  background: #dedede;
  text-align: center;
  border: 1px solid #d9d9d9;
  min-width: 75px;
`;
const Item = ({ children }) => {
  const ref = useRef();
  let downX;

  const onMove = (x) => {
    if (x - downX < -30) {
      ref.current.style.transform = "translate(-55px)";
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transform = "translate(0px)";
        }
      }, 4000);
    } else {
      ref.current.style.transform = "translate(0px)";
    }
  };

  const onStart = (x) => {
    downX = x;
    ref.current.addEventListener("touchmove", onTouchMove);
    ref.current.addEventListener("mousemove", onMouseMove);
  };

  const onEnd = () => {
    ref.current.removeEventListener("touchmove", onTouchMove);
    ref.current.removeEventListener("mousemove", onMouseMove);
  };

  const onTouchMove = (e) => {
    const newX = e.touches[0].clientX;
    onMove(newX);
  };

  const onTouchStart = (e) => {
    onStart(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    onEnd();
  };

  const onMouseMove = (e) => {
    onMove(e.clientX);
  };

  const onMouseDown = (e) => {
    onStart(e.clientX);
  };

  const onMouseUp = () => {
    onEnd();
  };

  return (
    <ItemWrapper
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      ref={ref}
    >
      {children}
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  /* margin: 3px 0; */
  transition: transform 800ms;
  border-top: 1px solid #d9d9d9;

  .slide {
    flex: 1 0 100%;
    margin: 10px 0;
  }
`;
