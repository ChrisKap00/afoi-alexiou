import {
  Backdrop,
  Box,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  bgcolor: "#153E8B",
  borderRadius: "20px",
  border: "none",
};

const ContactMobileModal = ({ setContactMobileOpen }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={true}
      onClose={() => {
        setContactMobileOpen(false);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <Box sx={style}>
          <Box
            sx={{
              backgroundColor: "#153E8B",
              borderRadius: "20px",
              color: "white",
              //   position: "relative",
              paddingBlock: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "96%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  onClick={() => {
                    setContactMobileOpen(false);
                  }}
                  sx={{ color: "white" }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <iframe
                width="95%"
                height="240"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=Larisis%20196,%20Volos%20383%2034&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
              ></iframe>
            </Box>
            <Box
              sx={{
                display: "block",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Ωράριο
                </Typography>
                <hr style={{ marginBlock: "5px", color: "orange" }}></hr>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ width: "50%" }}>
                    <Typography
                      sx={{
                        textAlign: "start",
                        paddingLeft: "30px",
                      }}
                    >
                      Δευτέρα
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "start",
                        paddingLeft: "30px",
                      }}
                    >
                      Τρίτη
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "start",
                        paddingLeft: "30px",
                      }}
                    >
                      Τετάρτη
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "start",
                        paddingLeft: "30px",
                      }}
                    >
                      Πέμπτη
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "start",
                        paddingLeft: "30px",
                      }}
                    >
                      Παρασκευή
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "start",
                        paddingLeft: "30px",
                      }}
                    >
                      Σάββατο
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "start",
                        paddingLeft: "30px",
                      }}
                    >
                      Κυριακή
                    </Typography>
                  </Box>
                  <Box sx={{ width: "50%" }}>
                    <Typography
                      sx={{
                        textAlign: "end",
                        paddingRight: "30px",
                      }}
                    >
                      8:30 - 16:00
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "end",
                        paddingRight: "30px",
                      }}
                    >
                      8:30 - 16:00
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "end",
                        paddingRight: "30px",
                      }}
                    >
                      8:30 - 16:00
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "end",
                        paddingRight: "30px",
                      }}
                    >
                      8:30 - 16:00
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "end",
                        paddingRight: "30px",
                      }}
                    >
                      8:30 - 16:00
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "end",
                        paddingRight: "30px",
                      }}
                    >
                      Κλειστά
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "end",
                        paddingRight: "30px",
                      }}
                    >
                      Κλειστά
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ width: "50%" }}>hi</Box>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ContactMobileModal;
