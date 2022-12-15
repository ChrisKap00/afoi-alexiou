import { Backdrop, Box, Fade, Modal } from "@mui/material";
import React from "react";
import LoadingGear from "../LoadingGear/LoadingGear";

const LoadingModal = ({ backgroundColor }) => {
  return (
    <Modal
      open={true}
      BackdropComponent={Backdrop}
    >
      <Fade in={true}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "none",
          }}
        >
          <LoadingGear width="150px" backgroundColor={backgroundColor} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoadingModal;
