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
        height: { xs: "300px", md: "100%" },
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
            fontSize: { xs: "1.5rem", sm: "2rem" },
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
            variant="contained"
            sx={{
              cursor: "pointer",
              backgroundColor: "#FC5A34",
              color: "white",
              fontSize: { xs: "1rem", sm: "1.2rem" },
              borderRadius: "30px",
              border: "none",
              marginTop: "40px",
              visibility: { xs: "visible", md: "hidden" },
              opacity: { xs: 1, md: 0 },
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
