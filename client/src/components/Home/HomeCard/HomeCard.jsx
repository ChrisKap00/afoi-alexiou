import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./HomeCard.css";

const HomeCard = ({ name, content, to }) => {
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "0",
        width: "100%",
        height: "100%",
        // maxHeight: "450px",
        aspectRatio: "1",
        // minWidth: "200px",
      }}
      className="cardContainer"
    >
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
            textAlign: "center",
          }}
        >
          {content}
        </Typography>
        <Link
          to={`/products/${to}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Button
            sx={{
              cursor: "pointer",
              backgroundColor: "#457edb",
              color: "white",
              fontSize: { xs: "10px", lg: "1.2rem" },
              borderRadius: "30px",
              border: "none",
              marginTop: "40px",
              visibility: "hidden",
              opacity: 0,
              transition: "all 0.5s ease, background-color 1ms",
            }}
          >
            ΠΕΡΙΣΣΟΤΕΡΑ
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

export default HomeCard;
