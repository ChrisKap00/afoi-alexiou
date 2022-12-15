import { ArrowDropDown } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import "./DropdownMenu.css";

const DropdownMenu = ({ choices, modeIndex, setModeIndex }) => {
  const [active, setActive] = useState(false);
  return (
    <div className="j">
      <div
        className="box"
        onClick={() => setActive(!active)}
      >
        {choices[modeIndex]}
        <div style={{ width: "10px" }}></div>
        <ArrowDropDown />
      </div>
      <div
        className="menu"
        style={{
          backgroundColor: "white",
          position: "absolute",
          marginTop: "",
          borderRadius: "7px",
          width: "100%",
          minWidth: "fit-content",
          display: active ? "block" : "none",
          boxShadow: "0 0 7px 0 rgb(100, 100, 100)",
          zIndex: "100",
        }}
      >
        {choices.map((choice, idx) => (
          <label
            className="menu-item"
            style={{
              width: "100%",
              padding: "5px 10px",
              borderTop: idx === 0 ? "none" : "1px solid rgba(0, 0, 0, 0.3)",
              cursor: "pointer",
              borderRadius:
                idx === 0
                  ? "7px 7px 0 0"
                  : idx === choices.length - 1
                  ? "0 0 7px 7px"
                  : "0",
            }}
            key={idx}
            onClick={() => {
              setModeIndex(idx);
              setActive(false);
            }}
          >
            {choice}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
