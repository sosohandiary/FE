import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TitleBox from "../../components/TitleBox";
import AlarmList from "../../components/notification/AlarmList";
import { useDispatch, useSelector } from "react-redux";
import { changeCurNavbarMode } from "../../contexts/curNavbarModeSlice";
import { useQuery } from "react-query";
import {
  axiosCommentAlarm,
  axiosFriendRequests,
  axiosInviteAlarm,
} from "../../api/alarm";
import { staleTime, cacheTime } from "../../constants/staleAndCacheTime";

const Notification = () => {
  const accessToken = localStorage.getItem("accessToken");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken === null) {
      navigate("/login", { replace: true });
    }
  }, [accessToken]);

  // navbar 모드 변경
  useEffect(() => {
    dispatch(changeCurNavbarMode("BELL"));
  }, []);

  const { data: dataForInviteAlarm } = useQuery(["axiosInviteAlarm"], () => {
    return axiosInviteAlarm(accessToken);
  });

  const { data: dataForFriendAlarm } = useQuery(["axiosFriendRequests"], () => {
    return axiosFriendRequests(accessToken);
  });

  const { data: dataForCommentAlarm } = useQuery(
    ["axiosCommentAlarm"],
    () => {
      console.log("dd");
      return axiosCommentAlarm(accessToken);
    },
    { staleTime, cacheTime }
  );

  const dataListForFriendRequset = dataForFriendAlarm?.data;
  const dataListForInviteAlarm = dataForInviteAlarm?.data.filter(
    (item) => item.alarm === false
  );
  const dataListForCommentAlarm = dataForCommentAlarm?.data.filter(
    (item) => item.alarm === false
  );

  return (
    <>
      <WholeView>
        <TitleBox />

        <AlarmBox>
          {dataListForCommentAlarm?.length +
            dataListForFriendRequset?.length +
            dataListForInviteAlarm?.length !==
            0 && (
            <LabelArea>
              <div>밀어서 확인하세요</div>
            </LabelArea>
          )}
          {dataListForFriendRequset?.map((item, i) => (
            <AlarmList key={i} alarmType="friend" item={item} />
          ))}
          {dataListForInviteAlarm?.map((item, i) => (
            <AlarmList key={i} alarmType="invite" item={item} />
          ))}
          {dataListForCommentAlarm?.map((item, i) => (
            <AlarmList key={i} alarmType="comment" item={item} />
          ))}
          {dataListForCommentAlarm?.length === 0 &&
          dataListForFriendRequset?.length === 0 &&
          dataListForInviteAlarm?.length === 0 ? (
            <NoAlarm>알림이 없습니다</NoAlarm>
          ) : (
            ""
          )}
        </AlarmBox>
        <TransparentDiv></TransparentDiv>
      </WholeView>
    </>
  );
};

export default Notification;

const WholeView = styled.div`
  width: 400px;
  margin: 0 auto;
  min-height: 100vh;
  height: auto;

  border-left: 0.0625rem solid rgb(225, 226, 228);
  border-right: 0.0625rem solid rgb(225, 226, 228);
`;

const AlarmBox = styled.div`
  background-color: white;
  margin-top: 10px;
  margin-bottom: 80px;
`;

const NoAlarm = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const LabelArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -10px 0 10px 0;
  color: #c0c0c0;
`;

const TransparentDiv = styled.div`
  height: 0.01px;
  width: 400px;
`;
