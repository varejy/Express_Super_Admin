import React from "react";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

function Drawer(props) {
  const anchor = props.anchor || "bottom";

  const StyledBox = styled(Box)(() => ({
    backgroundColor: "#f6f6f6",
    maxHeight: "calc(100vh - 65px)",
    overflowY: "auto",
  }));
  return (
    <SwipeableDrawer
      anchor={anchor}
      open={props.status}
      onClose={props.toggleDrawer(false)}
      onOpen={props.toggleDrawer(true)}
    >
      <StyledBox>{props.component}</StyledBox>
    </SwipeableDrawer>
  );
}

export default Drawer;
