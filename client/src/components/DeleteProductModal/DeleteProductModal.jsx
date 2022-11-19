import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../store/actions/products";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

const DeleteProductModal = ({ setDeleteModalOpen, name, id }) => {
  const dispatch = useDispatch();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={true}
      onClose={() => {
        setDeleteModalOpen(false);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Επιβεβαίωση
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {`Πρόκειται να διαγραφεί το προϊόν ${name}`}
          </Typography>
          <Box
            sx={{
              marginTop: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button
              color="error"
              sx={{ marginRight: "10px" }}
              onClick={() => {
                setDeleteModalOpen(false);
              }}
            >
              ΑΚΥΡΩΣΗ
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setDeleteModalOpen(false);
                dispatch(deleteProduct({ id }));
              }}
            >
              ΔΙΑΓΡΑΦΗ
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteProductModal;
