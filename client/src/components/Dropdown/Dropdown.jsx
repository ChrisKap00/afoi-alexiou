import { Typography } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";

function Dropdown({ categories }) {
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);

  return (
    <ul
      onClick={handleClick}
      className={click ? "dropdown-menu clicked" : "dropdown-menu"}
    >
      {categories.map((category, idx) => {
        return (
          <li key={idx}>
            <Link
              className="dropdown-link"
              to={`/products/${categories[idx].pathname}`}
              onClick={() => setClick(false)}
            >
              <Typography sx={{ color: "white" }}>{category.name}</Typography>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Dropdown;
