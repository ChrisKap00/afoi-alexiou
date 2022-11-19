import { Backdrop, Box, Fade, Modal } from "@mui/material";
import React from "react";
import LoadingGear from "../LoadingGear/LoadingGear";

const LoadingModal = () => {
  return (
    <Modal
      open={true}
      // closeAfterTransition
      BackdropComponent={Backdrop}
    >
      <Fade in={true}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <LoadingGear width="150px" />
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoadingModal;
