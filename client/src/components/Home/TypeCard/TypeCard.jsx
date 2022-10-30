import { Card } from "@mui/material";
import React from "react";

const TypeCard = ({ name, content, to }) => {
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "0",
        width: "100%",
        height: "100%",
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
    </Card>
  );
};

export default TypeCard;
