import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styled, { css } from "styled-components";
import { likePost } from "../../api/detail";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";

function Like() {
  const accessToken = localStorage.getItem("accessToken");
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [isLiked, setIsLiked] = useState(false);
  //서버로 받아온 좋아요수 상태관리
  const [likeCount, setLikeCount] = useState(0);

  //좋아요 수 get api명세 추가시 활용할 것
  // const { data: likeData } = useQuery(["likePost"], () => likePost(id, accessToken));

  // const { mutate: likemutation } = useMutation(() => likePost(id, accessToken), {
  //   onSuccess: (data) => {
  //     console.log("data?", data);
  //     queryClient.invalidateQueries("likePost");
  //   },
  // });

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  // useEffect(() => {
  //   // fetch like count from server on mount
  //   likePost().then((response) => {
  //     setLikeCount(response.data.likeCount);
  //   });
  // }, []);

  return (
    <HeartButton onClick={handleClick}>
      {isLiked ? (
        <HeartIcon filled>
          <FaHeart />
        </HeartIcon>
      ) : (
        <HeartIcon>
          <FaRegHeart />
        </HeartIcon>
      )}
      {/* <span>{likeCount}</span> */}
    </HeartButton>
  );
}

export default Like;

const HeartButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const HeartIcon = styled.span`
  /* Heart outline style */
  color: #000000;
  font-size: 24px;

  /* Filled heart style */
  ${({ filled }) =>
    filled &&
    css`
      color: #ff4d4f;
    `}
`;
