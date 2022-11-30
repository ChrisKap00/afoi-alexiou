import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ClientProduct = ({ product }) => {
  return (
    <Card
      elevation={3}
      sx={{
        width: {
          xs: "100%",
          xssm: "44%",
          sm: "29%",
          md: "45%",
          lg: "29%",
          xl: "22%",
        },
        backgroundColor: "white",
        marginRight: "30px",
        borderRadius: "10px",
        marginBottom: "30px",
      }}
    >
      <Link
        style={{
          width: "fit-content",
          backgroundColor: "red",
          textDecoration: "none",
          color: "black",
        }}
        to={`/products/${product._id}`}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBottom: "10px",
          }}
        >
          <Box sx={{ paddingBottom: "15px" }}>
            <img
              style={{
                width: "100%",
                aspectRatio: 1,
                objectFit: "contain",
              }}
              src={product.images[0]}
            ></img>
            <Typography
              sx={{
                wordBreak: "break-word",
                width: "100%",
                paddingInline: "10px",
              }}
            >
              {product.name}
            </Typography>
          </Box>
          <Box sx={{ paddingInline: "10px" }}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              {Number(product.price).toFixed(2)}€
            </Typography>
            <Typography variant="body1">
              Κατασκευαστής: {product.manufacturer}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Card>
  );
};

export default ClientProduct;
