import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styled, { css } from "styled-components";
import { likePost, getDiary } from "../../api/detail";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

function Like({ diaryData }) {
  const accessToken = localStorage.getItem("accessToken");
  const queryClient = useQueryClient();
  const { detailId } = useParams();

  const [isLiked, setIsLiked] = useState(false);

  const { mutate: likeMutation } = useMutation(() => likePost(detailId, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("getDiary");
    },
  });

  useEffect(() => {
    if (diaryData?.likeStatus) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [diaryData]);

  const handleClick = () => {
    setIsLiked(!isLiked);
    likeMutation();
  };
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
