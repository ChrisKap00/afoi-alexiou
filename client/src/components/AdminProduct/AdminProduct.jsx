import { Box, Card, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import React from "react";
import { useState } from "react";
import LoadingModal from "../LoadingModal/LoadingModal";
import DeleteProductModal from "../DeleteProductModal/DeleteProductModal";
import EditProductModal from "../EditProductModal/EditProductModal";

const AdminProduct = ({ product }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  return (
    <Card
      elevation={5}
      sx={{
        width: { xs: "100%", sm: "49%" },
        marginBlock: "5px",
        display: "flex",
        position: "relative",
      }}
    >
      <img
        src={product.images[0]}
        style={{
          width: "120px",
          aspectRatio: 1,
          objectFit: "contain",
        }}
      ></img>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          padding: "5px 10px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "65%",
            fontWeight: "600",
          }}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "5px" }}>
          Κωδικός: {product.code}
        </Typography>
        <Typography>{Number(product.price).toFixed(2)}€</Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          // backgroundColor: "red",
          width: "fit-content",
          right: 0,
          bottom: 0,
          padding: "3px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          type="button"
          style={{
            backgroundColor: "#153E8B",
            border: "none",
            color: "white",
            borderRadius: "50%",
            aspectRatio: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "5px",
          }}
          onClick={() => {
            setEditModalOpen(true);
          }}
        >
          <EditIcon />
        </button>
        <button
          type="button"
          style={{
            backgroundColor: "red",
            border: "none",
            color: "white",
            borderRadius: "50%",
            aspectRatio: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            setDeleteModalOpen(true);
          }}
        >
          <Delete />
        </button>
      </Box>
      {deleteModalOpen && (
        <DeleteProductModal
          setDeleteModalOpen={setDeleteModalOpen}
          name={product.name}
          id={product._id}
        />
      )}
      {editModalOpen && (
        <EditProductModal
          setEditModalOpen={setEditModalOpen}
          product={product}
        />
      )}
    </Card>
  );
};

export default AdminProduct;
