import React, { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import styled from "styled-components";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

const RightSideSlider = ({ setMode }) => {
  const [isOpenRightSide, setIsOpenRightSide] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpenRightSide(open);
  };

  const changeMode = (target) => {
    setMode(target);
  };

  return (
    <div>
      <React.Fragment>
        <OpenButton onClick={toggleDrawer(true)}>Open</OpenButton>
        <SwipeableDrawer
          anchor={"right"}
          open={isOpenRightSide}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          PaperProps={{
            sx: {
              backgroundColor: "transparent",
              boxShadow: "none",
              width: 50,
            },
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
              width: "100%",
            }}
          >
            <div onClick={() => changeMode("TEXT")}>TEXT</div>
            <div onClick={() => changeMode("DRAW")}>DRAW</div>
            <div onClick={() => changeMode("STICKER")}>STICKER</div>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default RightSideSlider;

const OpenButton = styled.div`
  position: fixed;
  right: 0;
  top: 50vh;
  background-color: #e0eecc;
`;
