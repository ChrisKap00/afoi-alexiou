import * as React from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";

function Dropdown({ categories }) {
  const [click, setClick] = React.useState(false);
  console.log("DROPDOWN");

  const handleClick = () => setClick(!click);

  return (
    // <>
    <ul
      onClick={handleClick}
      className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      style={{ backgroundColor: "red" }}
    >
      {categories.map((category, idx) => {
        return (
          <li key={idx}>
            <Link
              className="dropdown-link"
              to={`/products/${categories[idx].pathname}`}
              onClick={() => setClick(false)}
            >
              {category.name}
            </Link>
          </li>
        );
      })}
    </ul>
    // </>
  );
}

export default Dropdown;
