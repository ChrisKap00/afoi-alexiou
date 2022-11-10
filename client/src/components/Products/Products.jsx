import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./Products.css";
import LoadingGear from "../LoadingGear/LoadingGear";

const Products = () => {
  return (
    <Box
      sx={{
        // backgroundColor: "black",
        minHeight: "calc(100vh - 100px)",
        width: "100%",
        maxWidth: "1600px",
        marginInline: "auto",
        paddingTop: "30px",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Box
          flex={1}
          p={2}
          sx={{
            backgroundColor: "#1D2C5E",
            borderRadius: "10px",
            height: "calc(100vh - 160px)",
            position: "sticky",
            top: "90px",
            display: { xs: "none", md: "block" },
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              color: "white",
              fontSize: "1.7rem",
              textAlign: "center",
            }}
          >
            Κατηγορίες
          </Typography>
          <hr
            style={{
              width: "90%",
              marginInline: "auto",
              color: "white",
              opacity: 0.2,
            }}
          ></hr>
        </Box>
        <Box
          flex={4.5}
          p={2}
          sx={{ backgroundColor: "blue", display: "block" }}
        >
          <LoadingGear />
        </Box>
      </Stack>
    </Box>
  );
};

export default Products;
