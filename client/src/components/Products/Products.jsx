import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Products.css";
import LoadingGear from "../LoadingGear/LoadingGear";
import { fetchClientProducts } from "../../store/actions/products";
import ClientProduct from "../ClientProduct/ClientProduct";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

const Products = () => {
  const { isLoadingCategories, categories } = useSelector(
    (state) => state.categories
  );
  const { isLoadingClientProducts, clientProducts } = useSelector(
    (state) => state.clientProducts
  );
  const { isLoadingFilterChange, filter, redirected } = useSelector(
    (state) => state.productsFilter
  );
  const [manufacturerIndex, setManufacturerIndex] = useState(0);
  const [manufacturers, setManufacturers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (redirected) {
      dispatch({ type: "RESET_REDIRECT" });
      return;
    }
    if (isLoadingCategories || categories.length === 0 || filter === null)
      return;
    console.log("HERE");
    dispatch({
      type: "CHANGE_FILTER",
      payload: {
        ids: { categoryId: categories[0]._id },
        type: "category-client",
      },
    });
  }, [categories]);

  useEffect(() => {
    if (isLoadingCategories || categories.length === 0 || filter === null)
      return;
    setManufacturerIndex(0);
    console.log(filter);
    dispatch(fetchClientProducts(filter));
  }, [filter]);

  useEffect(() => {
    if (filter === null || clientProducts.length === 0) return;
    setManufacturers([]);
    if (filter.type === "category-client") {
      setManufacturers([
        "Όλοι",
        ...clientProducts
          .filter((product) => product.categoryId === filter.ids.categoryId)
          .map((e) => e.manufacturer),
      ]);
    } else if (filter.type === "subCategory") {
      setManufacturers([
        "Όλοι",
        ...clientProducts
          .filter(
            (product) => product.subCategoryId === filter.ids.subCategoryId
          )
          .map((e) => e.manufacturer),
      ]);
    } else if (filter.type === "type") {
      setManufacturers([
        "Όλοι",
        ...clientProducts
          .filter((product) => product.typeId === filter.ids.typeId)
          .map((e) => e.manufacturer),
      ]);
    } else if (filter.type === "sub") {
      setManufacturers([
        "Όλοι",
        ...clientProducts
          .filter((product) => product.subId === filter.ids.subId)
          .map((e) => e.manufacturer),
      ]);
    } else if (filter.type === "innerType") {
      setManufacturers([
        "Όλοι",
        ...clientProducts
          .filter((product) => product.innerTypeId === filter.ids.innerTypeId)
          .map((e) => e.manufacturer),
      ]);
    }
  }, [clientProducts, filter]);

  return (
    <Box
      sx={{
        // backgroundColor: "black",
        minHeight: "calc(100vh - 100px)",
        width: "100%",
        maxWidth: "1600px",
        marginInline: "auto",
        paddingTop: "30px",
        paddingInline: { xs: 0, md: "10px" },
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
                    <div
                      style={{ width: "fit-content" }}
                      onClick={() => {
                        dispatch({
                          type: "CHANGE_FILTER",
                          payload: {
                            ids: { categoryId: category._id },
                            type: "category-client",
                          },
                        });
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color:
                            filter?.type === "category-client" &&
                            filter?.ids.categoryId === category._id
                              ? "#FC5A34"
                              : "white",
                          textDecoration: "underline",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        {category.name}
                      </Typography>
                    </div>
                    {
                      <ul style={{ color: "white" }}>
                        {category?.subCategories?.map(
                          (subCategory, idxSubCategory) => (
                            <Box key={idxSubCategory}>
                              <li>
                                <div
                                  style={{ width: "fit-content" }}
                                  onClick={() => {
                                    dispatch({
                                      type: "CHANGE_FILTER",
                                      payload: {
                                        ids: {
                                          categoryId: category._id,
                                          subCategoryId: subCategory._id,
                                        },
                                        type: "subCategory",
                                      },
                                    });
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      color:
                                        filter?.type === "subCategory" &&
                                        filter?.ids.subCategoryId ===
                                          subCategory._id
                                          ? "#FC5A34"
                                          : "white",
                                      fontWeight: "bold",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {subCategory.name}
                                  </Typography>
                                </div>
                              </li>
                              {subCategory.types ? (
                                <ul>
                                  {subCategory.types.map((type, idxType) => (
                                    <li key={idxType}>
                                      <div
                                        style={{ width: "fit-content" }}
                                        onClick={() => {
                                          dispatch({
                                            type: "CHANGE_FILTER",
                                            payload: {
                                              ids: {
                                                categoryId: category._id,
                                                subCategoryId: subCategory._id,
                                                typeId: type._id,
                                              },
                                              type: "type",
                                            },
                                          });
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            color:
                                              filter?.type === "type" &&
                                              filter?.ids.typeId === type._id
                                                ? "#FC5A34"
                                                : "white",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                          }}
                                        >
                                          {type.name}
                                        </Typography>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <ul>
                                  {subCategory?.subs?.map((sub, idxSub) => (
                                    <Box key={idxSub}>
                                      <li>
                                        <div
                                          style={{ width: "fit-content" }}
                                          onClick={() => {
                                            dispatch({
                                              type: "CHANGE_FILTER",
                                              payload: {
                                                ids: {
                                                  categoryId: category._id,
                                                  subCategoryId:
                                                    subCategory._id,
                                                  subId: sub._id,
                                                },
                                                type: "sub",
                                              },
                                            });
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              color:
                                                filter?.type === "sub" &&
                                                filter?.ids.subId === sub._id
                                                  ? "#FC5A34"
                                                  : "white",
                                              fontWeight: "bold",
                                              cursor: "pointer",
                                            }}
                                          >
                                            {sub.name}
                                          </Typography>
                                        </div>
                                      </li>
                                      <ul>
                                        {sub.types.map(
                                          (typeInner, idxTypeInner) => (
                                            <li key={idxTypeInner}>
                                              <div
                                                style={{ width: "fit-content" }}
                                                onClick={() => {
                                                  dispatch({
                                                    type: "CHANGE_FILTER",
                                                    payload: {
                                                      ids: {
                                                        categoryId:
                                                          category._id,
                                                        subCategoryId:
                                                          subCategory._id,
                                                        subId: sub._id,
                                                        innerTypeId:
                                                          typeInner._id,
                                                      },
                                                      type: "innerType",
                                                    },
                                                  });
                                                }}
                                              >
                                                <Typography
                                                  sx={{
                                                    color:
                                                      filter?.type ===
                                                        "innerType" &&
                                                      filter?.ids
                                                        .innerTypeId ===
                                                        typeInner._id
                                                        ? "#FC5A34"
                                                        : "white",
                                                    fontWeight: "bold",
                                                    cursor: "pointer",
                                                  }}
                                                >
                                                  {typeInner.name}
                                                </Typography>
                                              </div>
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
          // p={2}
          sx={{
            display: isLoadingClientProducts ? "flex" : "block",
            alignItems: isLoadingClientProducts ? "center" : "flex-start",
            justifyContent: isLoadingClientProducts ? "center" : "flex-start",
            paddingInline: "30px",
          }}
        >
          {isLoadingClientProducts || isLoadingFilterChange ? (
            <LoadingGear width="100px" />
          ) : (
            <>
              <Box
                sx={{
                  marginBottom: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ marginRight: "15px" }}>
                  Κατασκευαστής:{" "}
                </Typography>
                <DropdownMenu
                  choices={manufacturers}
                  modeIndex={manufacturerIndex}
                  setModeIndex={setManufacturerIndex}
                />
              </Box>
              <ul
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  listStyle: "none",
                  padding: 0,
                }}
              >
                {filter?.type === "category-client"
                  ? clientProducts
                      .map(
                        (product, idxProduct) =>
                          product.categoryId === filter?.ids.categoryId && (
                            <ClientProduct product={product} key={idxProduct} />
                          )
                        // </Link>
                      )
                      .filter((e) =>
                        manufacturerIndex === 0
                          ? true
                          : e === false
                          ? false
                          : e?.props.product.manufacturer ===
                            manufacturers[manufacturerIndex]
                      )
                  : filter?.type === "subCategory"
                  ? clientProducts
                      .map(
                        (product, idxProduct) =>
                          product.subCategoryId ===
                            filter?.ids.subCategoryId && (
                            <ClientProduct product={product} key={idxProduct} />
                          )
                      )
                      .filter((e) =>
                        manufacturerIndex === 0
                          ? true
                          : e === false
                          ? false
                          : e?.props.product.manufacturer ===
                            manufacturers[manufacturerIndex]
                      )
                  : filter?.type === "type"
                  ? clientProducts
                      .map(
                        (product, idxProduct) =>
                          product.typeId === filter?.ids.typeId && (
                            <ClientProduct product={product} key={idxProduct} />
                          )
                      )
                      .filter((e) =>
                        manufacturerIndex === 0
                          ? true
                          : e === false
                          ? false
                          : e?.props.product.manufacturer ===
                            manufacturers[manufacturerIndex]
                      )
                  : filter?.type === "sub"
                  ? clientProducts
                      .map(
                        (product, idxProduct) =>
                          product.subId === filter?.ids.subId && (
                            <ClientProduct product={product} key={idxProduct} />
                          )
                      )
                      .filter((e) =>
                        manufacturerIndex === 0
                          ? true
                          : e === false
                          ? false
                          : e?.props.product.manufacturer ===
                            manufacturers[manufacturerIndex]
                      )
                  : filter?.type === "innerType"
                  ? clientProducts
                      .map(
                        (product, idxProduct) =>
                          product.innerTypeId === filter?.ids.innerTypeId && (
                            <ClientProduct product={product} key={idxProduct} />
                          )
                      )
                      .filter((e) =>
                        manufacturerIndex === 0
                          ? true
                          : e === false
                          ? false
                          : e?.props.product.manufacturer ===
                            manufacturers[manufacturerIndex]
                      )
                  : null}
              </ul>
            </>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default Products;
