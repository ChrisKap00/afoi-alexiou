import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { Card, Collapse, IconButton, InputBase } from "@mui/material";
import { useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import "./NavBar.css";
import { useSelector } from "react-redux";

const pages = ["Αρχική", "Προϊόντα", "Επικοινωνία"];

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.spacing(20),
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(
    location.pathname === "/" ? 0 : 1
  );
  // const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const { categories } = useSelector((state) => state.products);

  // const handleClick = () => setClick(!click);
  // const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      console.log("enter");
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      console.log("leave");
      setDropdown(false);
    }
  };
  useEffect(() => {
    setCurrentPage(location.pathname === "/" ? 0 : 1);
    // console.log(currentPage);
  }, [location]);
  // console.log(location);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Box
      elevation={7}
      sx={{
        position: "sticky",
        top: 0,
        backgroundColor: "#457EdB",
        padding: { xs: "10px", lg: "0px 200px" },
        borderRadius: "0",
        zIndex: "100",
        height: "80px",
        // justifyContent: "center",
      }}
    >
      {/* <Container maxWidth="xl"> */}
      {/* <Toolbar disableGutters> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          // backgroundColor: "yellow",
          height: "100%",
        }}
      >
        <Link to="/">
          <img
            src={logo}
            style={{
              height: "4.5em",
              marginRight: "2rem",
              // backgroundColor: "purple",
            }}
          ></img>
        </Link>
        {/* <Box sx={{ flexGrow: 0.05 }} /> */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            // backgroundColor: "green",
            height: "100%",
          }}
        >
          <Link
            style={{
              textDecoration: "none",
              // color: "white"
              color: currentPage === 0 ? "#FC5A34" : "white",
            }}
            to="/"
          >
            <div
              id="page"
              style={{
                // paddingBlock: "5px",
                paddingInline: "20px",
                // marginBlock: "20px",
                // color: "white",
                // display: "block",
                display: "flex",
                alignItems: "center",
                borderRadius: 0,
                fontSize: "1.2rem",
                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              Αρχική
            </div>
          </Link>
          <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
              position: "relative",
              // backgroundColor: "blue",
              height: "100%",
            }}
          >
            <div
              id="page"
              style={{
                color: currentPage === 1 ? "#FC5A34" : "white",
                cursor: "pointer",
                // paddingBlock: "5px",
                paddingInline: "20px",
                // marginBlock: "20px",
                // color: "white",
                display: "flex",
                alignItems: "center",
                borderRadius: 0,
                // borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
                fontSize: "1.2rem",
                // backgroundColor: "red",
                height: "100%",
              }}
            >
              Προϊόντα
            </div>
            {dropdown && <Dropdown categories={categories} />}
          </div>
          <label>
            <div
              id="contact"
              style={{
                cursor: "pointer",
                // paddingBlock: "5px",
                paddingInline: "20px",
                // marginBlock: "20px",
                // color: "white",
                // display: "block",
                display: "flex",
                alignItems: "center",
                borderRadius: 0,
                borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              Επικοινωνία
            </div>
          </label>
        </Box>
        <Search
          //   onSubmit={handleSearch}
          //   onChange={(e) => setSearch(e.target.value)}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "white" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Αναζητήστε προϊόντα..."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ display: { sx: "block", md: "none" }, color: "white" }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <hr
          style={{
            height: "1px",
            border: 0,
            borderTop: "1px solid white",
            // margin: "1em 0",
            padding: 0,
            opacity: "50%",
            marginTop: "4px",
          }}
        ></hr>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {pages.map((page, idx) => (
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              key={page}
            >
              <div
                style={{
                  paddingBlock: "5px",
                  paddingInline: "25px",
                  marginBlock: "5px",
                  color: "white",
                  display: "block",
                  borderRadius: 0,
                  borderLeft:
                    idx !== 0 ? "1px solid rgba(255, 255, 255, 0.3)" : "none",
                }}
              >
                {page}
              </div>
              {/* {page} */}
            </Link>
          ))}
        </Container>
      </Collapse>
      {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}
      {/* </Toolbar> */}
      {/* </Container> */}
    </Box>
  );
};

export default NavBar;
