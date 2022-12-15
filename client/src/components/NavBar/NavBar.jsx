import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  CardContent,
  Collapse,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect } from "react";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import ContactMobileModal from "../ContactMobileModal/ContactMobileModal";

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
  minWidth: "fit-content",
  [theme.breakpoints.up("xs")]: {
    // marginLeft: theme.spacing(3),
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

  const { categories } = useSelector((state) => state.categories);
  const { admin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [contactMobileOpen, setContactMobileOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${search || "none"}`);
    }
  };

  useEffect(() => {
    setExpanded(false);
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
            display: { xs: "none", sm: "flex" },
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
                  fontSize: "1.07rem",
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
              src="https://maps.google.com/maps?q=Larisis%20196,%20Volos%20383%2034&t=&z=13&ie=UTF8&iwloc=&output=embed"
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
              <Box
                sx={{
                  width: "50%",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Ωράριο
                </Typography>
                <hr
                  style={{
                    marginBlock: "5px",
                    color: "orange",
                    width: "90%",
                    marginInline: "auto",
                  }}
                ></hr>
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
              <Box sx={{ width: "50%" }}>
                {/* <Box
                  sx={{
                    width: "100%",
                    height: "40px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "red",
                    paddingTop: "10px",
                  }}
                >
              </Box> */}
                <Typography
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Στοιχεία επικοινωνίας
                </Typography>
                <hr
                  style={{
                    marginBlock: "5px",
                    color: "orange",
                    width: "90%",
                    marginInline: "auto",
                  }}
                ></hr>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "30px",
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                      marginBlock: "16px",
                    }}
                  >
                    <LocalPhoneIcon
                      sx={{
                        color: "#FC5A34",
                        fontSize: "1.5rem",

                        marginRight: "5px",
                      }}
                    />
                    2421063118
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                      marginBlock: "16px",
                    }}
                  >
                    <EmailIcon
                      sx={{
                        color: "#FC5A34",
                        fontSize: "1.5rem",

                        marginRight: "5px",
                      }}
                    />
                    afoi_alexiou@yahoo.gr
                  </Typography>
                  <a
                    target="blank"
                    href="https://www.google.com/maps/place/%CE%91%CE%A6%CE%9F%CE%99+%CE%91%CE%9B%CE%95%CE%9E%CE%99%CE%9F%CE%A5+%CE%9F%CE%95/@39.3673859,22.9221365,20z/data=!4m5!3m4!1s0x14a76c113fc567fd:0x4f587a465dd3e5c8!8m2!3d39.3674513!4d22.9220633"
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                        marginBlock: "16px",

                        textDecoration: "underline",
                        textDecorationColor: "white",
                      }}
                    >
                      <LocationOnIcon
                        sx={{
                          color: "#FC5A34",
                          fontSize: "1.5rem",

                          marginRight: "5px",
                        }}
                      />
                      Βρείτε μας στον χάρτη
                    </Typography>
                  </a>
                </Box>
              </Box>
            </Box>
          </ReactTooltip>
        </Box>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Search
          onSubmit={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            display: {
              xs: "none",
              xssm: location.pathname.split("/")[1] === "" ? "none" : "block",
              md: "block",
            },
          }}
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
          sx={{ display: { xs: "block", sm: "none" }, color: "white" }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
        {/* </div> */}
      </Box>
      <Collapse
        in={expanded}
        // timeout="auto"
        unmountOnExit
        sx={{ display: { xs: expanded && "block", sm: "none" } }}
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
            <Search
              onSubmit={handleSearch}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                display: {
                  xs: location.pathname.split("/")[1] === "" ? "none" : "block",
                  xssm: "none",
                },
              }}
            >
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "white" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Αναζητήστε προϊόντα..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Container>
          <Box
            sx={{
              display: {
                xs: location.pathname.split("/")[1] === "" ? "none" : "block",
                xssm: "none",
              },
            }}
          >
            <hr
              style={{
                height: "1px",
                border: 0,
                borderTop: "1px solid white",
                // margin: "1em 0",
                marginInline: "auto",
                padding: 0,
                opacity: "50%",
                width: "90%",
              }}
            ></hr>
          </Box>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
              data-tip
              data-for="tooltip"
              style={{
                position: "relative",
                // backgroundColor: "blue",
                height: "100%",
              }}
              onClick={() => {
                setContactMobileOpen(!contactMobileOpen);
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
                    fontSize: "1.07rem",
                  }}
                >
                  Επικοινωνία
                </label>
              </div>
              {/* {contactDropdown && <ContactDropdown />} */}
            </div>
          </Container>
        </CardContent>
      </Collapse>
      {contactMobileOpen && (
        <ContactMobileModal setContactMobileOpen={setContactMobileOpen} />
      )}
    </Box>
  );
};

export default NavBar;
