import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./HomeCard.css";

const HomeCard = ({ name, content, to }) => {
  return (
    <Box className="cardContainer">
      <img
        src={require(`../../../assets/images/home-${name}.jpg`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      ></img>
      <Box className="cardInner">
        <Typography
          sx={{
            fontSize: { xs: "16px", lg: "2rem" },
            color: "white",
            fontWeight: "600",
          }}
        >
          {content}
        </Typography>
        <Link
          to={`/products/${to}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <button>ΠΕΡΙΣΣΟΤΕΡΑ</button>
        </Link>
      </Box>
    </Box>
  );
};

export default HomeCard;
