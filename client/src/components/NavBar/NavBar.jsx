import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  InputBase,
  requirePropFactory,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import ContactDropdown from "../ContactDropdown/ContactDropdown";
import ReactTooltip from "react-tooltip";

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
    location.pathname === "/"
      ? 0
      : location.pathname.split("/")[1] === "products"
      ? 1
      : 2
  );
  const [dropdown, setDropdown] = useState(false);
  const [contactDropdown, setContactDropdown] = useState(false);

  const { categories } = useSelector((state) => state.products);
  const { admin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

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
  const onMouseEnterContact = () => {
    if (window.innerWidth < 960) {
      setContactDropdown(false);
    } else {
      console.log("enter");
      setContactDropdown(true);
    }
  };

  const onMouseLeaveContact = () => {
    if (window.innerWidth < 960) {
      setContactDropdown(false);
    } else {
      console.log("leave");
      setContactDropdown(false);
    }
  };

  useEffect(() => {
    setCurrentPage(
      location.pathname === "/"
        ? 0
        : location.pathname.split("/")[1] === "products"
        ? 1
        : 2
    );
  }, [location]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Box
      sx={{
        backgroundColor: "#153E8B",
        position: "sticky",
        top: 0,
        zIndex: "100",
      }}
    >
      <Box
        // elevation={7}
        sx={{
          backgroundColor: "#153E8B",
          padding: { xs: "0 10px", lg: "0px 200px" },
          borderRadius: "0",
          zIndex: "100",
          height: "60px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          backgroundColor: "green",
        }}
      > */}
        <Link to="/">
          <img
            src={logo}
            style={{
              height: "3.5em",
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
                fontSize: "1.1rem",
                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              Αρχική
            </div>
          </Link>
          <Link
            style={{
              textDecoration: "none",
              // color: "white"
              color: currentPage === 1 ? "#FC5A34" : "white",
            }}
            to="/products"
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
                fontSize: "1.1rem",
                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              Προϊόντα
            </div>
          </Link>
          <div
            onMouseEnter={onMouseEnterContact}
            onMouseLeave={onMouseLeaveContact}
            data-tip
            data-for="tooltip"
            style={{
              position: "relative",
              // backgroundColor: "blue",
              height: "100%",
            }}
          >
            <div
              id="contact"
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                borderRadius: 0,
                // backgroundColor: "red",
                height: "100%",
              }}
            >
              <label
                style={{
                  paddingInline: "20px",
                  cursor: "pointer",
                  borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "white",
                }}
              >
                Επικοινωνία
              </label>
            </div>
            {/* {contactDropdown && <ContactDropdown />} */}
          </div>
          <ReactTooltip
            id="tooltip"
            place="bottom"
            effect="solid"
            clickable={true}
            // type="dark"
            backgroundColor="black"
            // style={{ opacity: 1 }}
          >
            <iframe
              width="552"
              height="256"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=afoi%20alexiou&t=&z=15&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
            ></iframe>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Typography
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Ωράριο
                </Typography>
                <hr style={{ marginBlock: "5px", color: "orange" }}></hr>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ width: "50%" }}>
                    <Typography
                      sx={{
                        textAlign: "start",
                        paddingLeft: "30px",
                      }}
                    >
                      Δευτέρα
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "start",
                        paddingLeft: "30px",
                      }}
                    >
                      Τρίτη
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "start",
                        paddingLeft: "30px",
                      }}
                    >
                      Τετάρτη
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "start",
                        paddingLeft: "30px",
                      }}
                    >
                      Πέμπτη
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "start",
                        paddingLeft: "30px",
                      }}
                    >
                      Παρασκευή
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "start",
                        paddingLeft: "30px",
                      }}
                    >
                      Σάββατο
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "start",
                        paddingLeft: "30px",
                      }}
                    >
                      Κυριακή
                    </Typography>
                  </Box>
                  <Box sx={{ width: "50%" }}>
                    <Typography
                      sx={{
                        textAlign: "end",
                        paddingRight: "30px",
                      }}
                    >
                      8:30 - 16:00
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "end",
                        paddingRight: "30px",
                      }}
                    >
                      8:30 - 16:00
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "end",
                        paddingRight: "30px",
                      }}
                    >
                      8:30 - 16:00
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "end",
                        paddingRight: "30px",
                      }}
                    >
                      8:30 - 16:00
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "end",
                        paddingRight: "30px",
                      }}
                    >
                      8:30 - 16:00
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "end",
                        paddingRight: "30px",
                      }}
                    >
                      Κλειστά
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "end",
                        paddingRight: "30px",
                      }}
                    >
                      Κλειστά
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ width: "50%" }}>hi</Box>
            </Box>
          </ReactTooltip>
        </Box>
        <Box sx={{ flexGrow: 1 }}></Box>
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
        {admin && (
          <IconButton
            sx={{ color: "white" }}
            onClick={() => {
              dispatch({ type: "ADMIN_LOGOUT" });
            }}
          >
            <LogoutIcon />
          </IconButton>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ display: { xs: "block", md: "none" }, color: "white" }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
        {/* </div> */}
      </Box>
      <Collapse
        in={expanded}
        // timeout="auto"
        unmountOnExit
        // sx={{ position: "relative" }}
      >
        <hr
          style={{
            height: "1px",
            border: 0,
            borderTop: "1px solid white",
            // margin: "1em 0",
            padding: 0,
            opacity: "50%",
            marginTop: "4px",
            marginBottom: "0",
          }}
        ></hr>
        <CardContent>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {pages.map((page, idx) => (
              <div
                key={idx}
                style={{
                  // paddingBlock: "5px",
                  paddingInline: "25px",
                  // marginBlock: "5px",
                  marginTop: "5px",
                  color: "white",
                  display: "block",
                  borderRadius: 0,
                  borderLeft:
                    idx !== 0 ? "1px solid rgba(255, 255, 255, 0.3)" : "none",
                }}
                data-tip
                data-for="tooltip"
              >
                {page}
              </div>
            ))}
          </Container>
        </CardContent>
      </Collapse>
    </Box>
  );
};

export default NavBar;
