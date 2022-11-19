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

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { admin } = useSelector((state) => state.admin);
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 770,
        md: 997,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

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
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/admin" element={<Admin />} />
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
    </ThemeProvider>
  );
}

export default App;
