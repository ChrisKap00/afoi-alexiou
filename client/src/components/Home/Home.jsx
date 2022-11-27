import { Box, Container, Typography, InputBase, Card } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import HomeCard from "./HomeCard/HomeCard";
import "bootstrap/dist/css/bootstrap.min.css";
import PopularCard from "./TypeCard/PopularCard";
import "./Home.css";
import { useSelector } from "react-redux";

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

const Home = () => {
  const [categoryCarouselIndex, setCategoryCarouselIndex] = useState(0);

  const handleSelectCategory = (selectedIndex, e) => {
    setCategoryCarouselIndex(selectedIndex);
  };

  const [typeCarouselIndex, setTypeCarouselIndex] = useState(0);

  const handleSelectType = (selectedIndex, e) => {
    setTypeCarouselIndex(selectedIndex);
  };

  const { categories } = useSelector((state) => state.categories);

  return (
    <Box
    // sx={{ backgroundColor: "#ecf0f1" }}
    >
      <Box
        // id="container"
        sx={{
          position: "relative",
          height: "100%",
          // backgroundColor: "blue",
          boxShadow: "0 5px 50px black",
        }}
      >
        <img
          src={require("../../assets/images/home-main.jpg")}
          style={{
            width: "100%",
            margin: "0",
            height: "300px",
            objectFit: "cover",
          }}
        ></img>
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(3px)",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              // backgroundColor: "green",
              width: { md: "70%", xl: "50%" },
              height: "100%",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <img
              src={require("../../assets/images/logo-white.png")}
              style={{
                // height: "40%",
                width: "500px",
                maxWidth: "77%",
                // backgroundColor: "blue",
                // paddingBlock: "8%",
                paddingRight: "5rem",
                borderRight: "3px solid #FC5A34",
              }}
            ></img>
          </Box>
          {/* <Box>
            <Typography>ΑΝΤΑΛΛΑΚΤΙΚΑ ΑΥΤΟΚΙΝΗΤΩΝ</Typography>
          </Box> */}
          <Box
            sx={{
              height: "100%",
              width: { xs: "100%", md: "50%" },
              // backgroundColor: "purple",
              // paddingBlock: "8%",
              // paddingBottom: { xs: "20px" },
              paddingInline: { xs: 0, md: "5rem" },
              // borderRight: "3px solid orange",
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              justifyContent: "center",
              // marginInline: 0,
            }}
          >
            <Typography
              sx={{
                display: { xs: "block", md: "none" },
                color: "white",
                fontSize: "1.5rem",
                fontWeight: "600",
              }}
            >
              ΑΝΤΑΛΛΑΚΤΙΚΑ ΑΥΤΟΚΙΝΗΤΩΝ
            </Typography>
            <Box
              sx={{
                // backgroundColor: "red",
                width: "80%",
                display: { xs: "block", md: "none" },
                marginTop: "20px",
              }}
            >
              <Search
              //   onSubmit={handleSearch}
              //   onChange={(e) => setSearch(e.target.value)}
              >
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "white" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Αναζητήστε προϊόντα..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <hr
                style={{
                  height: "1px",
                  border: 0,
                  borderTop: "3px solid #FC5A34",
                  // padding: 0,
                  // marginTop: "50px",
                  width: "50%",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              ></hr>
            </Box>
            <Box>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  fontWeight: "600",
                  fontSize: { xs: "16px", md: "1.5rem" },
                  marginBlock: { xs: "0", md: "50px" },
                }}
              >
                <LocalPhoneIcon
                  sx={{
                    color: "#FC5A34",
                    fontSize: { xs: "32px", md: "2.2rem" },

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
                  fontWeight: "600",
                  fontSize: { xs: "16px", md: "1.5rem" },
                  marginBlock: { xs: "0", md: "50px" },
                }}
              >
                <EmailIcon
                  sx={{
                    color: "#FC5A34",
                    fontSize: { xs: "32px", md: "2.2rem" },

                    marginRight: "5px",
                  }}
                />
                chrkap7@gmail.com
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
                    fontWeight: "600",
                    fontSize: { xs: "16px", md: "1.5rem" },
                    marginBlock: { xs: "0", md: "50px" },

                    textDecoration: "underline",
                    textDecorationColor: "white",
                  }}
                >
                  <LocationOnIcon
                    sx={{
                      color: "#FC5A34",
                      fontSize: { xs: "32px", md: "2.2rem" },

                      marginRight: "5px",
                    }}
                  />
                  Βρείτε μας στον χάρτη
                </Typography>
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
      <Container
        maxWidth="xl"
        sx={{
          // backgroundColor: "red",
          paddingTop: "50px",
          // paddingBottom: "50px",
          minHeight: "calc(100vh - 433px)",
        }}
      >
        <Box
          sx={{
            display: { xs: "block", md: "flex" },
            justifyContent: "space-between",
          }}
        >
          <Card
            sx={{
              width: { xs: "100%", md: "68.5%" },
              borderRadius: "10px",
              height: { xs: "300px", md: "445px" },
              marginBottom: { xs: "20px", md: 0 },
            }}
          >
            <Carousel
              style={{
                width: "100%",
                height: { xs: "300px", md: "445px" },
              }}
              activeIndex={typeCarouselIndex}
              onSelect={handleSelectType}
            >
              <Carousel.Item style={{ height: "100%" }}>
                <PopularCard
                  className="d-bock w-100"
                  name="intercooler"
                  content="Κολάρα INTERCOOLER"
                  type="type"
                  nameInObject="INTERCOOLER"
                  categoryIdx={0}
                ></PopularCard>
              </Carousel.Item>
            </Carousel>
          </Card>
          <Card
            sx={{
              width: { xs: "100%", md: "30%" },
              height: { xs: "300px", md: "445px" },
              borderRadius: "10px",
            }}
          >
            {categories.length > 0 && (
              <Carousel
                style={{
                  width: "100%",
                  height: { xs: "300px", md: "445px" },
                }}
                activeIndex={categoryCarouselIndex}
                onSelect={handleSelectCategory}
              >
                <Carousel.Item style={{ height: { xs: "300px", md: "445px" } }}>
                  <HomeCard
                    className="d-block w-100"
                    name="antallaktika"
                    content="ΑΝΤΑΛΛΑΚΤΙΚΑ"
                    id={categories[0]?._id}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <HomeCard
                    className="d-block w-100"
                    name="biomixanika"
                    content="ΒΙΟΜΗΧΑΝΙΚΑ"
                    id={categories[1]?._id}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <HomeCard
                    className="d-block w-100"
                    name="lipantika"
                    content="ΧΗΜΙΚΑ - ΛΥΠΑΝΤΙΚΑ"
                    id={categories[2]?._id}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <HomeCard
                    className="d-block w-100"
                    name="universal"
                    content="UNIVERSAL"
                    id={categories[3]?._id}
                  />
                </Carousel.Item>
              </Carousel>
            )}
          </Card>
        </Box>
      </Container>
      <hr style={{ width: "90%", marginInline: "auto" }}></hr>
    </Box>
  );
};

export default Home;
