import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FileBase from "react-file-base64";
import { editProduct } from "../../store/actions/products";

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

const EditProductModal = ({ setEditModalOpen, product }) => {
  const [productData, setProductData] = useState({ ...product });
  const dispatch = useDispatch();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={true}
      onClose={() => {
        setEditModalOpen(false);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500 },
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "20px",
            p: 4,
            overflow: "auto",
            maxHeight: "90%",
          }}
        >
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Επεξεργασία
          </Typography>

          <Box
            sx={{
              // backgroundColor: "red",
              display: "flex",
              alignItems: "center",
              paddingBlock: "10px",
              flexWrap: "wrap",
              // justifyContent: "space-between",
            }}
          >
            {productData.images.map((image, idx) => (
              <Box
                key={idx}
                sx={{
                  position: "relative",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={image}
                  style={{
                    width: "120px",
                    aspectRatio: 1,
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                ></img>
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    transform: "translate(30%, -30%)",
                    color: "white",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    border: "none",
                    // display: "flex",
                    display: productData.images.length === 1 ? "none" : "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // height: "20px",
                    aspectRatio: 1,
                  }}
                  onClick={() => {
                    setProductData({
                      ...productData,
                      images: productData.images.filter(
                        (image2, idx2) => idx2 !== idx
                      ),
                    });
                  }}
                >
                  <RemoveIcon sx={{ width: "15px" }} />
                </button>
              </Box>
            ))}
            <Box
              sx={{
                width: "120px",
                height: "120px",
                border: "1px dashed black",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <IconButton
                component="label"
                style={{
                  borderRadius: "50%",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // height: "20px",
                  aspectRatio: 1,
                  color: "white",
                  backgroundColor: "green",
                }}
              >
                <AddIcon />
                <div style={{ display: "none" }}>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={(data) => {
                      if (
                        data.type.substring(0, data.type.indexOf("/")) !==
                        "image"
                      ) {
                        console.log("INVALID");
                        return;
                      }
                      if (productData.images.includes(data.base64)) {
                        console.log("ALREADY IN");
                        return;
                      }
                      setProductData({
                        ...productData,
                        images: [...productData.images, data.base64],
                      });
                    }}
                  />
                </div>
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: {
                xs: "block",
                sm: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBlock: "5px",
              },
            }}
          >
            <Typography sx={{ marginRight: "20px" }}>Κωδικός</Typography>
            <TextField
              size="small"
              defaultValue={productData.code}
              onChange={(e) => {
                setProductData({ ...productData, code: e.target.value });
              }}
            ></TextField>
          </Box>
          <Box
            sx={{
              display: {
                xs: "block",
                sm: "flex",
              },
              alignItems: "center",
              justifyContent: "space-between",
              marginBlock: "5px",
            }}
          >
            <Typography sx={{ marginRight: "20px" }}>Όνομα</Typography>
            <TextField
              size="small"
              defaultValue={productData.name}
              onChange={(e) => {
                setProductData({ ...productData, name: e.target.value });
              }}
            ></TextField>
          </Box>
          <Box
            sx={{
              display: {
                xs: "block",
                sm: "flex",
              },
              alignItems: "center",
              justifyContent: "space-between",
              marginBlock: "5px",
            }}
          >
            <Typography sx={{ marginRight: "20px" }}>Τιμή</Typography>
            <TextField
              type="number"
              size="small"
              defaultValue={productData.price}
              onChange={(e) => {
                setProductData({ ...productData, price: e.target.value });
              }}
            ></TextField>
          </Box>
          <Box
            sx={{
              display: {
                xs: "block",
                sm: "flex",
              },
              alignItems: "center",
              justifyContent: "space-between",
              marginBlock: "5px",
            }}
          >
            <Typography sx={{ marginRight: "20px" }}>Τεμάχια</Typography>
            <TextField
              type="number"
              size="small"
              defaultValue={productData.inStock}
              onChange={(e) => {
                setProductData({ ...productData, inStock: e.target.value });
              }}
            ></TextField>
          </Box>
          <Box
            sx={{
              display: {
                xs: "block",
                sm: "flex",
              },
              alignItems: "center",
              justifyContent: "space-between",
              marginBlock: "5px",
            }}
          >
            <Typography sx={{ marginRight: "20px" }}>Κατασκευαστής</Typography>
            <TextField
              size="small"
              defaultValue={productData.manufacturer}
              onChange={(e) => {
                setProductData({
                  ...productData,
                  manufacturer: e.target.value,
                });
              }}
            ></TextField>
          </Box>
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
                setEditModalOpen(false);
              }}
            >
              ΑΚΥΡΩΣΗ
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setEditModalOpen(false);
                console.log(productData);
                dispatch(editProduct(productData));
              }}
            >
              ΕΠΙΒΕΒΑΙΩΣΗ
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditProductModal;
