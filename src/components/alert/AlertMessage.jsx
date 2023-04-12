import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertMessage = ({ setAlertOpen, message, navigateLink, reload }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    setAlertOpen(false);
    if (navigateLink) {
      navigate(navigateLink);
    }
    if (reload) {
      window.location.reload();
    }
  };

  return (
    <Invisible>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{message}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>확인</Button>
        </DialogActions>
      </Dialog>
    </Invisible>
  );
};

export default AlertMessage;

const Invisible = styled.div`
  position: absolute;
  top: 0px;
`;
