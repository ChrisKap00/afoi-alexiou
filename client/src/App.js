import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Products from "./components/Products/Products";
import Product from "./components/Product/Product";
import Admin from "./components/Admin/Admin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import { fetchCategories } from "./store/actions/products";
import LoadingModal from "./components/LoadingModal/LoadingModal";
import SearchResults from "./components/SearchResults/SearchResults";
import LoadingGear from "./components/LoadingGear/LoadingGear";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { admin } = useSelector((state) => state.admin);
  const { isLoadingCategories, categories } = useSelector(
    (state) => state.categories
  );
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        xssm: 600,
        sm: 820,
        md: 1065,
        // mdlg:
        lg: 1150,
        xl: 1536,
      },
    },
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if (isLoadingCategories || categories.length === 0) return;
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
    const token = admin?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch({ type: "ADMIN_LOGOUT" });
      }
    }
  }, [location]);

  return (
    <ThemeProvider theme={theme}>
      {isLoadingCategories ? (
        // <LoadingModal />
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingGear width="100px" />
        </div>
      ) : (
        // "hello"
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="search" element={<SearchResults />} />
          </Routes>
          <Box
            sx={{
              backgroundColor: "#153E8B",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40px",
              position: "absolute",
              // bottom: "0",
              marginBlock: "auto",
            }}
          >
            <Typography sx={{ color: "white", fontSize: "0.9rem" }}>
              © 2022 Αφοί Αλεξίου. All Rights Reserved.
            </Typography>
          </Box>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
