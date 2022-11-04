import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import "./TypeCard.css";

const TypeCard = ({ name, content, to }) => {
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "0",
        width: "100%",
        height: { xs: "300px", md: "100%" },
        // maxHeight: "350px",
        // aspectRatio: "1",
        // minWidth: "200px",
      }}
      // className="cardContainer"
      // elevation={5}
    >
      <img
        src={require(`../../../assets/images/home-${name}.jpg`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      ></img>
      <Box
        sx={{
          position: "absolute",
          background:
            "linear-gradient(rgba(6, 43, 102, 0.4), rgba(6, 43, 102, 0.1))",
          width: "100%",
          height: "100%",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
        }}
      >
        <Box
          sx={{
            // backgroundColor: "blue",
            paddingInline: "50px",
            height: "100%",
            display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Box
            className="cardInner2"
            sx={{
              margin: "auto",
              // backgroundColor: "yellow",
              width: "100%",
              // display: { xs: "flex", sm: "block" },
              // flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "600",
                // backgroundColor: "red",
                // display: { xs: "flex", sm: "block" },
                // justifyContent: "center",
                fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
                marginBottom: "3rem",
              }}
            >
              TEST LABEL
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontWeight: "500",
                // backgroundColor: "red",
                // display: { xs: "flex", sm: "block" },
                // justifyContent: "center",
                fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem" },
              }}
            >
              TEST LABEL
            </Typography>
            <Button
              // className="btn"
              variant="contained"
              sx={{
                cursor: "pointer",
                backgroundColor: "#FC5A34",
                color: "white",
                fontSize: { xs: "1rem", sm: "1.2rem" },
                borderRadius: "30px",
                border: "none",
                marginTop: "10px",
              }}
            >
              ΠΕΡΙΣΣΟΤΕΡΑ
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default TypeCard;
