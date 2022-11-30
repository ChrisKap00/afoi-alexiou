import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchProduct,
  fetchProducts,
  fetchRecommendedProducts,
} from "../../store/actions/products";
import ClientProduct from "../ClientProduct/ClientProduct";
import LoadingGear from "../LoadingGear/LoadingGear";
import LoadingModal from "../LoadingModal/LoadingModal";

const Product = () => {
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useDispatch();
  const { isLoadingFetchOne, isLoadingRecommended } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    setProduct(null);
    setImageIndex(0);
    console.log(
      location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1,
        location.pathname.length
      )
    );
    dispatch(
      fetchProduct(
        {
          id: location.pathname.substring(
            location.pathname.lastIndexOf("/") + 1,
            location.pathname.length
          ),
        },
        setProduct
      )
    );
  }, [location]);

  useEffect(() => {
    console.log(product);
    if (product === null) return;
    dispatch(
      fetchRecommendedProducts(
        {
          id: product._id,
          categoryId: product.categoryId,
          subCategoryId: product.subCategoryId,
          typeId: product.typeId,
          subId: product.subId,
          innerTypeId: product.innerTypeId,
        },
        setRecommendedProducts
      )
    );
  }, [product]);

  return isLoadingFetchOne || product === null ? (
    <LoadingModal />
  ) : (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "calc(100vh - 100px)",
        backgroundColor: "white",
        paddingTop: { xs: "20px", sm: "50px" },
      }}
    >
      <Box
        sx={{
          display: { xs: "block", sm: "flex" },
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "40%", } }}>
          <Box
            sx={{
              width: "100%",
              height: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <img
              src={product?.images[imageIndex]}
              style={{ width: "100%", objectFit: "contain" }}
            ></img>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", sm: "40%" },
            display: { xs: "flex", sm: "none" },
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {product?.images.map((image, idx) => (
            <Box key={idx} sx={{ marginLeft: idx !== 0 ? "6px" : 0 }}>
              <img
                src={image}
                style={{
                  width: "100px",
                  border: idx === imageIndex ? "1px solid #153E8B" : "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setImageIndex(idx);
                }}
              ></img>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "40%",
              // backgroundColor: "red",
            },
          }}
        >
          <Box
            sx={{
              paddingLeft: { xs: 0, sm: "30px" },
              paddingBlock: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "600" }}>
                {product?.name}
              </Typography>
              <Typography
                sx={{ fontSize: "1rem", marginTop: "20px", opacity: 0.8 }}
              >
                <b>Κωδικός:</b>{" "}
                <label style={{ fontSize: "1.2rem" }}>{product?.code}</label>
              </Typography>
              <Typography sx={{ fontSize: "1.2rem", marginTop: "10px" }}>
                <b>Κατασκευαστής:</b>{" "}
                <label style={{ fontSize: "1.35rem" }}>
                  {product?.manufacturer}
                </label>
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "600" }}>
                {Number(product.price).toFixed(2)}€
              </Typography>
              <Typography sx={{ marginTop: "10px" }}>
                Σε απόθεμα: {product?.inStock}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "40%" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {product?.images.map((image, idx) => (
            <Box key={idx} sx={{ marginLeft: idx !== 0 ? "6px" : 0 }}>
              <img
                src={image}
                style={{
                  width: "100px",
                  border: idx === imageIndex ? "1px solid #153E8B" : "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setImageIndex(idx);
                }}
              ></img>
            </Box>
          ))}
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "40%" } }}></Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", sm: "80%" },
          backgroundColor: "#153E8B",
          marginInline: "auto",
          marginTop: { xs: "40px", sm: "150px" },
          padding: "10px 30px",
          borderRadius: "15px",
          color: "white",
          marginBottom: "50px",
        }}
      >
        <Typography sx={{ fontSize: "1.6rem", fontWeight: "500" }}>
          Σχετικά προϊόντα
        </Typography>
        <hr style={{ backgroundColor: "white" }}></hr>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoadingRecommended ? (
            <LoadingGear width="100px" backgroundColor="white" />
          ) : (
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                padding: 0,
              }}
            >
              {recommendedProducts?.map(
                (product, idxProduct) => {
                  console.log(product);
                  return <ClientProduct product={product} key={idxProduct} />;
                }
                // </Link>
              )}
            </ul>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Product;
