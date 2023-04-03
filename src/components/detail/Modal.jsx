import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

const StyledButton = styled(Button)`
  color: white;
  border-radius: 5px;
  font-size: 1rem;
  padding: 10px;
  margin: 5px;
`;

const StyledModifyButton = styled(StyledButton)`
  background-color: #f4f4f4;
`;

const StyledDeleteButton = styled(StyledButton)`
  background-color: #f4f4f4;
`;

const StyledCancelButton = styled(StyledButton)`
  color: #f4f4f4;
  margin-top: 8px;
`;

const Modal = () => (
  <Box
    sx={{
      display: "flex",
      "& > *": {
        m: 1,
      },
    }}
  >
    <ButtonGroup orientation="vertical" aria-label="vertical outlined button group">
      <StyledModifyButton>수정하기</StyledModifyButton>
      <StyledDeleteButton>삭제하기</StyledDeleteButton>
      <StyledCancelButton>취소하기</StyledCancelButton>
    </ButtonGroup>
  </Box>
);

export default Modal;
