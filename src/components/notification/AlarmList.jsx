import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";

import "react-swipeable-list/dist/styles.css";
import styled from "styled-components";
import AlarmUnReadCard from "./AlarmUnReadCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import {
  acceptFriendAlarm,
  deleteCommentAlarm,
  deleteFriendAlarm,
  deleteInviteAlarm,
} from "../../api/alarm";

const AlarmList = ({ item, alarmType }) => {
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem("accessToken");
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteFriendAlarm } = useMutation(
    (friendListId) => deleteFriendAlarm(accessToken, friendListId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("axiosFriendRequests");
      },
    }
  );
  const { mutate: mutateDeleteInviteAlarm } = useMutation(
    (inviteId) => deleteInviteAlarm(accessToken, inviteId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("axiosInviteAlarm");
      },
    }
  );
  const { mutate: mutateDeleteCommentAlarm } = useMutation(
    (commentId) => deleteCommentAlarm(accessToken, commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("axiosCommentAlarm");
      },
    }
  );
  const { mutate: mutateAcceptFriendAlarm } = useMutation(
    (id) => acceptFriendAlarm(accessToken, id),
    {
      onSuccess: (id) => {
        mutateDeleteFriendAlarm(id);
      },
    }
  );

  const handleAccept = () => {
    switch (alarmType) {
      case "friend":
        mutateAcceptFriendAlarm(item?.friendListId);
      case "invite":
        mutateDeleteInviteAlarm(item?.inviteId, {
          onSuccess: () => {
            navigate(`/diaries/${item.inviteId}`);
          },
        });
      case "comment":
        mutateDeleteCommentAlarm(item?.commentId, {
          onSuccess: () => {
            navigate(`/diaries/${item.diaryId}/${item.diaryDetailId}`);
          },
        });
      default:
        return;
    }
  };

  const handleDelete = () => {
    switch (alarmType) {
      case "friend":
        mutateDeleteFriendAlarm(item.friendListId);
      case "invite":
        mutateDeleteInviteAlarm(item.inviteId);
      case "comment":
        mutateDeleteCommentAlarm(item.commentId);
      default:
        return;
    }
  };

  const getButtonMsg = () => {
    switch (alarmType) {
      case "friend":
        return { acceptMsg: "수락", rejectMsg: "삭제" };
      case "invite":
        return { acceptMsg: "다이어리로", rejectMsg: "삭제" };
      case "comment":
        return { acceptMsg: "다이어리로", rejectMsg: "삭제" };
      default:
        return;
    }
  };

  const trailingActions = () => {
    return (
      <TrailingActions>
        <SwipeAction destructive={true} onClick={handleAccept}>
          <ActionContent background="#A1B2FA">
            <InnerButton>{getButtonMsg().acceptMsg}</InnerButton>
          </ActionContent>
        </SwipeAction>

        <SwipeAction destructive={true} onClick={handleDelete}>
          <ActionContent background="#FC9F9F">
            <InnerButton>{getButtonMsg().rejectMsg}</InnerButton>
          </ActionContent>
        </SwipeAction>
      </TrailingActions>
    );
  };

  return (
    <>
      <SwipeableList threshold={0.75} type={ListType.IOS} fullSwipe={true}>
        <SwipeableListItem trailingActions={trailingActions()}>
          <AlarmUnReadCard item={item} alarmType={alarmType} />
        </SwipeableListItem>
      </SwipeableList>
    </>
  );
};

export default AlarmList;

const ActionContent = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
  font-size: 12px;
  font-weight: 500;
  box-sizing: border-box;
  color: #eee;
  user-select: none;
  background: ${({ background }) => background};
`;

const InnerButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  position: relative;
`;
