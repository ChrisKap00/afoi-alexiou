import { Box, Container, Pagination, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchProducts } from "../../store/actions/products";
import ClientProduct from "../ClientProduct/ClientProduct";
import LoadingGear from "../LoadingGear/LoadingGear";

const SearchResults = () => {
  const { isLoadingResults } = useSelector((state) => state.products);
  const [results, setResults] = useState(null);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      searchProducts(
        {
          query: searchQuery.get("query"),
          code: searchQuery.get("code"),
          page,
        },
        setPages,
        setResults
      )
    );
  }, [location, page]);

  return (
    <Container sx={{ minHeight: "calc(100vh - 100px)" }}>
      <Box sx={{ height: "100%", minHeight: "inherit" }}>
        <Box>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              marginBlock: "30px",
              fontSize: "1.5rem",
            }}
          >
            Αποτελέσματα αναζήτησης για:&nbsp;
            <label
              style={{
                fontWeight: "600",
                fontSize: "2rem",
                textTransform: "uppercase",
              }}
            >
              "
              {searchQuery.get("query")
                ? searchQuery.get("query")
                : searchQuery.get("code")}
              "
            </label>
          </Typography>
        </Box>
        <Box
          sx={{
            marginBlock: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={pages}
            shape="rounded"
            page={page}
            onChange={(e, v) => {
              setPage(Number(v));
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems:
              isLoadingResults || results === null ? "center" : "flex-start",
            justifyContent:
              isLoadingResults || results === null ? "center" : "flex-start",
            // backgroundColor: "yellow",
            transform:
              isLoadingResults || results === null
                ? { xs: "translate(0, 260%)", sm: "translate(0, 400%)" }
                : "none",
          }}
        >
          {isLoadingResults || results === null ? (
            <LoadingGear width="100px" />
          ) : results.length !== 0 ? (
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                padding: 0,
                // backgroundColor: "blue",
                width: "100%",
              }}
            >
              {results?.map((product, idx) => (
                <ClientProduct key={idx} product={product} />
              ))}
            </ul>
          ) : (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                marginBlock: "30px",
                fontSize: "1rem",
              }}
            >
              Δεν βρέθηκαν αποτελέσματα αναζήτησης για:&nbsp;
              <label
                style={{
                  fontSize: "1.5rem",
                  textTransform: "uppercase",
                }}
              >
                "
                {searchQuery.get("query")
                  ? searchQuery.get("query")
                  : searchQuery.get("code")}
                "
              </label>
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SearchResults;
