import React from "react";
import { acceptFriend, getRequested } from "../api/mypage";
import { useMutation, useQuery, useQueryClient } from "react-query";

function AcceptTest() {
  const accessToken = localStorage.getItem("accessToken");

  const queryClient = useQueryClient();

  const { data: RequestedFriend } = useQuery(["RequestedFriend"], () =>
    getRequested(accessToken)
  );

  const { mutate: acceptFriendMutate } = useMutation(
    (friendListId) => acceptFriend(friendListId, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("RequestedFriend");
      },
    }
  );

  console.log(RequestedFriend);
  const requested = RequestedFriend?.data;
  console.log(requested);

  const onAcceptHandler = (friendListId) => {
    acceptFriendMutate(friendListId);
  };

  return (
    <>
      {requested?.map((item, index) => {
        return (
          <div key={index}>
            <div> 요청한 친구 이름: {item.friendNickName}</div>
            <button onClick={() => onAcceptHandler(item.friendListId)}>
              수락하기
            </button>
          </div>
        );
      })}
    </>
  );
}

export default AcceptTest;
