import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f7cad0",
    },
    secondary: {
      main: "#f57777",
    },
  },
});

const buttons = [
  <Button key="one" color="primary">
    수정
  </Button>,
  <Button key="two" color="secondary">
    삭제
  </Button>,
];

const Modal = () => (
  <ThemeProvider theme={theme}>
    <Box
      sx={{
        display: "flex",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup orientation="vertical" aria-label="vertical contained button group" variant="contained">
        {buttons}
      </ButtonGroup>
    </Box>
  </ThemeProvider>
);

export default Modal;
