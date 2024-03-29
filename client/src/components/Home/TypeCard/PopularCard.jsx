import { Box, Button, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./PopularCard.css";

const PopularCard = ({ name, content, type, nameInObject, categoryIdx }) => {
  const { isLoadingCategories, categories } = useSelector(
    (state) => state.categories
  );
  const [ids, setIds] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoadingCategories || categories.length === 0) return;
    for (const subCategory of categories[categoryIdx]?.subCategories) {
      if (type === "type" && subCategory.types) {
        for (const type of subCategory.types) {
          if (nameInObject === type.name) {
            setIds({
              ids: {
                categoryId: categories[categoryIdx]._id,
                subCategoryId: subCategory._id,
                typeId: type._id,
              },
              type: "type",
            });
          }
        }
      }
    }
  }, [categories]);

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "0",
        width: "100%",
        height: { xs: "300px", md: "445px" },
      }}
    >
      <img
        src={require(`../../../assets/images/home-${name}.jpg`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      ></img>
      <Box
        sx={{
          position: "absolute",
          background:
            "linear-gradient(rgba(6, 43, 102, 0.4), rgba(6, 43, 102, 0.1))",
          width: "100%",
          height: "100%",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
        }}
      >
        <Box
          sx={{
            paddingInline: { xs: "20px", md: "50px" },
            height: "100%",
            display: "flex",
          }}
        >
          <Box
            className="cardInner2"
            sx={{
              margin: "auto",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "600",
                fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                marginBottom: { xs: "1.5rem", md: "3rem" },
              }}
            >
              {content}
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontWeight: "500",
                fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem" },
              }}
            >
              Δες τα όλα
            </Typography>
            {categories.length > 0 && (
              <Link
                style={{ textDecoration: "none" }}
                onClick={() => {
                  dispatch({ type: "REDIRECT" });
                  dispatch({
                    type: "CHANGE_FILTER",
                    payload: ids,
                  });
                }}
                to={`/products`}
              >
                <Button
                  variant="contained"
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "#FC5A34",
                    color: "white",
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                    borderRadius: "30px",
                    border: "none",
                    marginTop: "10px",
                  }}
                >
                  ΠΕΡΙΣΣΟΤΕΡΑ
                </Button>
              </Link>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PopularCard;
