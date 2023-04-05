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

const RightSideSlider = () => {
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

  return (
    <div>
      <React.Fragment>
        <OpenButton>Open</OpenButton>
        <Button onClick={toggleDrawer(true)}>right</Button>
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
            <div>PEN</div>
            <div>PEN</div>
            <div>PEN</div>
            <div>PEN</div>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default RightSideSlider;

const OpenButton = styled.div`
  OpenButton
`;
