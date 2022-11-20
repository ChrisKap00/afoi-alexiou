import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./Products.css";
import LoadingGear from "../LoadingGear/LoadingGear";
import {
  fetchClientProducts,
  fetchProducts,
} from "../../store/actions/products";
import ClientProduct from "../ClientProduct/ClientProduct";

const Products = () => {
  const { isLoadingCategories, categories } = useSelector(
    (state) => state.categories
  );
  const { isLoadingClientProducts, clientProducts } = useSelector(
    (state) => state.clientProducts
  );
  const dispatch = useDispatch();
  const [productsFilter, setProductsFilter] = useState({});

  useEffect(() => {
    console.log(productsFilter);
  }, []);

  useEffect(() => {
    if (isLoadingCategories || categories.length === 0) return;
    console.log("HERE");
    setProductsFilter({
      ids: { categoryId: categories[0]._id },
      type: "category",
    });
  }, [categories]);

  useEffect(() => {
    if (
      isLoadingCategories ||
      categories.length === 0 ||
      JSON.stringify(productsFilter) === "{}"
    )
      return;
    console.log(productsFilter);
    dispatch(fetchClientProducts(productsFilter));
  }, [productsFilter]);

  const temp = [
    { id: 1, t: "gfe" },
    { id: 2, t: "fead" },
  ];
  return (
    <Box
      sx={{
        // backgroundColor: "black",
        minHeight: "calc(100vh - 100px)",
        width: "100%",
        maxWidth: "1600px",
        marginInline: "auto",
        paddingTop: "30px",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Box
          flex={1}
          p={2}
          sx={{
            backgroundColor: "#1D2C5E",
            borderRadius: "10px",
            height: "calc(100vh - 160px)",
            minWidth: "300px",
            position: "sticky",
            top: "90px",
            display: { xs: "none", md: "block" },
            overflow: "auto",
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              color: "white",
              fontSize: "1.7rem",
              textAlign: "center",
            }}
          >
            Κατηγορίες
          </Typography>
          <hr
            style={{
              width: "90%",
              marginInline: "auto",
              color: "white",
              opacity: 0.2,
            }}
          ></hr>
          <Box
            sx={{
              height: isLoadingCategories ? "100%" : "fit-content",
              display: isLoadingCategories ? "flex" : "block",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isLoadingCategories ? (
              <LoadingGear width="150px" />
            ) : (
              <>
                {categories?.map((category, idx) => (
                  <Box key={idx}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        textDecoration: "underline",
                        fontWeight: "bold",
                      }}
                    >
                      {category.name}
                    </Typography>
                    {
                      <ul style={{ color: "white" }}>
                        {category.subCategories.map(
                          (subCategory, idxSubCategory) => (
                            <Box key={idxSubCategory}>
                              <li>
                                <Typography
                                  sx={{ color: "white", fontWeight: "bold" }}
                                >
                                  {subCategory.name}
                                </Typography>
                              </li>
                              {subCategory.types ? (
                                <ul>
                                  {subCategory.types.map((type, idxType) => (
                                    <li key={idxType}>
                                      <Typography>{type.name}</Typography>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <ul>
                                  {subCategory.subs.map((sub, idxSub) => (
                                    <Box key={idxSub}>
                                      <li>
                                        <Typography>{sub.name}</Typography>
                                      </li>
                                      <ul>
                                        {sub.types.map(
                                          (typeInner, idxTypeInner) => (
                                            <li key={idxTypeInner}>
                                              {typeInner.name}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </Box>
                                  ))}
                                </ul>
                              )}
                            </Box>
                          )
                        )}
                      </ul>
                    }
                  </Box>
                ))}
              </>
            )}
          </Box>
        </Box>
        <Box
          flex={4.5}
          p={2}
          sx={{
            alignItems: isLoadingClientProducts ? "center" : "flex-start",
            justifyContent: isLoadingClientProducts ? "center" : "flex-start",
          }}
        >
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
            }}
          >
            {isLoadingClientProducts ? (
              <LoadingGear width="250px" />
            ) : productsFilter?.type === "category" ? (
              clientProducts.map((product, idxProduct) => (
                // <Link
                //   style={{
                //     textDecoration: "none",
                //     width: "20%",
                //     backgroundColor: "purple",
                //     marginRight: "30px",
                //     height: "max-content",
                //   }}
                // >
                <ClientProduct product={product} key={idxProduct} />
                // </Link>
              ))
            ) : (
              "hello"
            )}
          </ul>
        </Box>
      </Stack>
    </Box>
  );
};

export default Products;
