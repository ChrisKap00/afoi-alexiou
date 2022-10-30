import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./Products.css";

const Products = () => {
  const { categories } = useSelector((state) => state.products);
  const location = useLocation();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [subCategoryIndex, setSubCategoryIndex] = useState(-1);
  const [typeIndex, setTypeIndex] = useState(-1);
  const [breadcrumbs, setBreadcrumbs] = useState(["Κατηγορίες"]);

  useEffect(() => {
    const pathname = location.pathname;
    const split = pathname.split("/");
    console.log(split);
    if (split.length !== 3) return;
    setSubCategoryIndex(-1);
    setTypeIndex(-1);
    const selectedCategory = split[2];
    for (let i in categories) {
      if (selectedCategory === categories[i].pathname) {
        setCategoryIndex(i);
      }
    }
  }, [location]);

  useEffect(() => {
    setBreadcrumbs(["Κατηγορίες", categories[categoryIndex].name]);
  }, [categoryIndex]);

  useEffect(() => {
    const pathname = location.pathname;
    const split = pathname.split("/");
    console.log(split);
    if (split.length !== 5) return;
    const selectedSubCategory = split[3];
    const selectedType = split[4];
    for (let i in categories[categoryIndex].subCategories) {
      if (
        selectedSubCategory ===
        categories[categoryIndex].subCategories[i].pathname
      ) {
        setSubCategoryIndex(i);
        for (let j in categories[categoryIndex].subCategories[i].types) {
          if (
            selectedType ===
            categories[categoryIndex].subCategories[i].types[j].pathname
          ) {
            setTypeIndex(j);
          }
        }
      }
    }
  }, [location]);

  useEffect(() => {
    console.log(subCategoryIndex, typeIndex);
    if (subCategoryIndex === -1 || typeIndex === -1) {
      setBreadcrumbs(["Κατηγορίες", categories[categoryIndex].name]);
      return;
    }
    setBreadcrumbs([
      "Κατηγορίες",
      categories[categoryIndex].name,
      categories[categoryIndex].subCategories[subCategoryIndex].name,
      categories[categoryIndex].subCategories[subCategoryIndex].types[typeIndex]
        .name,
    ]);
  }, [subCategoryIndex, typeIndex]);

  return (
    <>
      <Container>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            paddingTop: "2%",
          }}
        >
          {breadcrumbs.map((el, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" key={idx} sx={{ marginInline: "10px" }}>
                {el}
              </Typography>
              {idx !== breadcrumbs.length - 1 && <ArrowForwardIosIcon />}
            </div>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            paddingTop: "3%",
          }}
        >
          {location.pathname.split("/").length === 3
            ? categories[categoryIndex].subCategories.map((sub, idx) => (
                <Card
                  className="card"
                  key={idx}
                  elevation={3}
                  sx={{
                    width: { xs: "100%", sm: "23.2%" },
                    margin: "10px",
                    marginInline: { sx: "auto", sm: "10px" },
                    borderRadius: "10px",
                    paddingTop: "20px",
                    position: "relative",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={require(`../../assets/images/products/${sub.pathname}.png`)}
                    sx={{
                      maxHeight: "250px",
                      height: "100%",
                      objectFit: "scale-down",
                    }}
                  ></CardMedia>
                  <hr
                    style={{
                      width: "90%",
                      opacity: "0.5",
                      marginInline: "auto",
                    }}
                  ></hr>
                  <CardContent>
                    <Typography variant="h6">{sub.name}</Typography>
                  </CardContent>
                  <div className="hover">
                    <div className="inner">
                      <h2 style={{ margin: 0 }}>{sub.name}</h2>
                      <hr style={{ opacity: 0.5 }}></hr>

                      {sub.types === undefined ? (
                        sub.subs.map((el, idx) => (
                          <div key={idx}>
                            <h3 style={{ textDecoration: "underlined" }}>
                              {el.name}
                            </h3>
                            <ul>
                              {el.types.map((el2, idx2) => (
                                <li key={idx2} style={{ width: "fit-content" }}>
                                  <Link
                                    to={`${el.pathname}/${el2.pathname}`}
                                    style={{ color: "white" }}
                                  >
                                    <Typography sx={{ fontSize: "1.2em" }}>
                                      {el2.name}
                                    </Typography>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <ul>
                          {sub.types.map((el, idx) => (
                            <li key={idx} style={{ width: "fit-content" }}>
                              <Link
                                to={`${sub.pathname}/${sub.types[idx].pathname}`}
                                style={{ color: "white" }}
                              >
                                <Typography sx={{ fontSize: "1.2em" }}>
                                  {el.name}
                                </Typography>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            : null}
        </Box>
      </Container>
    </>
  );
};

export default Products;
