import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styled, { css } from "styled-components";
import { likePost } from "../../api/detail";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

function Like() {
  const accessToken = localStorage.getItem("accessToken");
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [isLiked, setIsLiked] = useState(false);

  const { mutate: likeMutation } = useMutation(() => likePost(id, accessToken), {
    onSuccess: (data) => {
      console.log("data?", data);
      queryClient.invalidateQueries("likePost");
      setIsLiked(!isLiked);
    },
  });

  useEffect(() => {
    likePost().then((response) => {
      setIsLiked(response.data.isLiked);
    });
  }, []);

  const handleClick = () => {
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
