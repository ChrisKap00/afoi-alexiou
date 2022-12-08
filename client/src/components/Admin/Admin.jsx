import {
  Backdrop,
  Box,
  Button,
  Card,
  Collapse,
  Container,
  Fade,
  FormControl,
  FormControlLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../store/actions/admin";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import LoadingGear from "../LoadingGear/LoadingGear";
import { Delete, ExpandMore } from "@mui/icons-material";
import { useEffect } from "react";
import FileBase from "react-file-base64";
import {
  addProduct,
  addSubCategory,
  deleteAllCategories,
  deleteById,
  fetchProducts,
  sendCategories,
} from "../../store/actions/products";
import AdminProduct from "../AdminProduct/AdminProduct";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

const categoriesObj = {
  categories: [
    {
      name: "Ανταλλακτικά",
      pathname: "antallaktika",
      subCategories: [
        {
          name: "Μετάδοση κίνησης",
          pathname: "metadosi-kinisis",
          types: [
            {
              name: "Πλατώ",
              pathname: "plato",
            },
            {
              name: "Δίσκος",
              pathname: "diskos",
            },
            {
              name: "Ρουλεμάν αμπραγιάζ",
              pathname: "rouleman-ampragiaz",
            },
            {
              name: "Σετ συμπλέκτη",
              pathname: "set-symplekti",
            },
            {
              name: "Αντλία συμπλέκτη",
              pathname: "antlia-symplekti",
            },
            {
              name: "Γρανάζι βολάν",
              pathname: "granazi-bolan",
            },
            {
              name: "Σταυροί",
              pathname: "stavroi",
            },
            {
              name: "Μεσαία τριβή",
              pathname: "mesaia-tribi",
            },
          ],
        },
        {
          name: "Ανάρτηση",
          pathname: "anartisi",
          types: [
            {
              name: "Αερόφουσκες",
              pathname: "aerofouskes",
            },
            {
              name: "Αμορτισέρ",
              pathname: "amortiser",
            },
          ],
        },
        {
          name: "Σύστημα καυσίμου",
          pathname: "systima-kaysimou",
          types: [
            {
              name: "Αντλία fuel ηλεκτρική",
              pathname: "antlia-fuel-hlektriki",
            },
            {
              name: "Αντλία fuel μηχανική",
              pathname: "antlia-fuel-mhxaniki",
            },
            {
              name: "Αντλία fuel χειροκίνητη",
              pathname: "antlia-fuel-xeirokiniti",
            },
          ],
        },
        {
          name: "Σύστημα ψύξης",
          pathname: "systima-psiksis",
          types: [
            {
              name: "Υδραντλία",
              pathname: "ydrantlia",
            },
            {
              name: "Θερμοστάτες",
              pathname: "thermostates",
            },
          ],
        },
        {
          name: "Κολάρο",
          pathname: "kolaro",
          types: [
            {
              name: "Νερού-ψυγείου-καλοριφέρ",
              pathname: "nerou-psygeioy-kalorifer",
            },
            {
              name: "INTERCOOLER",
              pathname: "INTERCOOLER",
            },
          ],
        },
        {
          name: "Ιμάντες",
          pathname: "imantes",
          subs: [
            {
              name: "Βιομηχανικοί",
              pathname: "biomhxanikoi",
              types: [
                { name: "A", pathname: "A" },
                { name: "B & BX", pathname: "B-BX" },
                { name: "C", pathname: "C" },
                { name: "D", pathname: "D" },
                { name: "Z", pathname: "Z" },
                { name: "K", pathname: "K" },
              ],
            },
            {
              name: "Αυτοκινήτου",
              pathname: "aytokinitou",
              types: [
                { name: "9.5", pathname: "9.5" },
                { name: "12.5", pathname: "12.5" },
                { name: "11.5", pathname: "11.5" },
                { name: "PK", pathname: "PK" },
                { name: "TEST", pathname: "TEST" },
              ],
            },
          ],
        },
        {
          name: "Φίλτρα",
          pathname: "filtra",
          types: [
            {
              name: "OIL",
              pathname: "OIL",
            },
            {
              name: "fuel",
              pathname: "fuel",
            },
            {
              name: "AIR",
              pathname: "AIR",
            },
            {
              name: "cabin",
              pathname: "cabin",
            },
            {
              name: "Hydraulic",
              pathname: "hydraulic",
            },
          ],
        },
        {
          name: "Ρουλεμάν",
          pathname: "rouleman",
          types: [
            {
              name: "Μονόσφαιρα",
              pathname: "monosfaira",
            },
            {
              name: "Κωνικά",
              pathname: "konika",
            },
            {
              name: "Βιομηχανικά",
              pathname: "biomhxanika",
            },
            {
              name: "A/C",
              pathname: "AC",
            },
          ],
        },
      ],
    },
    {
      name: "Βιομηχανικά",
      pathname: "biomixanika",
      subCategories: [],
    },
    {
      name: "Χημικά - Λιπαντικά",
      pathname: "ximika-lipantika",
      subCategories: [],
    },
    {
      name: "Διάφορα UNIVERSAL",
      pathname: "diafora-universal",
      subCategories: [],
    },
  ],
};

const Admin = () => {
  const initialState = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [categoriesCopy, setCategoriesCopy] = useState([]);
  const [hasFetchedCategories, setHasFetchedCategories] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toDelete, setToDelete] = useState({});

  const [open, setOpen] = React.useState(false);
  const handleOpen = (toDeleteObj) => {
    setToDelete(toDeleteObj);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setToDelete({});
  };

  const { isLoading, admin } = useSelector((state) => state.admin);
  const { isLoadingCategories, isLoadingDelete, categories } = useSelector(
    (state) => state.categories
  );
  const { isLoadingProducts, products } = useSelector(
    (state) => state.products
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signin(formData, navigate));
  };

  useEffect(() => {
    if (categories.length === 0 || hasFetchedCategories) return;
    setHasFetchedCategories(true);
    setCategoriesCopy([...categories]);
  }, [categories, hasFetchedCategories]);

  return (
    <Container
      sx={{
        backgroundColor: "#c8d3d6",
        boxShadow: "0 0 7px 0 rgb(100, 100, 100)",
        minHeight: "calc(100vh - 100px)",
        display: admin ? "block" : "flex",
        padding: { xs: "40px 10px", md: "50px 200px" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!admin ? (
        <Card
          elevation={10}
          sx={{ width: { xs: "100%", sm: "500px", padding: "20px 50px" } }}
        >
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Είσοδος admin
            </Typography>
            <Input
              name="username"
              label="Username"
              handleChange={handleChange}
              type="text"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "#153E8B" }}
              disabled={
                formData.username === "" ||
                formData.password === "" ||
                isLoading
              }
            >
              {isLoading ? (
                <LoadingGear width="40px" opacity="0.5" />
              ) : (
                "Εισοδος"
              )}
            </Button>
          </form>
        </Card>
      ) : (
        <Box sx={{ height: "100%" }}>
          <Typography
            sx={{
              width: "100%",
              textAlign: "center",
              fontSize: { xs: "2rem", sm: "3rem", md: "3.5rem" },
            }}
            variant="h2"
          >
            ΕΠΕΞΕΡΓΑΣΙΑ ΒΑΣΗΣ
          </Typography>
          <button
            onClick={() => {
              dispatch(sendCategories(categoriesObj));
            }}
          >
            send categories
          </button>
          <button
            onClick={() => {
              dispatch(deleteAllCategories());
            }}
          >
            delete categories
          </button>
          {isLoadingCategories ? (
            <Box
              sx={{
                display: "flex",
                height: "80%",
                // backgroundColor: "red",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LoadingGear width="100px" />
            </Box>
          ) : (
            <>
              <Card
                elevation={10}
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  marginTop: "50px",
                }}
              >
                {categoriesCopy?.map((category, idx) => (
                  <Box key={idx}>
                    <Box
                      sx={{
                        borderTop:
                          idx !== 0 ? "1px solid rgba(0, 0, 0, 0.2)" : "none",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          padding: "10px 30px",
                          height: "100%",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        onClick={() => {
                          if (!category.firstTimeExpanded) {
                            console.log(
                              `FETCHING PRODUCTS FOR:\n{\n\tcategoryId: ${category._id},\n}`
                            );
                            dispatch(
                              fetchProducts({
                                ids: {
                                  categoryId: category._id,
                                },
                                type: "category",
                              })
                            );
                          }
                          setCategoriesCopy(
                            categoriesCopy.map((category, index) =>
                              index === idx
                                ? {
                                    ...category,
                                    expanded: !category.expanded,
                                    firstTimeExpanded: true,
                                  }
                                : category
                            )
                          );
                        }}
                      >
                        {category.name}
                        <IconButton>
                          <ExpandMore />
                        </IconButton>
                      </div>
                    </Box>
                    <Collapse
                      sx={{
                        backgroundColor: "rgb(230, 230, 230)",
                      }}
                      in={categoriesCopy[idx]?.expanded}
                      // timeout="auto"
                      unmountOnExit
                      // sx={{ position: "relative" }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          padding: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            boxShadow: 5,
                            display:
                              products?.filter(
                                (product) =>
                                  product.categoryId === category._id &&
                                  !product.subCategory
                              ).length > 0
                                ? "none"
                                : "block",
                          }}
                        >
                          <div
                            style={{
                              padding: "10px",
                              // borderRadius: "10px",
                              // boxShadow: 5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              backgroundColor: "#C8D3D6",
                              zIndex: 100,
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setCategoriesCopy(
                                categoriesCopy.map((category, index) =>
                                  index === idx
                                    ? {
                                        ...category,
                                        expandedAddSubCategory:
                                          !category.expandedAddSubCategory,
                                      }
                                    : category
                                )
                              );
                            }}
                          >
                            <Typography>
                              Προσθήκη στην κατηγορία {`"${category.name}"`}
                            </Typography>
                            <IconButton>
                              <ExpandMore />
                            </IconButton>
                          </div>
                          <Collapse
                            in={categoriesCopy[idx]?.expandedAddSubCategory}
                            unmountOnExit
                            sx={{
                              padding: "10px",
                              // borderRadius: "10px",
                              // boxShadow: 5,
                              backgroundColor: "#C8D3D6",
                            }}
                          >
                            <hr
                              style={{
                                opacity: 0.2,
                                marginInline: "auto",
                                marginTop: "0",
                              }}
                            ></hr>
                            <Box
                              sx={{
                                display: { xs: "block", sm: "flex" },
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Box
                                sx={{
                                  display: { xs: "block", sm: "flex" },
                                  alignItems: "center",
                                  marginBottom: { xs: " 10px", sm: "0" },
                                }}
                              >
                                <Typography sx={{ marginRight: "20px" }}>
                                  Όνομα υποκατηγορίας
                                </Typography>
                                <TextField
                                  size="small"
                                  sx={{
                                    backgroundColor: "white",
                                    borderRadius: "4px",
                                  }}
                                  onChange={(e) => {
                                    setCategoriesCopy(
                                      categoriesCopy.map((category, index) =>
                                        index === idx
                                          ? {
                                              ...category,
                                              categoryNameToAdd: e.target.value,
                                            }
                                          : category
                                      )
                                    );
                                  }}
                                ></TextField>
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: {
                                    xs: "10px",
                                    sm: "0",
                                  },
                                }}
                              >
                                <Typography>Χωρίζεται σε:</Typography>
                                <FormControl>
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={
                                      category.subCategoryToAddType
                                        ? category.subCategoryToAddType
                                        : "types"
                                    }
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setCategoriesCopy(
                                        categoriesCopy.map((category, index) =>
                                          index === idx
                                            ? {
                                                ...category,
                                                subCategoryToAddType:
                                                  e.target.value,
                                              }
                                            : category
                                        )
                                      );
                                    }}
                                  >
                                    <FormControlLabel
                                      value="types"
                                      control={<Radio />}
                                      label="Τύπους"
                                    />
                                    <FormControlLabel
                                      value="subs"
                                      control={<Radio />}
                                      label="Υποκατηγορίες"
                                    />
                                    <FormControlLabel
                                      value="products"
                                      control={<Radio />}
                                      label="Προϊόντα"
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </Box>
                              <Button
                                disabled={
                                  !categoriesCopy[idx]?.categoryNameToAdd
                                }
                                variant="contained"
                                onClick={() => {
                                  dispatch(
                                    addSubCategory(
                                      {
                                        categoryId: category._id,
                                        name: category?.categoryNameToAdd,
                                        subCategoryToAddType:
                                          category.subCategoryToAddType
                                            ? category.subCategoryToAddType
                                            : "types",
                                        type: "subCategory",
                                      },
                                      categoriesCopy,
                                      setCategoriesCopy
                                    )
                                  );
                                }}
                              >
                                ΠΡΟΣΘΗΚΗ
                              </Button>
                            </Box>
                          </Collapse>
                        </Box>
                        <Box
                          sx={{
                            boxShadow: 5,
                            marginTop: "15px",
                            display: category.subCategories ? "none" : "block",
                          }}
                        >
                          <div
                            style={{
                              padding: "10px",
                              // borderRadius: "10px",
                              // boxShadow: 5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              backgroundColor: "#C8D3D6",
                              zIndex: 100,
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setCategoriesCopy(
                                categoriesCopy.map((category, index) =>
                                  index === idx
                                    ? {
                                        ...category,
                                        expandedAddProduct:
                                          !category.expandedAddProduct,
                                      }
                                    : category
                                )
                              );
                            }}
                          >
                            <Typography>
                              Προσθήκη <b>προϊόντος</b> στην κατηγορία{" "}
                              {`"${category.name}"`}
                            </Typography>
                            <IconButton>
                              <ExpandMore />
                            </IconButton>
                          </div>
                          <Collapse
                            in={categoriesCopy[idx]?.expandedAddProduct}
                            unmountOnExit
                            sx={{
                              padding: "10px",
                              // borderRadius: "10px",
                              // boxShadow: 5,
                              backgroundColor: "#C8D3D6",
                            }}
                          >
                            <hr
                              style={{
                                opacity: 0.2,
                                marginInline: "auto",
                                marginTop: "0",
                              }}
                            ></hr>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Box
                                sx={{
                                  // backgroundColor: "red",
                                  width: "fit-content",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    marginBottom: "10px",
                                    // backgroundColor: "red",
                                    // minWidth: "50%",
                                  }}
                                >
                                  <Typography sx={{ marginRight: "20px" }}>
                                    Εικόνες
                                  </Typography>
                                  <Box
                                    sx={{
                                      maxWidth: "234px",
                                    }}
                                  >
                                    <FileBase
                                      multiple={false}
                                      onDone={(data) => {
                                        console.log(data);
                                        if (
                                          data.type.substring(
                                            0,
                                            data.type.indexOf("/")
                                          ) !== "image"
                                        ) {
                                          console.log("INVALID");
                                          return;
                                        }
                                        setCategoriesCopy(
                                          categoriesCopy.map((cat, index) =>
                                            index === idx
                                              ? {
                                                  ...cat,
                                                  productToAddImages:
                                                    !cat.productToAddImages
                                                      ? [
                                                          {
                                                            name: data.name,
                                                            data: data.base64,
                                                          },
                                                        ]
                                                      : [
                                                          ...cat.productToAddImages,
                                                          {
                                                            name: data.name,
                                                            data: data.base64,
                                                          },
                                                        ],
                                                }
                                              : cat
                                          )
                                        );
                                      }}
                                    />
                                    {category?.productToAddImages?.map(
                                      (image, idxImage) => (
                                        <Box
                                          key={idxImage}
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginTop: "5px",
                                          }}
                                        >
                                          <Typography>{image.name}</Typography>
                                          <button
                                            style={{
                                              backgroundColor: "red",
                                              borderRadius: "50%",
                                              border: "none",
                                              color: "white",
                                              aspectRatio: 1,
                                              height: "1.5rem",
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              marginLeft: "10px",
                                            }}
                                            onClick={() => {
                                              setCategoriesCopy(
                                                categoriesCopy.map(
                                                  (cat, index) =>
                                                    index === idx
                                                      ? {
                                                          ...cat,
                                                          productToAddImages:
                                                            cat.productToAddImages.filter(
                                                              (
                                                                image2,
                                                                idxImage2
                                                              ) =>
                                                                idxImage !==
                                                                idxImage2
                                                            ),
                                                        }
                                                      : cat
                                                )
                                              );
                                            }}
                                          >
                                            <Delete
                                              sx={{
                                                height: "20px",
                                              }}
                                            />
                                          </button>
                                        </Box>
                                      )
                                    )}
                                  </Box>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    marginBottom: "10px",
                                    // backgroundColor: "red",
                                    // minWidth: "50%",
                                  }}
                                >
                                  <Typography sx={{ marginRight: "20px" }}>
                                    Κωδικός
                                  </Typography>
                                  <TextField
                                    size="small"
                                    sx={{
                                      backgroundColor: "white",
                                      borderRadius: "4px",
                                    }}
                                    onChange={(e) => {
                                      setCategoriesCopy(
                                        categoriesCopy.map((cat, index) =>
                                          index === idx
                                            ? {
                                                ...cat,
                                                productToAddCode:
                                                  e.target.value,
                                              }
                                            : cat
                                        )
                                      );
                                      console.log(category);
                                    }}
                                  ></TextField>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    marginBottom: "10px",
                                    // backgroundColor: "red",
                                    // minWidth: "50%",
                                  }}
                                >
                                  <Typography sx={{ marginRight: "20px" }}>
                                    Όνομα
                                  </Typography>
                                  <TextField
                                    size="small"
                                    sx={{
                                      backgroundColor: "white",
                                      borderRadius: "4px",
                                    }}
                                    onChange={(e) => {
                                      setCategoriesCopy(
                                        categoriesCopy.map((cat, index) =>
                                          index === idx
                                            ? {
                                                ...cat,
                                                productToAddName:
                                                  e.target.value,
                                              }
                                            : cat
                                        )
                                      );
                                      console.log(category);
                                    }}
                                  ></TextField>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    marginBottom: "10px",
                                    // backgroundColor: "red",
                                    // minWidth: "50%",
                                  }}
                                >
                                  <Typography sx={{ marginRight: "20px" }}>
                                    Τιμή
                                  </Typography>
                                  <TextField
                                    size="small"
                                    sx={{
                                      backgroundColor: "white",
                                      borderRadius: "4px",
                                      // border: ,
                                    }}
                                    type="number"
                                    onChange={(e) => {
                                      setCategoriesCopy(
                                        categoriesCopy.map((cat, index) =>
                                          index === idx
                                            ? {
                                                ...cat,
                                                productToAddPrice:
                                                  e.target.value,
                                              }
                                            : cat
                                        )
                                      );
                                      console.log(category);
                                    }}
                                  ></TextField>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    marginBottom: "10px",
                                    // backgroundColor: "red",
                                    // minWidth: "50%",
                                  }}
                                >
                                  <Typography sx={{ marginRight: "20px" }}>
                                    Τεμάχια
                                  </Typography>
                                  <TextField
                                    size="small"
                                    sx={{
                                      backgroundColor: "white",
                                      borderRadius: "4px",
                                    }}
                                    type="number"
                                    onChange={(e) => {
                                      setCategoriesCopy(
                                        categoriesCopy.map((cat, index) =>
                                          index === idx
                                            ? {
                                                ...cat,
                                                productToAddInStock:
                                                  e.target.value,
                                              }
                                            : cat
                                        )
                                      );
                                      console.log(category);
                                    }}
                                  ></TextField>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    marginBottom: "10px",
                                    // backgroundColor: "red",
                                    // minWidth: "50%",
                                  }}
                                >
                                  <Typography sx={{ marginRight: "20px" }}>
                                    Κατασκευαστής
                                  </Typography>
                                  <TextField
                                    size="small"
                                    sx={{
                                      backgroundColor: "white",
                                      borderRadius: "4px",
                                    }}
                                    onChange={(e) => {
                                      setCategoriesCopy(
                                        categoriesCopy.map((cat, index) =>
                                          index === idx
                                            ? {
                                                ...cat,
                                                productToAddManufacturer:
                                                  e.target.value,
                                              }
                                            : cat
                                        )
                                      );
                                      console.log(category);
                                    }}
                                  ></TextField>
                                </Box>
                                <Button
                                  type="button"
                                  variant="contained"
                                  sx={{ marginTop: "10px" }}
                                  disabled={
                                    !category.productToAddImages ||
                                    (category.productToAddImages &&
                                      category.productToAddImages.length ===
                                        0) ||
                                    !category.productToAddCode ||
                                    !category.productToAddName ||
                                    !category.productToAddPrice ||
                                    !category.productToAddInStock ||
                                    !category.productToAddManufacturer
                                  }
                                  onClick={() => {
                                    // console.log({
                                    //   images: category.productToAddImages,
                                    //   code: category.productToAddCode,
                                    //   name: category.productToAddName,
                                    //   price: category.productToAddPrice,
                                    //   inStock: category.productToAddInStock,
                                    //   manufacturer:
                                    //     category.productToAddManufacturer,
                                    //   categoryId: category._id,
                                    // });
                                    dispatch(
                                      addProduct({
                                        images: category.productToAddImages,
                                        code: category.productToAddCode,
                                        name: category.productToAddName,
                                        price: category.productToAddPrice,
                                        inStock: category.productToAddInStock,
                                        manufacturer:
                                          category.productToAddManufacturer,
                                        categoryId: category._id,
                                      })
                                    );
                                  }}
                                >
                                  ΠΡΟΣΘΗΚΗ
                                </Button>
                              </Box>
                            </Box>
                          </Collapse>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          padding: "0 15px",
                          paddingBottom: "10px",
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                        }}
                      >
                        {products?.map(
                          (product, idxProduct) =>
                            product.categoryId === category._id &&
                            !product.subCategoryId && (
                              <AdminProduct
                                key={idxProduct}
                                product={product}
                              />
                            )
                        )}
                      </Box>
                      {category?.subCategories?.map((subCategory, idxSub) => (
                        <Box key={idxSub}>
                          <Box
                            sx={{
                              borderTop: "1px solid rgba(0, 0, 0, 0.2)",
                              cursor: "pointer",
                            }}
                          >
                            <div
                              style={{
                                padding: "10px 30px",
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                              onClick={() => {
                                if (
                                  !subCategory.firstTimeExpanded &&
                                  !subCategory.types &&
                                  !subCategory.subs
                                ) {
                                  console.log(
                                    `FETCHING PRODUCTS FOR:\n{\n\tcategoryId: ${category._id},\n\tsubCategoryId: ${subCategory._id}\n}`
                                  );
                                  dispatch(
                                    fetchProducts({
                                      ids: {
                                        categoryId: category._id,
                                        subCategoryId: subCategory._id,
                                      },
                                      type: "subCategory",
                                    })
                                  );
                                }
                                setCategoriesCopy(
                                  categoriesCopy.map((category, index) =>
                                    index === idx
                                      ? {
                                          ...category,
                                          subCategories:
                                            category.subCategories.map(
                                              (sub, indexSub) =>
                                                indexSub === idxSub
                                                  ? {
                                                      ...sub,
                                                      expanded: !sub.expanded,
                                                      firstTimeExpanded: true,
                                                    }
                                                  : sub
                                            ),
                                        }
                                      : category
                                  )
                                );
                              }}
                            >
                              {subCategory.name}
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <button
                                  type="button"
                                  style={{
                                    backgroundColor: "red",
                                    border: "none",
                                    color: "white",
                                    borderRadius: "50%",
                                    aspectRatio: 1,
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpen({
                                      id: subCategory._id,
                                      categoryId: category._id,
                                      name: subCategory.name,
                                      type: "subCategory",
                                    });
                                  }}
                                >
                                  <Delete />
                                </button>
                                <IconButton>
                                  <ExpandMore />
                                </IconButton>
                              </div>
                            </div>
                          </Box>
                          <Collapse
                            sx={{
                              backgroundColor: categoriesCopy[idx]
                                ?.subCategories[idxSub]?.types
                                ? "rgba(190, 190, 190)"
                                : "rgba(210, 210, 210)",
                            }}
                            in={
                              categoriesCopy[idx]?.subCategories[idxSub]
                                ?.expanded
                            }
                            // timeout="auto"
                            unmountOnExit
                          >
                            <Box
                              sx={{
                                width: "100%",
                                padding: "20px",
                              }}
                            >
                              {(subCategory.types || subCategory.subs) && (
                                <Box sx={{ boxShadow: 5 }}>
                                  <div
                                    style={{
                                      padding: "10px",
                                      // borderRadius: "10px",
                                      // boxShadow: 5,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      backgroundColor: "#C8D3D6",
                                      zIndex: 100,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      setCategoriesCopy(
                                        categoriesCopy.map((category, index) =>
                                          index === idx
                                            ? {
                                                ...category,
                                                subCategories:
                                                  category.subCategories.map(
                                                    (
                                                      subCategory2,
                                                      indexSubCategory2
                                                    ) =>
                                                      indexSubCategory2 ===
                                                      idxSub
                                                        ? {
                                                            ...subCategory2,
                                                            expandedAddBelow:
                                                              !subCategory2.expandedAddBelow,
                                                          }
                                                        : subCategory2
                                                  ),
                                              }
                                            : category
                                        )
                                      );
                                    }}
                                  >
                                    <Typography>
                                      Προσθήκη στην υποκατηγορία{" "}
                                      {`"${subCategory.name}"`}
                                    </Typography>
                                    <IconButton>
                                      <ExpandMore />
                                    </IconButton>
                                  </div>
                                  <Collapse
                                    in={
                                      categoriesCopy[idx]?.subCategories[idxSub]
                                        ?.expandedAddBelow
                                    }
                                    unmountOnExit
                                    sx={{
                                      padding: "10px",
                                      // borderRadius: "10px",
                                      // boxShadow: 5,
                                      backgroundColor: "#C8D3D6",
                                    }}
                                  >
                                    <hr
                                      style={{
                                        opacity: 0.2,
                                        marginInline: "auto",
                                        marginTop: "0",
                                      }}
                                    ></hr>
                                    <Box
                                      sx={{
                                        display: { xs: "block", sm: "flex" },
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: { xs: "block", sm: "flex" },
                                          alignItems: "center",
                                          marginBottom: { xs: "10px", sm: "0" },
                                        }}
                                      >
                                        <Typography
                                          sx={{ marginRight: "20px" }}
                                        >
                                          Όνομα{" "}
                                          {subCategory.types
                                            ? "τύπου"
                                            : subCategory.subs
                                            ? "υποκατηγορίας"
                                            : "--"}
                                        </Typography>
                                        <TextField
                                          size="small"
                                          sx={{
                                            backgroundColor: "white",
                                            borderRadius: "4px",
                                          }}
                                          onChange={(e) => {
                                            setCategoriesCopy(
                                              categoriesCopy.map(
                                                (category, index) =>
                                                  index === idx
                                                    ? {
                                                        ...category,
                                                        subCategories:
                                                          category.subCategories.map(
                                                            (
                                                              subCategory2,
                                                              indexSubCategory2
                                                            ) =>
                                                              indexSubCategory2 ===
                                                              idxSub
                                                                ? {
                                                                    ...subCategory2,
                                                                    typeNameToAdd:
                                                                      subCategory.types
                                                                        ? e
                                                                            .target
                                                                            .value
                                                                        : undefined,
                                                                    subNameToAdd:
                                                                      subCategory.subs
                                                                        ? e
                                                                            .target
                                                                            .value
                                                                        : undefined,
                                                                  }
                                                                : subCategory2
                                                          ),
                                                      }
                                                    : category
                                              )
                                            );
                                            console.log(subCategory);
                                          }}
                                        ></TextField>
                                      </Box>
                                      <Button
                                        disabled={
                                          !(subCategory.types
                                            ? categoriesCopy[idx]
                                                ?.subCategories[idxSub]
                                                ?.typeNameToAdd
                                            : subCategory.subs
                                            ? categoriesCopy[idx]
                                                ?.subCategories[idxSub]
                                                ?.subNameToAdd
                                            : false)
                                        }
                                        variant="contained"
                                        onClick={() => {
                                          console.log(subCategory.subNameToAdd);
                                          dispatch(
                                            addSubCategory(
                                              {
                                                categoryId: category._id,
                                                subCategoryId: subCategory._id,
                                                name: subCategory.types
                                                  ? subCategory.typeNameToAdd
                                                  : subCategory.subNameToAdd,
                                                type: subCategory.types
                                                  ? "type"
                                                  : "sub",
                                              },
                                              categoriesCopy,
                                              setCategoriesCopy
                                            )
                                          );
                                        }}
                                      >
                                        ΠΡΟΣΘΗΚΗ
                                      </Button>
                                    </Box>
                                  </Collapse>
                                </Box>
                              )}
                              <Box
                                sx={{
                                  boxShadow: 5,
                                  marginTop: "15px",
                                  display:
                                    subCategory.types || subCategory.subs
                                      ? "none"
                                      : "block",
                                }}
                              >
                                <div
                                  style={{
                                    padding: "10px",
                                    // borderRadius: "10px",
                                    // boxShadow: 5,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    backgroundColor: "#C8D3D6",
                                    zIndex: 100,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setCategoriesCopy(
                                      categoriesCopy.map(
                                        (categoryParam, index) =>
                                          index === idx
                                            ? {
                                                ...categoryParam,
                                                subCategories:
                                                  categoryParam.subCategories.map(
                                                    (
                                                      subCategoryParam,
                                                      idxSubParam
                                                    ) =>
                                                      idxSubParam === idxSub
                                                        ? {
                                                            ...subCategoryParam,
                                                            expandedAddProduct:
                                                              !subCategoryParam.expandedAddProduct,
                                                          }
                                                        : subCategoryParam
                                                  ),
                                              }
                                            : categoryParam
                                      )
                                    );
                                  }}
                                >
                                  <Typography>
                                    Προσθήκη <b>προϊόντος</b> στην υποκατηγορία{" "}
                                    {`"${subCategory.name}"`}
                                  </Typography>
                                  <IconButton>
                                    <ExpandMore />
                                  </IconButton>
                                </div>
                                <Collapse
                                  in={subCategory?.expandedAddProduct}
                                  unmountOnExit
                                  sx={{
                                    padding: "10px",
                                    // borderRadius: "10px",
                                    // boxShadow: 5,
                                    backgroundColor: "#C8D3D6",
                                  }}
                                >
                                  <hr
                                    style={{
                                      opacity: 0.2,
                                      marginInline: "auto",
                                      marginTop: "0",
                                    }}
                                  ></hr>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        // backgroundColor: "red",
                                        width: "fit-content",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          width: "100%",
                                          marginBottom: "10px",
                                          // backgroundColor: "red",
                                          // minWidth: "50%",
                                        }}
                                      >
                                        <Typography
                                          sx={{ marginRight: "20px" }}
                                        >
                                          Εικόνες
                                        </Typography>
                                        <Box
                                          sx={{
                                            maxWidth: "234px",
                                          }}
                                        >
                                          <FileBase
                                            multiple={false}
                                            onDone={(data) => {
                                              console.log(data);
                                              if (
                                                data.type.substring(
                                                  0,
                                                  data.type.indexOf("/")
                                                ) !== "image"
                                              ) {
                                                console.log("INVALID");
                                                return;
                                              }
                                              setCategoriesCopy(
                                                categoriesCopy.map(
                                                  (cat, index) =>
                                                    index === idx
                                                      ? {
                                                          ...cat,
                                                          subCategories:
                                                            cat.subCategories.map(
                                                              (
                                                                subCat,
                                                                idxSubCat
                                                              ) =>
                                                                idxSubCat ===
                                                                idxSub
                                                                  ? {
                                                                      ...subCat,
                                                                      productToAddImages:
                                                                        !subCat.productToAddImages
                                                                          ? [
                                                                              {
                                                                                name: data.name,
                                                                                data: data.base64,
                                                                              },
                                                                            ]
                                                                          : [
                                                                              ...subCat.productToAddImages,
                                                                              {
                                                                                name: data.name,
                                                                                data: data.base64,
                                                                              },
                                                                            ],
                                                                    }
                                                                  : subCat
                                                            ),
                                                        }
                                                      : cat
                                                )
                                              );
                                            }}
                                          />
                                          {subCategory?.productToAddImages?.map(
                                            (image, idxImage) => (
                                              <Box
                                                key={idxImage}
                                                sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  marginTop: "5px",
                                                }}
                                              >
                                                <Typography>
                                                  {image.name}
                                                </Typography>
                                                <button
                                                  style={{
                                                    backgroundColor: "red",
                                                    borderRadius: "50%",
                                                    border: "none",
                                                    color: "white",
                                                    aspectRatio: 1,
                                                    height: "1.5rem",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginLeft: "10px",
                                                  }}
                                                  onClick={() => {
                                                    setCategoriesCopy(
                                                      categoriesCopy.map(
                                                        (cat, index) =>
                                                          index === idx
                                                            ? {
                                                                ...cat,
                                                                subCategories:
                                                                  cat.subCategories.map(
                                                                    (
                                                                      subCat,
                                                                      idxSubCat
                                                                    ) =>
                                                                      idxSubCat ===
                                                                      idxSub
                                                                        ? {
                                                                            ...subCat,
                                                                            productToAddImages:
                                                                              subCat.productToAddImages.filter(
                                                                                (
                                                                                  image2,
                                                                                  idxImage2
                                                                                ) =>
                                                                                  idxImage !==
                                                                                  idxImage2
                                                                              ),
                                                                          }
                                                                        : subCat
                                                                  ),
                                                              }
                                                            : cat
                                                      )
                                                    );
                                                  }}
                                                >
                                                  <Delete
                                                    sx={{
                                                      height: "20px",
                                                    }}
                                                  />
                                                </button>
                                              </Box>
                                            )
                                          )}
                                        </Box>
                                      </Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          width: "100%",
                                          marginBottom: "10px",
                                          // backgroundColor: "red",
                                          // minWidth: "50%",
                                        }}
                                      >
                                        <Typography
                                          sx={{ marginRight: "20px" }}
                                        >
                                          Κωδικός
                                        </Typography>
                                        <TextField
                                          size="small"
                                          sx={{
                                            backgroundColor: "white",
                                            borderRadius: "4px",
                                          }}
                                          onChange={(e) => {
                                            setCategoriesCopy(
                                              categoriesCopy.map((cat, index) =>
                                                index === idx
                                                  ? {
                                                      ...cat,
                                                      subCategories:
                                                        cat.subCategories.map(
                                                          (subCat, idxSubCat) =>
                                                            idxSubCat === idxSub
                                                              ? {
                                                                  ...subCat,
                                                                  productToAddCode:
                                                                    e.target
                                                                      .value,
                                                                }
                                                              : subCat
                                                        ),
                                                    }
                                                  : cat
                                              )
                                            );
                                            console.log(subCategory);
                                          }}
                                        ></TextField>
                                      </Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          width: "100%",
                                          marginBottom: "10px",
                                          // backgroundColor: "red",
                                          // minWidth: "50%",
                                        }}
                                      >
                                        <Typography
                                          sx={{ marginRight: "20px" }}
                                        >
                                          Όνομα
                                        </Typography>
                                        <TextField
                                          size="small"
                                          sx={{
                                            backgroundColor: "white",
                                            borderRadius: "4px",
                                          }}
                                          onChange={(e) => {
                                            setCategoriesCopy(
                                              categoriesCopy.map((cat, index) =>
                                                index === idx
                                                  ? {
                                                      ...cat,
                                                      subCategories:
                                                        cat.subCategories.map(
                                                          (subCat, idxSubCat) =>
                                                            idxSubCat === idxSub
                                                              ? {
                                                                  ...subCat,
                                                                  productToAddName:
                                                                    e.target
                                                                      .value,
                                                                }
                                                              : subCat
                                                        ),
                                                    }
                                                  : cat
                                              )
                                            );
                                            console.log(subCategory);
                                          }}
                                        ></TextField>
                                      </Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          width: "100%",
                                          marginBottom: "10px",
                                          // backgroundColor: "red",
                                          // minWidth: "50%",
                                        }}
                                      >
                                        <Typography
                                          sx={{ marginRight: "20px" }}
                                        >
                                          Τιμή
                                        </Typography>
                                        <TextField
                                          size="small"
                                          sx={{
                                            backgroundColor: "white",
                                            borderRadius: "4px",
                                            // border: ,
                                          }}
                                          type="number"
                                          onChange={(e) => {
                                            setCategoriesCopy(
                                              categoriesCopy.map((cat, index) =>
                                                index === idx
                                                  ? {
                                                      ...cat,
                                                      subCategories:
                                                        cat.subCategories.map(
                                                          (subCat, idxSubCat) =>
                                                            idxSubCat === idxSub
                                                              ? {
                                                                  ...subCat,
                                                                  productToAddPrice:
                                                                    e.target
                                                                      .value,
                                                                }
                                                              : subCat
                                                        ),
                                                    }
                                                  : cat
                                              )
                                            );
                                            console.log(subCategory);
                                          }}
                                        ></TextField>
                                      </Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          width: "100%",
                                          marginBottom: "10px",
                                          // backgroundColor: "red",
                                          // minWidth: "50%",
                                        }}
                                      >
                                        <Typography
                                          sx={{ marginRight: "20px" }}
                                        >
                                          Τεμάχια
                                        </Typography>
                                        <TextField
                                          size="small"
                                          sx={{
                                            backgroundColor: "white",
                                            borderRadius: "4px",
                                          }}
                                          type="number"
                                          onChange={(e) => {
                                            setCategoriesCopy(
                                              categoriesCopy.map((cat, index) =>
                                                index === idx
                                                  ? {
                                                      ...cat,
                                                      subCategories:
                                                        cat.subCategories.map(
                                                          (subCat, idxSubCat) =>
                                                            idxSubCat === idxSub
                                                              ? {
                                                                  ...subCat,
                                                                  productToAddInStock:
                                                                    e.target
                                                                      .value,
                                                                }
                                                              : subCat
                                                        ),
                                                    }
                                                  : cat
                                              )
                                            );
                                            console.log(subCategory);
                                          }}
                                        ></TextField>
                                      </Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          width: "100%",
                                          marginBottom: "10px",
                                          // backgroundColor: "red",
                                          // minWidth: "50%",
                                        }}
                                      >
                                        <Typography
                                          sx={{ marginRight: "20px" }}
                                        >
                                          Κατασκευαστής
                                        </Typography>
                                        <TextField
                                          size="small"
                                          sx={{
                                            backgroundColor: "white",
                                            borderRadius: "4px",
                                          }}
                                          onChange={(e) => {
                                            setCategoriesCopy(
                                              categoriesCopy.map((cat, index) =>
                                                index === idx
                                                  ? {
                                                      ...cat,
                                                      subCategories:
                                                        cat.subCategories.map(
                                                          (subCat, idxSubCat) =>
                                                            idxSubCat === idxSub
                                                              ? {
                                                                  ...subCat,
                                                                  productToAddManufacturer:
                                                                    e.target
                                                                      .value,
                                                                }
                                                              : subCat
                                                        ),
                                                    }
                                                  : cat
                                              )
                                            );
                                            console.log(subCategory);
                                          }}
                                        ></TextField>
                                      </Box>
                                      <Button
                                        type="button"
                                        variant="contained"
                                        sx={{ marginTop: "10px" }}
                                        disabled={
                                          !subCategory.productToAddImages ||
                                          (subCategory.productToAddImages &&
                                            subCategory.productToAddImages
                                              .length === 0) ||
                                          !subCategory.productToAddCode ||
                                          !subCategory.productToAddName ||
                                          !subCategory.productToAddPrice ||
                                          !subCategory.productToAddInStock ||
                                          !subCategory.productToAddManufacturer
                                        }
                                        onClick={() => {
                                          // console.log({
                                          //   images: category.productToAddImages,
                                          //   code: category.productToAddCode,
                                          //   name: category.productToAddName,
                                          //   price: category.productToAddPrice,
                                          //   inStock: category.productToAddInStock,
                                          //   manufacturer:
                                          //     category.productToAddManufacturer,
                                          //   categoryId: category._id,
                                          // });
                                          dispatch(
                                            addProduct({
                                              images:
                                                subCategory.productToAddImages,
                                              code: subCategory.productToAddCode,
                                              name: subCategory.productToAddName,
                                              price:
                                                subCategory.productToAddPrice,
                                              inStock:
                                                subCategory.productToAddInStock,
                                              manufacturer:
                                                subCategory.productToAddManufacturer,
                                              categoryId: category._id,
                                              subCategoryId: subCategory._id,
                                            })
                                          );
                                        }}
                                      >
                                        ΠΡΟΣΘΗΚΗ
                                      </Button>
                                    </Box>
                                  </Box>
                                </Collapse>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                padding: "0 15px",
                                paddingBottom: "10px",
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                              }}
                            >
                              {products?.map(
                                (product, idxProduct) =>
                                  product.subCategoryId === subCategory._id &&
                                  product.typeId === undefined &&
                                  product.subId === undefined && (
                                    <AdminProduct
                                      key={idxProduct}
                                      product={product}
                                    />
                                  )
                              )}
                            </Box>
                            {subCategory?.types?.map((type, idxType) => (
                              <Box key={idxType}>
                                <Box
                                  sx={{
                                    borderTop:
                                      idxType !== 0
                                        ? "1px solid rgba(0, 0, 0, 0.2)"
                                        : "none",
                                    cursor: "pointer",
                                    backgroundColor: "rgb(190, 190, 190)",
                                  }}
                                >
                                  <div
                                    style={{
                                      padding: "10px 30px",
                                      height: "100%",
                                      width: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                    onClick={() => {
                                      if (!type.firstTimeExpanded) {
                                        console.log(
                                          `FETCHING PRODUCTS FOR:\n{\n\tcategoryId: ${category._id},\n\tsubCategoryId: ${subCategory._id},\n\ttypeId: ${type._id}\n}`
                                        );
                                        dispatch(
                                          fetchProducts({
                                            ids: {
                                              categoryId: category._id,
                                              subCategoryId: subCategory._id,
                                              typeId: type._id,
                                            },
                                            type: "type",
                                          })
                                        );
                                      }
                                      setCategoriesCopy(
                                        categoriesCopy.map((category, index) =>
                                          index === idx
                                            ? {
                                                ...category,
                                                subCategories:
                                                  category.subCategories.map(
                                                    (sub, indexSub) =>
                                                      indexSub === idxSub
                                                        ? {
                                                            ...sub,
                                                            types:
                                                              sub.types.map(
                                                                (
                                                                  type2,
                                                                  indexType2
                                                                ) =>
                                                                  indexType2 ===
                                                                  idxType
                                                                    ? {
                                                                        ...type2,
                                                                        expanded:
                                                                          !type2.expanded,
                                                                        firstTimeExpanded: true,
                                                                      }
                                                                    : type2
                                                              ),
                                                          }
                                                        : sub
                                                  ),
                                              }
                                            : category
                                        )
                                      );
                                    }}
                                  >
                                    {type.name}
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <button
                                        type="button"
                                        style={{
                                          backgroundColor: "red",
                                          border: "none",
                                          color: "white",
                                          borderRadius: "50%",
                                          aspectRatio: 1,
                                        }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleOpen({
                                            id: type._id,
                                            categoryId: category._id,
                                            subCategoryId: subCategory._id,
                                            name: type.name,
                                            type: "type",
                                          });
                                        }}
                                      >
                                        <Delete />
                                      </button>
                                      <IconButton>
                                        <ExpandMore />
                                      </IconButton>
                                    </div>
                                  </div>
                                </Box>
                                <Collapse
                                  in={type.expanded}
                                  unmountOnExit
                                  sx={{
                                    backgroundColor: "rgb(160, 160, 160)",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      padding: "20px",
                                    }}
                                  >
                                    <Box sx={{ boxShadow: 5 }}>
                                      <div
                                        style={{
                                          padding: "10px",
                                          // borderRadius: "10px",
                                          // boxShadow: 5,
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          backgroundColor: "#C8D3D6",
                                          zIndex: 100,
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          setCategoriesCopy(
                                            categoriesCopy.map(
                                              (category, index) =>
                                                index === idx
                                                  ? {
                                                      ...category,
                                                      subCategories:
                                                        category.subCategories.map(
                                                          (
                                                            subCategory2,
                                                            indexSubCategory2
                                                          ) =>
                                                            indexSubCategory2 ===
                                                            idxSub
                                                              ? {
                                                                  ...subCategory2,
                                                                  types:
                                                                    subCategory2.types.map(
                                                                      (
                                                                        type2,
                                                                        idxType2
                                                                      ) =>
                                                                        idxType2 ===
                                                                        idxType
                                                                          ? {
                                                                              ...type2,
                                                                              expandedAddProduct:
                                                                                !type2.expandedAddProduct,
                                                                            }
                                                                          : type2
                                                                    ),
                                                                }
                                                              : subCategory2
                                                        ),
                                                    }
                                                  : category
                                            )
                                          );
                                        }}
                                      >
                                        <Typography>
                                          Προσθήκη προϊόντος στον τύπο{" "}
                                          {`"${type.name}"`}
                                        </Typography>
                                        <IconButton>
                                          <ExpandMore />
                                        </IconButton>
                                      </div>
                                      <Collapse
                                        in={type?.expandedAddProduct}
                                        unmountOnExit
                                        sx={{
                                          padding: "10px",
                                          // borderRadius: "10px",
                                          // boxShadow: 5,
                                          backgroundColor: "#C8D3D6",
                                        }}
                                      >
                                        <hr
                                          style={{
                                            opacity: 0.2,
                                            marginInline: "auto",
                                            marginTop: "0",
                                          }}
                                        ></hr>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                          }}
                                        >
                                          <Box
                                            sx={{
                                              // backgroundColor: "red",
                                              width: "fit-content",
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: "100%",
                                                marginBottom: "10px",
                                                // backgroundColor: "red",
                                                // minWidth: "50%",
                                              }}
                                            >
                                              <Typography
                                                sx={{ marginRight: "20px" }}
                                              >
                                                Εικόνες
                                              </Typography>
                                              <Box
                                                sx={{
                                                  maxWidth: "234px",
                                                }}
                                              >
                                                <FileBase
                                                  multiple={false}
                                                  onDone={(data) => {
                                                    console.log(data);
                                                    if (
                                                      data.type.substring(
                                                        0,
                                                        data.type.indexOf("/")
                                                      ) !== "image"
                                                    ) {
                                                      console.log("INVALID");
                                                      return;
                                                    }
                                                    setCategoriesCopy(
                                                      categoriesCopy.map(
                                                        (category, index) =>
                                                          index === idx
                                                            ? {
                                                                ...category,
                                                                subCategories:
                                                                  category.subCategories.map(
                                                                    (
                                                                      subCategory2,
                                                                      indexSubCategory2
                                                                    ) =>
                                                                      indexSubCategory2 ===
                                                                      idxSub
                                                                        ? {
                                                                            ...subCategory2,
                                                                            types:
                                                                              subCategory2.types.map(
                                                                                (
                                                                                  type2,
                                                                                  idxType2
                                                                                ) =>
                                                                                  idxType2 ===
                                                                                  idxType
                                                                                    ? {
                                                                                        ...type2,
                                                                                        productToAddImages:
                                                                                          !type2.productToAddImages
                                                                                            ? [
                                                                                                {
                                                                                                  name: data.name,
                                                                                                  data: data.base64,
                                                                                                },
                                                                                              ]
                                                                                            : [
                                                                                                ...type2.productToAddImages,
                                                                                                {
                                                                                                  name: data.name,
                                                                                                  data: data.base64,
                                                                                                },
                                                                                              ],
                                                                                      }
                                                                                    : type2
                                                                              ),
                                                                          }
                                                                        : subCategory2
                                                                  ),
                                                              }
                                                            : category
                                                      )
                                                    );
                                                  }}
                                                />
                                                {type?.productToAddImages?.map(
                                                  (image, idxImage) => (
                                                    <Box
                                                      key={idxImage}
                                                      sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        marginTop: "5px",
                                                      }}
                                                    >
                                                      <Typography>
                                                        {image.name}
                                                      </Typography>
                                                      <button
                                                        style={{
                                                          backgroundColor:
                                                            "red",
                                                          borderRadius: "50%",
                                                          border: "none",
                                                          color: "white",
                                                          aspectRatio: 1,
                                                          height: "1.5rem",
                                                          display: "flex",
                                                          alignItems: "center",
                                                          justifyContent:
                                                            "center",
                                                          marginLeft: "10px",
                                                        }}
                                                        onClick={() => {
                                                          setCategoriesCopy(
                                                            categoriesCopy.map(
                                                              (
                                                                category,
                                                                index
                                                              ) =>
                                                                index === idx
                                                                  ? {
                                                                      ...category,
                                                                      subCategories:
                                                                        category.subCategories.map(
                                                                          (
                                                                            subCategory2,
                                                                            indexSubCategory2
                                                                          ) =>
                                                                            indexSubCategory2 ===
                                                                            idxSub
                                                                              ? {
                                                                                  ...subCategory2,
                                                                                  types:
                                                                                    subCategory2.types.map(
                                                                                      (
                                                                                        type2,
                                                                                        idxType2
                                                                                      ) =>
                                                                                        idxType2 ===
                                                                                        idxType
                                                                                          ? {
                                                                                              ...type2,
                                                                                              productToAddImages:
                                                                                                type2.productToAddImages.filter(
                                                                                                  (
                                                                                                    image2,
                                                                                                    idxImage2
                                                                                                  ) =>
                                                                                                    idxImage !==
                                                                                                    idxImage2
                                                                                                ),
                                                                                            }
                                                                                          : type2
                                                                                    ),
                                                                                }
                                                                              : subCategory2
                                                                        ),
                                                                    }
                                                                  : category
                                                            )
                                                          );
                                                        }}
                                                      >
                                                        <Delete
                                                          sx={{
                                                            height: "20px",
                                                          }}
                                                        />
                                                      </button>
                                                    </Box>
                                                  )
                                                )}
                                              </Box>
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: "100%",
                                                marginBottom: "10px",
                                                // backgroundColor: "red",
                                                // minWidth: "50%",
                                              }}
                                            >
                                              <Typography
                                                sx={{ marginRight: "20px" }}
                                              >
                                                Κωδικός
                                              </Typography>
                                              <TextField
                                                size="small"
                                                sx={{
                                                  backgroundColor: "white",
                                                  borderRadius: "4px",
                                                }}
                                                onChange={(e) => {
                                                  setCategoriesCopy(
                                                    categoriesCopy.map(
                                                      (category, index) =>
                                                        index === idx
                                                          ? {
                                                              ...category,
                                                              subCategories:
                                                                category.subCategories.map(
                                                                  (
                                                                    subCategory2,
                                                                    indexSubCategory2
                                                                  ) =>
                                                                    indexSubCategory2 ===
                                                                    idxSub
                                                                      ? {
                                                                          ...subCategory2,
                                                                          types:
                                                                            subCategory2.types.map(
                                                                              (
                                                                                type2,
                                                                                idxType2
                                                                              ) =>
                                                                                idxType2 ===
                                                                                idxType
                                                                                  ? {
                                                                                      ...type2,
                                                                                      productToAddCode:
                                                                                        e
                                                                                          .target
                                                                                          .value,
                                                                                    }
                                                                                  : type2
                                                                            ),
                                                                        }
                                                                      : subCategory2
                                                                ),
                                                            }
                                                          : category
                                                    )
                                                  );
                                                  console.log(type);
                                                }}
                                              ></TextField>
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: "100%",
                                                marginBottom: "10px",
                                                // backgroundColor: "red",
                                                // minWidth: "50%",
                                              }}
                                            >
                                              <Typography
                                                sx={{ marginRight: "20px" }}
                                              >
                                                Όνομα
                                              </Typography>
                                              <TextField
                                                size="small"
                                                sx={{
                                                  backgroundColor: "white",
                                                  borderRadius: "4px",
                                                }}
                                                onChange={(e) => {
                                                  setCategoriesCopy(
                                                    categoriesCopy.map(
                                                      (category, index) =>
                                                        index === idx
                                                          ? {
                                                              ...category,
                                                              subCategories:
                                                                category.subCategories.map(
                                                                  (
                                                                    subCategory2,
                                                                    indexSubCategory2
                                                                  ) =>
                                                                    indexSubCategory2 ===
                                                                    idxSub
                                                                      ? {
                                                                          ...subCategory2,
                                                                          types:
                                                                            subCategory2.types.map(
                                                                              (
                                                                                type2,
                                                                                idxType2
                                                                              ) =>
                                                                                idxType2 ===
                                                                                idxType
                                                                                  ? {
                                                                                      ...type2,
                                                                                      productToAddName:
                                                                                        e
                                                                                          .target
                                                                                          .value,
                                                                                    }
                                                                                  : type2
                                                                            ),
                                                                        }
                                                                      : subCategory2
                                                                ),
                                                            }
                                                          : category
                                                    )
                                                  );
                                                  console.log(type);
                                                }}
                                              ></TextField>
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: "100%",
                                                marginBottom: "10px",
                                                // backgroundColor: "red",
                                                // minWidth: "50%",
                                              }}
                                            >
                                              <Typography
                                                sx={{ marginRight: "20px" }}
                                              >
                                                Τιμή
                                              </Typography>
                                              <TextField
                                                size="small"
                                                sx={{
                                                  backgroundColor: "white",
                                                  borderRadius: "4px",
                                                  // border: ,
                                                }}
                                                type="number"
                                                onChange={(e) => {
                                                  setCategoriesCopy(
                                                    categoriesCopy.map(
                                                      (category, index) =>
                                                        index === idx
                                                          ? {
                                                              ...category,
                                                              subCategories:
                                                                category.subCategories.map(
                                                                  (
                                                                    subCategory2,
                                                                    indexSubCategory2
                                                                  ) =>
                                                                    indexSubCategory2 ===
                                                                    idxSub
                                                                      ? {
                                                                          ...subCategory2,
                                                                          types:
                                                                            subCategory2.types.map(
                                                                              (
                                                                                type2,
                                                                                idxType2
                                                                              ) =>
                                                                                idxType2 ===
                                                                                idxType
                                                                                  ? {
                                                                                      ...type2,
                                                                                      productToAddPrice:
                                                                                        e
                                                                                          .target
                                                                                          .value,
                                                                                    }
                                                                                  : type2
                                                                            ),
                                                                        }
                                                                      : subCategory2
                                                                ),
                                                            }
                                                          : category
                                                    )
                                                  );
                                                  console.log(
                                                    Number(
                                                      type.productToAddPrice
                                                    )
                                                  );
                                                  console.log(type);
                                                }}
                                              ></TextField>
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: "100%",
                                                marginBottom: "10px",
                                                // backgroundColor: "red",
                                                // minWidth: "50%",
                                              }}
                                            >
                                              <Typography
                                                sx={{ marginRight: "20px" }}
                                              >
                                                Τεμάχια
                                              </Typography>
                                              <TextField
                                                size="small"
                                                sx={{
                                                  backgroundColor: "white",
                                                  borderRadius: "4px",
                                                }}
                                                type="number"
                                                onChange={(e) => {
                                                  setCategoriesCopy(
                                                    categoriesCopy.map(
                                                      (category, index) =>
                                                        index === idx
                                                          ? {
                                                              ...category,
                                                              subCategories:
                                                                category.subCategories.map(
                                                                  (
                                                                    subCategory2,
                                                                    indexSubCategory2
                                                                  ) =>
                                                                    indexSubCategory2 ===
                                                                    idxSub
                                                                      ? {
                                                                          ...subCategory2,
                                                                          types:
                                                                            subCategory2.types.map(
                                                                              (
                                                                                type2,
                                                                                idxType2
                                                                              ) =>
                                                                                idxType2 ===
                                                                                idxType
                                                                                  ? {
                                                                                      ...type2,
                                                                                      productToAddInStock:
                                                                                        e
                                                                                          .target
                                                                                          .value,
                                                                                    }
                                                                                  : type2
                                                                            ),
                                                                        }
                                                                      : subCategory2
                                                                ),
                                                            }
                                                          : category
                                                    )
                                                  );
                                                  console.log(type);
                                                }}
                                              ></TextField>
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: "100%",
                                                marginBottom: "10px",
                                                // backgroundColor: "red",
                                                // minWidth: "50%",
                                              }}
                                            >
                                              <Typography
                                                sx={{ marginRight: "20px" }}
                                              >
                                                Κατασκευαστής
                                              </Typography>
                                              <TextField
                                                size="small"
                                                sx={{
                                                  backgroundColor: "white",
                                                  borderRadius: "4px",
                                                }}
                                                onChange={(e) => {
                                                  setCategoriesCopy(
                                                    categoriesCopy.map(
                                                      (category, index) =>
                                                        index === idx
                                                          ? {
                                                              ...category,
                                                              subCategories:
                                                                category.subCategories.map(
                                                                  (
                                                                    subCategory2,
                                                                    indexSubCategory2
                                                                  ) =>
                                                                    indexSubCategory2 ===
                                                                    idxSub
                                                                      ? {
                                                                          ...subCategory2,
                                                                          types:
                                                                            subCategory2.types.map(
                                                                              (
                                                                                type2,
                                                                                idxType2
                                                                              ) =>
                                                                                idxType2 ===
                                                                                idxType
                                                                                  ? {
                                                                                      ...type2,
                                                                                      productToAddManufacturer:
                                                                                        e
                                                                                          .target
                                                                                          .value,
                                                                                    }
                                                                                  : type2
                                                                            ),
                                                                        }
                                                                      : subCategory2
                                                                ),
                                                            }
                                                          : category
                                                    )
                                                  );
                                                  console.log(type);
                                                }}
                                              ></TextField>
                                            </Box>
                                            <Button
                                              type="button"
                                              variant="contained"
                                              sx={{ marginTop: "10px" }}
                                              disabled={
                                                !type.productToAddImages ||
                                                (type.productToAddImages &&
                                                  type.productToAddImages
                                                    .length === 0) ||
                                                !type.productToAddCode ||
                                                !type.productToAddName ||
                                                !type.productToAddPrice ||
                                                !type.productToAddInStock ||
                                                !type.productToAddManufacturer
                                              }
                                              onClick={() => {
                                                dispatch(
                                                  addProduct({
                                                    images:
                                                      type.productToAddImages,
                                                    code: type.productToAddCode,
                                                    name: type.productToAddName,
                                                    price:
                                                      type.productToAddPrice,
                                                    inStock:
                                                      type.productToAddInStock,
                                                    manufacturer:
                                                      type.productToAddManufacturer,
                                                    categoryId: category._id,
                                                    subCategoryId:
                                                      subCategory._id,
                                                    typeId: type._id,
                                                  })
                                                );
                                              }}
                                            >
                                              ΠΡΟΣΘΗΚΗ
                                            </Button>
                                          </Box>
                                        </Box>
                                      </Collapse>
                                    </Box>
                                  </Box>
                                  <Box
                                    sx={{
                                      padding: "0 15px",
                                      paddingBottom: "10px",
                                      display: "flex",
                                      flexWrap: "wrap",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    {products?.map(
                                      (product, idxProduct) =>
                                        product.typeId === type._id && (
                                          <AdminProduct
                                            key={idxProduct}
                                            product={product}
                                          />
                                        )
                                    )}
                                  </Box>
                                </Collapse>
                              </Box>
                            ))}
                            {subCategory?.subs &&
                              subCategory.subs.map((sub, idxSub2) => (
                                <Box key={idxSub2}>
                                  <Box
                                    sx={{
                                      borderTop:
                                        idxSub2 !== 0
                                          ? "1px solid rgba(0, 0, 0, 0.2)"
                                          : "none",
                                      cursor: "pointer",
                                      backgroundColor: "rgb(210, 210, 210)",
                                    }}
                                  >
                                    <div
                                      style={{
                                        padding: "10px 30px",
                                        height: "100%",
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                      }}
                                      onClick={() => {
                                        setCategoriesCopy(
                                          categoriesCopy.map(
                                            (category, index) =>
                                              index === idx
                                                ? {
                                                    ...category,
                                                    subCategories:
                                                      category.subCategories.map(
                                                        (sub, indexSub) =>
                                                          indexSub === idxSub
                                                            ? {
                                                                ...sub,
                                                                subs: sub.subs.map(
                                                                  (
                                                                    sub2,
                                                                    indexSub2
                                                                  ) =>
                                                                    indexSub2 ===
                                                                    idxSub2
                                                                      ? {
                                                                          ...sub2,
                                                                          expanded:
                                                                            !sub2.expanded,
                                                                        }
                                                                      : sub2
                                                                ),
                                                              }
                                                            : sub
                                                      ),
                                                  }
                                                : category
                                          )
                                        );
                                        console.log(sub);
                                      }}
                                    >
                                      {sub.name}
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <button
                                          type="button"
                                          style={{
                                            backgroundColor: "red",
                                            border: "none",
                                            color: "white",
                                            borderRadius: "50%",
                                            aspectRatio: 1,
                                          }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpen({
                                              id: sub._id,
                                              categoryId: category._id,
                                              subCategoryId: subCategory._id,
                                              name: sub.name,
                                              type: "sub",
                                            });
                                          }}
                                        >
                                          <Delete />
                                        </button>
                                        <IconButton>
                                          <ExpandMore />
                                        </IconButton>
                                      </div>
                                    </div>
                                  </Box>
                                  <Collapse
                                    in={
                                      categoriesCopy[idx]?.subCategories[idxSub]
                                        ?.subs[idxSub2]?.expanded
                                    }
                                    // timeout="auto"
                                    unmountOnExit
                                  >
                                    <Box
                                      sx={{
                                        width: "100%",
                                        padding: "20px",
                                      }}
                                    >
                                      <Box sx={{ boxShadow: 5 }}>
                                        <div
                                          style={{
                                            padding: "10px",
                                            // borderRadius: "10px",
                                            // boxShadow: 5,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            backgroundColor: "#C8D3D6",
                                            zIndex: 100,
                                            cursor: "pointer",
                                          }}
                                          onClick={() => {
                                            setCategoriesCopy(
                                              categoriesCopy.map(
                                                (category, index) =>
                                                  index === idx
                                                    ? {
                                                        ...category,
                                                        subCategories:
                                                          category.subCategories.map(
                                                            (
                                                              subCategory2,
                                                              indexSubCategory2
                                                            ) =>
                                                              indexSubCategory2 ===
                                                              idxSub
                                                                ? {
                                                                    ...subCategory2,
                                                                    subs: subCategory2.subs.map(
                                                                      (
                                                                        sub2,
                                                                        idxSub3
                                                                      ) =>
                                                                        idxSub2 ===
                                                                        idxSub3
                                                                          ? {
                                                                              ...sub2,
                                                                              expandedAddType:
                                                                                !sub2.expandedAddType,
                                                                            }
                                                                          : sub2
                                                                    ),
                                                                  }
                                                                : subCategory2
                                                          ),
                                                      }
                                                    : category
                                              )
                                            );
                                            console.log(sub);
                                          }}
                                        >
                                          <Typography>
                                            Προσθήκη στην υποκατηγορία{" "}
                                            {`"${sub.name}"`}
                                          </Typography>
                                          <IconButton>
                                            <ExpandMore />
                                          </IconButton>
                                        </div>
                                        <Collapse
                                          in={sub?.expandedAddType}
                                          unmountOnExit
                                          sx={{
                                            padding: "10px",
                                            // borderRadius: "10px",
                                            // boxShadow: 5,
                                            backgroundColor: "#C8D3D6",
                                          }}
                                        >
                                          <hr
                                            style={{
                                              opacity: 0.2,
                                              marginInline: "auto",
                                              marginTop: "0",
                                            }}
                                          ></hr>
                                          <Box
                                            sx={{
                                              display: {
                                                xs: "block",
                                                sm: "flex",
                                              },
                                              alignItems: "center",
                                              justifyContent: "space-between",
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: {
                                                  xs: "block",
                                                  sm: "flex",
                                                },
                                                alignItems: "center",
                                                marginBottom: {
                                                  xs: "10px",
                                                  sm: "0",
                                                },
                                              }}
                                            >
                                              <Typography
                                                sx={{ marginRight: "20px" }}
                                              >
                                                Όνομα τύπου
                                              </Typography>
                                              <TextField
                                                size="small"
                                                sx={{
                                                  backgroundColor: "white",
                                                  borderRadius: "4px",
                                                }}
                                                onChange={(e) => {
                                                  setCategoriesCopy(
                                                    categoriesCopy.map(
                                                      (category, index) =>
                                                        index === idx
                                                          ? {
                                                              ...category,
                                                              subCategories:
                                                                category.subCategories.map(
                                                                  (
                                                                    subCategory2,
                                                                    indexSubCategory2
                                                                  ) =>
                                                                    indexSubCategory2 ===
                                                                    idxSub
                                                                      ? {
                                                                          ...subCategory2,
                                                                          subs: subCategory2.subs.map(
                                                                            (
                                                                              sub2,
                                                                              idxSub3
                                                                            ) =>
                                                                              idxSub2 ===
                                                                              idxSub3
                                                                                ? {
                                                                                    ...sub2,
                                                                                    typeNameToAdd:
                                                                                      e
                                                                                        .target
                                                                                        .value,
                                                                                  }
                                                                                : sub2
                                                                          ),
                                                                        }
                                                                      : subCategory2
                                                                ),
                                                            }
                                                          : category
                                                    )
                                                  );
                                                  console.log(sub);
                                                }}
                                              ></TextField>
                                            </Box>
                                            <Button
                                              disabled={!sub.typeNameToAdd}
                                              variant="contained"
                                              onClick={() => {
                                                console.log(
                                                  subCategory.subNameToAdd
                                                );
                                                dispatch(
                                                  addSubCategory(
                                                    {
                                                      categoryId: category._id,
                                                      subCategoryId:
                                                        subCategory._id,
                                                      subId: sub._id,
                                                      name: sub.typeNameToAdd,
                                                      type: "innerType",
                                                    },
                                                    categoriesCopy,
                                                    setCategoriesCopy
                                                  )
                                                );
                                              }}
                                            >
                                              ΠΡΟΣΘΗΚΗ
                                            </Button>
                                          </Box>
                                        </Collapse>
                                      </Box>
                                    </Box>
                                    {sub?.types?.map(
                                      (typeInner, idxTypeInner) => (
                                        <Box key={idxTypeInner}>
                                          <Box
                                            sx={{
                                              borderTop:
                                                idxTypeInner !== 0
                                                  ? "1px solid rgba(0, 0, 0, 0.2)"
                                                  : "none",
                                              cursor: "pointer",
                                              backgroundColor:
                                                "rgb(190, 190, 190)",
                                            }}
                                          >
                                            <div
                                              style={{
                                                padding: "10px 30px",
                                                height: "100%",
                                                width: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                              }}
                                              onClick={() => {
                                                if (
                                                  !typeInner.firstTimeExpanded
                                                ) {
                                                  dispatch(
                                                    fetchProducts({
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
                                                    })
                                                  );
                                                }
                                                setCategoriesCopy(
                                                  categoriesCopy.map(
                                                    (category, index) =>
                                                      index === idx
                                                        ? {
                                                            ...category,
                                                            subCategories:
                                                              category.subCategories.map(
                                                                (
                                                                  subCategory2,
                                                                  indexSubCategory2
                                                                ) =>
                                                                  indexSubCategory2 ===
                                                                  idxSub
                                                                    ? {
                                                                        ...subCategory2,
                                                                        subs: subCategory2.subs.map(
                                                                          (
                                                                            sub2,
                                                                            idxSub3
                                                                          ) =>
                                                                            idxSub2 ===
                                                                            idxSub3
                                                                              ? {
                                                                                  ...sub2,
                                                                                  types:
                                                                                    sub2.types.map(
                                                                                      (
                                                                                        innerType2,
                                                                                        idxInnerType2
                                                                                      ) =>
                                                                                        idxInnerType2 ===
                                                                                        idxTypeInner
                                                                                          ? {
                                                                                              ...innerType2,
                                                                                              expanded:
                                                                                                !innerType2.expanded,
                                                                                              firstTimeExpanded: true,
                                                                                            }
                                                                                          : innerType2
                                                                                    ),
                                                                                }
                                                                              : sub2
                                                                        ),
                                                                      }
                                                                    : subCategory2
                                                              ),
                                                          }
                                                        : category
                                                  )
                                                );
                                              }}
                                            >
                                              {typeInner.name}
                                              <div
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                }}
                                              >
                                                <button
                                                  type="button"
                                                  style={{
                                                    backgroundColor: "red",
                                                    border: "none",
                                                    color: "white",
                                                    borderRadius: "50%",
                                                    aspectRatio: 1,
                                                  }}
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpen({
                                                      id: typeInner._id,
                                                      categoryId: category._id,
                                                      subCategoryId:
                                                        subCategory._id,
                                                      subId: sub._id,
                                                      name: typeInner.name,
                                                      type: "innerType",
                                                    });
                                                  }}
                                                >
                                                  <Delete />
                                                </button>
                                                <IconButton>
                                                  <ExpandMore />
                                                </IconButton>
                                              </div>
                                            </div>
                                          </Box>
                                          <Collapse
                                            in={typeInner.expanded}
                                            unmountOnExit
                                            sx={{
                                              backgroundColor:
                                                "rgb(160, 160, 160)",
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                width: "100%",
                                                padding: "20px",
                                              }}
                                            >
                                              <Box sx={{ boxShadow: 5 }}>
                                                <div
                                                  style={{
                                                    padding: "10px",
                                                    // borderRadius: "10px",
                                                    // boxShadow: 5,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                      "space-between",
                                                    backgroundColor: "#C8D3D6",
                                                    zIndex: 100,
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() => {
                                                    setCategoriesCopy(
                                                      categoriesCopy.map(
                                                        (category, index) =>
                                                          index === idx
                                                            ? {
                                                                ...category,
                                                                subCategories:
                                                                  category.subCategories.map(
                                                                    (
                                                                      subCategory2,
                                                                      indexSubCategory2
                                                                    ) =>
                                                                      indexSubCategory2 ===
                                                                      idxSub
                                                                        ? {
                                                                            ...subCategory2,
                                                                            subs: subCategory2.subs.map(
                                                                              (
                                                                                sub2,
                                                                                idxSub3
                                                                              ) =>
                                                                                idxSub2 ===
                                                                                idxSub3
                                                                                  ? {
                                                                                      ...sub2,
                                                                                      types:
                                                                                        sub2.types.map(
                                                                                          (
                                                                                            innerType2,
                                                                                            idxInnerType2
                                                                                          ) =>
                                                                                            idxInnerType2 ===
                                                                                            idxTypeInner
                                                                                              ? {
                                                                                                  ...innerType2,
                                                                                                  expandedAddProduct:
                                                                                                    !innerType2.expandedAddProduct,
                                                                                                }
                                                                                              : innerType2
                                                                                        ),
                                                                                    }
                                                                                  : sub2
                                                                            ),
                                                                          }
                                                                        : subCategory2
                                                                  ),
                                                              }
                                                            : category
                                                      )
                                                    );
                                                  }}
                                                >
                                                  <Typography>
                                                    Προσθήκη προϊόντος στον τύπο{" "}
                                                    {`"${typeInner.name}"`}
                                                  </Typography>
                                                  <IconButton>
                                                    <ExpandMore />
                                                  </IconButton>
                                                </div>
                                                <Collapse
                                                  in={
                                                    typeInner?.expandedAddProduct
                                                  }
                                                  unmountOnExit
                                                  sx={{
                                                    padding: "10px",
                                                    // borderRadius: "10px",
                                                    // boxShadow: 5,
                                                    backgroundColor: "#C8D3D6",
                                                  }}
                                                >
                                                  <hr
                                                    style={{
                                                      opacity: 0.2,
                                                      marginInline: "auto",
                                                      marginTop: "0",
                                                    }}
                                                  ></hr>
                                                  <Box
                                                    sx={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      justifyContent:
                                                        "flex-start",
                                                    }}
                                                  >
                                                    <Box
                                                      sx={{
                                                        // backgroundColor: "red",
                                                        width: "fit-content",
                                                      }}
                                                    >
                                                      <Box
                                                        sx={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          justifyContent:
                                                            "space-between",
                                                          width: "100%",
                                                          marginBottom: "10px",
                                                          // backgroundColor: "red",
                                                          // minWidth: "50%",
                                                        }}
                                                      >
                                                        <Typography
                                                          sx={{
                                                            marginRight: "20px",
                                                          }}
                                                        >
                                                          Εικόνες
                                                        </Typography>
                                                        <Box
                                                          sx={{
                                                            maxWidth: "234px",
                                                          }}
                                                        >
                                                          <FileBase
                                                            multiple={false}
                                                            onDone={(data) => {
                                                              console.log(data);
                                                              if (
                                                                data.type.substring(
                                                                  0,
                                                                  data.type.indexOf(
                                                                    "/"
                                                                  )
                                                                ) !== "image"
                                                              ) {
                                                                console.log(
                                                                  "INVALID"
                                                                );
                                                                return;
                                                              }
                                                              setCategoriesCopy(
                                                                categoriesCopy.map(
                                                                  (
                                                                    category,
                                                                    index
                                                                  ) =>
                                                                    index ===
                                                                    idx
                                                                      ? {
                                                                          ...category,
                                                                          subCategories:
                                                                            category.subCategories.map(
                                                                              (
                                                                                subCategory2,
                                                                                indexSubCategory2
                                                                              ) =>
                                                                                indexSubCategory2 ===
                                                                                idxSub
                                                                                  ? {
                                                                                      ...subCategory2,
                                                                                      subs: subCategory2.subs.map(
                                                                                        (
                                                                                          sub2,
                                                                                          idxSub3
                                                                                        ) =>
                                                                                          idxSub2 ===
                                                                                          idxSub3
                                                                                            ? {
                                                                                                ...sub2,
                                                                                                types:
                                                                                                  sub2.types.map(
                                                                                                    (
                                                                                                      innerType2,
                                                                                                      idxInnerType2
                                                                                                    ) =>
                                                                                                      idxInnerType2 ===
                                                                                                      idxTypeInner
                                                                                                        ? {
                                                                                                            ...innerType2,
                                                                                                            productToAddImages:
                                                                                                              !innerType2.productToAddImages
                                                                                                                ? [
                                                                                                                    {
                                                                                                                      name: data.name,
                                                                                                                      data: data.base64,
                                                                                                                    },
                                                                                                                  ]
                                                                                                                : [
                                                                                                                    ...innerType2.productToAddImages,
                                                                                                                    {
                                                                                                                      name: data.name,
                                                                                                                      data: data.base64,
                                                                                                                    },
                                                                                                                  ],
                                                                                                          }
                                                                                                        : innerType2
                                                                                                  ),
                                                                                              }
                                                                                            : sub2
                                                                                      ),
                                                                                    }
                                                                                  : subCategory2
                                                                            ),
                                                                        }
                                                                      : category
                                                                )
                                                              );
                                                            }}
                                                          />
                                                          {typeInner?.productToAddImages?.map(
                                                            (
                                                              image,
                                                              idxImage
                                                            ) => (
                                                              <Box
                                                                key={idxImage}
                                                                sx={{
                                                                  display:
                                                                    "flex",
                                                                  alignItems:
                                                                    "center",
                                                                  marginTop:
                                                                    "5px",
                                                                }}
                                                              >
                                                                <Typography>
                                                                  {image.name}
                                                                </Typography>
                                                                <button
                                                                  style={{
                                                                    backgroundColor:
                                                                      "red",
                                                                    borderRadius:
                                                                      "50%",
                                                                    border:
                                                                      "none",
                                                                    color:
                                                                      "white",
                                                                    aspectRatio: 1,
                                                                    height:
                                                                      "1.5rem",
                                                                    display:
                                                                      "flex",
                                                                    alignItems:
                                                                      "center",
                                                                    justifyContent:
                                                                      "center",
                                                                    marginLeft:
                                                                      "10px",
                                                                  }}
                                                                  onClick={() => {
                                                                    setCategoriesCopy(
                                                                      categoriesCopy.map(
                                                                        (
                                                                          category,
                                                                          index
                                                                        ) =>
                                                                          index ===
                                                                          idx
                                                                            ? {
                                                                                ...category,
                                                                                subCategories:
                                                                                  category.subCategories.map(
                                                                                    (
                                                                                      subCategory2,
                                                                                      indexSubCategory2
                                                                                    ) =>
                                                                                      indexSubCategory2 ===
                                                                                      idxSub
                                                                                        ? {
                                                                                            ...subCategory2,
                                                                                            subs: subCategory2.subs.map(
                                                                                              (
                                                                                                sub2,
                                                                                                idxSub3
                                                                                              ) =>
                                                                                                idxSub2 ===
                                                                                                idxSub3
                                                                                                  ? {
                                                                                                      ...sub2,
                                                                                                      types:
                                                                                                        sub2.types.map(
                                                                                                          (
                                                                                                            innerType2,
                                                                                                            idxInnerType2
                                                                                                          ) =>
                                                                                                            idxInnerType2 ===
                                                                                                            idxTypeInner
                                                                                                              ? {
                                                                                                                  ...innerType2,
                                                                                                                  productToAddImages:
                                                                                                                    innerType2.productToAddImages.filter(
                                                                                                                      (
                                                                                                                        image2,
                                                                                                                        idxImage2
                                                                                                                      ) =>
                                                                                                                        idxImage !==
                                                                                                                        idxImage2
                                                                                                                    ),
                                                                                                                }
                                                                                                              : innerType2
                                                                                                        ),
                                                                                                    }
                                                                                                  : sub2
                                                                                            ),
                                                                                          }
                                                                                        : subCategory2
                                                                                  ),
                                                                              }
                                                                            : category
                                                                      )
                                                                    );
                                                                  }}
                                                                >
                                                                  <Delete
                                                                    sx={{
                                                                      height:
                                                                        "20px",
                                                                    }}
                                                                  />
                                                                </button>
                                                              </Box>
                                                            )
                                                          )}
                                                        </Box>
                                                      </Box>
                                                      <Box
                                                        sx={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          justifyContent:
                                                            "space-between",
                                                          width: "100%",
                                                          marginBottom: "10px",
                                                          // backgroundColor: "red",
                                                          // minWidth: "50%",
                                                        }}
                                                      >
                                                        <Typography
                                                          sx={{
                                                            marginRight: "20px",
                                                          }}
                                                        >
                                                          Κωδικός
                                                        </Typography>
                                                        <TextField
                                                          size="small"
                                                          sx={{
                                                            backgroundColor:
                                                              "white",
                                                            borderRadius: "4px",
                                                          }}
                                                          onChange={(e) => {
                                                            setCategoriesCopy(
                                                              categoriesCopy.map(
                                                                (
                                                                  category,
                                                                  index
                                                                ) =>
                                                                  index === idx
                                                                    ? {
                                                                        ...category,
                                                                        subCategories:
                                                                          category.subCategories.map(
                                                                            (
                                                                              subCategory2,
                                                                              indexSubCategory2
                                                                            ) =>
                                                                              indexSubCategory2 ===
                                                                              idxSub
                                                                                ? {
                                                                                    ...subCategory2,
                                                                                    subs: subCategory2.subs.map(
                                                                                      (
                                                                                        sub2,
                                                                                        idxSub3
                                                                                      ) =>
                                                                                        idxSub2 ===
                                                                                        idxSub3
                                                                                          ? {
                                                                                              ...sub2,
                                                                                              types:
                                                                                                sub2.types.map(
                                                                                                  (
                                                                                                    innerType2,
                                                                                                    idxInnerType2
                                                                                                  ) =>
                                                                                                    idxInnerType2 ===
                                                                                                    idxTypeInner
                                                                                                      ? {
                                                                                                          ...innerType2,
                                                                                                          productToAddCode:
                                                                                                            e
                                                                                                              .target
                                                                                                              .value,
                                                                                                        }
                                                                                                      : innerType2
                                                                                                ),
                                                                                            }
                                                                                          : sub2
                                                                                    ),
                                                                                  }
                                                                                : subCategory2
                                                                          ),
                                                                      }
                                                                    : category
                                                              )
                                                            );
                                                            console.log(
                                                              typeInner
                                                            );
                                                          }}
                                                        ></TextField>
                                                      </Box>
                                                      <Box
                                                        sx={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          justifyContent:
                                                            "space-between",
                                                          width: "100%",
                                                          marginBottom: "10px",
                                                          // backgroundColor: "red",
                                                          // minWidth: "50%",
                                                        }}
                                                      >
                                                        <Typography
                                                          sx={{
                                                            marginRight: "20px",
                                                          }}
                                                        >
                                                          Όνομα
                                                        </Typography>
                                                        <TextField
                                                          size="small"
                                                          sx={{
                                                            backgroundColor:
                                                              "white",
                                                            borderRadius: "4px",
                                                          }}
                                                          onChange={(e) => {
                                                            setCategoriesCopy(
                                                              categoriesCopy.map(
                                                                (
                                                                  category,
                                                                  index
                                                                ) =>
                                                                  index === idx
                                                                    ? {
                                                                        ...category,
                                                                        subCategories:
                                                                          category.subCategories.map(
                                                                            (
                                                                              subCategory2,
                                                                              indexSubCategory2
                                                                            ) =>
                                                                              indexSubCategory2 ===
                                                                              idxSub
                                                                                ? {
                                                                                    ...subCategory2,
                                                                                    subs: subCategory2.subs.map(
                                                                                      (
                                                                                        sub2,
                                                                                        idxSub3
                                                                                      ) =>
                                                                                        idxSub2 ===
                                                                                        idxSub3
                                                                                          ? {
                                                                                              ...sub2,
                                                                                              types:
                                                                                                sub2.types.map(
                                                                                                  (
                                                                                                    innerType2,
                                                                                                    idxInnerType2
                                                                                                  ) =>
                                                                                                    idxInnerType2 ===
                                                                                                    idxTypeInner
                                                                                                      ? {
                                                                                                          ...innerType2,
                                                                                                          productToAddName:
                                                                                                            e
                                                                                                              .target
                                                                                                              .value,
                                                                                                        }
                                                                                                      : innerType2
                                                                                                ),
                                                                                            }
                                                                                          : sub2
                                                                                    ),
                                                                                  }
                                                                                : subCategory2
                                                                          ),
                                                                      }
                                                                    : category
                                                              )
                                                            );
                                                            console.log(
                                                              typeInner
                                                            );
                                                          }}
                                                        ></TextField>
                                                      </Box>
                                                      <Box
                                                        sx={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          justifyContent:
                                                            "space-between",
                                                          width: "100%",
                                                          marginBottom: "10px",
                                                          // backgroundColor: "red",
                                                          // minWidth: "50%",
                                                        }}
                                                      >
                                                        <Typography
                                                          sx={{
                                                            marginRight: "20px",
                                                          }}
                                                        >
                                                          Τιμή
                                                        </Typography>
                                                        <TextField
                                                          size="small"
                                                          sx={{
                                                            backgroundColor:
                                                              "white",
                                                            borderRadius: "4px",
                                                            // border: ,
                                                          }}
                                                          type="number"
                                                          onChange={(e) => {
                                                            setCategoriesCopy(
                                                              categoriesCopy.map(
                                                                (
                                                                  category,
                                                                  index
                                                                ) =>
                                                                  index === idx
                                                                    ? {
                                                                        ...category,
                                                                        subCategories:
                                                                          category.subCategories.map(
                                                                            (
                                                                              subCategory2,
                                                                              indexSubCategory2
                                                                            ) =>
                                                                              indexSubCategory2 ===
                                                                              idxSub
                                                                                ? {
                                                                                    ...subCategory2,
                                                                                    subs: subCategory2.subs.map(
                                                                                      (
                                                                                        sub2,
                                                                                        idxSub3
                                                                                      ) =>
                                                                                        idxSub2 ===
                                                                                        idxSub3
                                                                                          ? {
                                                                                              ...sub2,
                                                                                              types:
                                                                                                sub2.types.map(
                                                                                                  (
                                                                                                    innerType2,
                                                                                                    idxInnerType2
                                                                                                  ) =>
                                                                                                    idxInnerType2 ===
                                                                                                    idxTypeInner
                                                                                                      ? {
                                                                                                          ...innerType2,
                                                                                                          productToAddPrice:
                                                                                                            e
                                                                                                              .target
                                                                                                              .value,
                                                                                                        }
                                                                                                      : innerType2
                                                                                                ),
                                                                                            }
                                                                                          : sub2
                                                                                    ),
                                                                                  }
                                                                                : subCategory2
                                                                          ),
                                                                      }
                                                                    : category
                                                              )
                                                            );
                                                            console.log(
                                                              typeInner
                                                            );
                                                          }}
                                                        ></TextField>
                                                      </Box>
                                                      <Box
                                                        sx={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          justifyContent:
                                                            "space-between",
                                                          width: "100%",
                                                          marginBottom: "10px",
                                                          // backgroundColor: "red",
                                                          // minWidth: "50%",
                                                        }}
                                                      >
                                                        <Typography
                                                          sx={{
                                                            marginRight: "20px",
                                                          }}
                                                        >
                                                          Τεμάχια
                                                        </Typography>
                                                        <TextField
                                                          size="small"
                                                          sx={{
                                                            backgroundColor:
                                                              "white",
                                                            borderRadius: "4px",
                                                          }}
                                                          type="number"
                                                          onChange={(e) => {
                                                            setCategoriesCopy(
                                                              categoriesCopy.map(
                                                                (
                                                                  category,
                                                                  index
                                                                ) =>
                                                                  index === idx
                                                                    ? {
                                                                        ...category,
                                                                        subCategories:
                                                                          category.subCategories.map(
                                                                            (
                                                                              subCategory2,
                                                                              indexSubCategory2
                                                                            ) =>
                                                                              indexSubCategory2 ===
                                                                              idxSub
                                                                                ? {
                                                                                    ...subCategory2,
                                                                                    subs: subCategory2.subs.map(
                                                                                      (
                                                                                        sub2,
                                                                                        idxSub3
                                                                                      ) =>
                                                                                        idxSub2 ===
                                                                                        idxSub3
                                                                                          ? {
                                                                                              ...sub2,
                                                                                              types:
                                                                                                sub2.types.map(
                                                                                                  (
                                                                                                    innerType2,
                                                                                                    idxInnerType2
                                                                                                  ) =>
                                                                                                    idxInnerType2 ===
                                                                                                    idxTypeInner
                                                                                                      ? {
                                                                                                          ...innerType2,
                                                                                                          productToAddInStock:
                                                                                                            e
                                                                                                              .target
                                                                                                              .value,
                                                                                                        }
                                                                                                      : innerType2
                                                                                                ),
                                                                                            }
                                                                                          : sub2
                                                                                    ),
                                                                                  }
                                                                                : subCategory2
                                                                          ),
                                                                      }
                                                                    : category
                                                              )
                                                            );
                                                            console.log(
                                                              typeInner
                                                            );
                                                          }}
                                                        ></TextField>
                                                      </Box>
                                                      <Box
                                                        sx={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          justifyContent:
                                                            "space-between",
                                                          width: "100%",
                                                          marginBottom: "10px",
                                                          // backgroundColor: "red",
                                                          // minWidth: "50%",
                                                        }}
                                                      >
                                                        <Typography
                                                          sx={{
                                                            marginRight: "20px",
                                                          }}
                                                        >
                                                          Κατασκευαστής
                                                        </Typography>
                                                        <TextField
                                                          size="small"
                                                          sx={{
                                                            backgroundColor:
                                                              "white",
                                                            borderRadius: "4px",
                                                          }}
                                                          onChange={(e) => {
                                                            setCategoriesCopy(
                                                              categoriesCopy.map(
                                                                (
                                                                  category,
                                                                  index
                                                                ) =>
                                                                  index === idx
                                                                    ? {
                                                                        ...category,
                                                                        subCategories:
                                                                          category.subCategories.map(
                                                                            (
                                                                              subCategory2,
                                                                              indexSubCategory2
                                                                            ) =>
                                                                              indexSubCategory2 ===
                                                                              idxSub
                                                                                ? {
                                                                                    ...subCategory2,
                                                                                    subs: subCategory2.subs.map(
                                                                                      (
                                                                                        sub2,
                                                                                        idxSub3
                                                                                      ) =>
                                                                                        idxSub2 ===
                                                                                        idxSub3
                                                                                          ? {
                                                                                              ...sub2,
                                                                                              types:
                                                                                                sub2.types.map(
                                                                                                  (
                                                                                                    innerType2,
                                                                                                    idxInnerType2
                                                                                                  ) =>
                                                                                                    idxInnerType2 ===
                                                                                                    idxTypeInner
                                                                                                      ? {
                                                                                                          ...innerType2,
                                                                                                          productToAddManufacturer:
                                                                                                            e
                                                                                                              .target
                                                                                                              .value,
                                                                                                        }
                                                                                                      : innerType2
                                                                                                ),
                                                                                            }
                                                                                          : sub2
                                                                                    ),
                                                                                  }
                                                                                : subCategory2
                                                                          ),
                                                                      }
                                                                    : category
                                                              )
                                                            );
                                                            console.log(
                                                              typeInner
                                                            );
                                                          }}
                                                        ></TextField>
                                                      </Box>
                                                      <Button
                                                        type="button"
                                                        variant="contained"
                                                        sx={{
                                                          marginTop: "10px",
                                                        }}
                                                        disabled={
                                                          !typeInner.productToAddImages ||
                                                          (typeInner.productToAddImages &&
                                                            typeInner
                                                              .productToAddImages
                                                              .length === 0) ||
                                                          !typeInner.productToAddCode ||
                                                          !typeInner.productToAddName ||
                                                          !typeInner.productToAddPrice ||
                                                          !typeInner.productToAddInStock ||
                                                          !typeInner.productToAddManufacturer
                                                        }
                                                        onClick={() => {
                                                          dispatch(
                                                            addProduct({
                                                              images:
                                                                typeInner.productToAddImages,
                                                              code: typeInner.productToAddCode,
                                                              name: typeInner.productToAddName,
                                                              price:
                                                                typeInner.productToAddPrice,
                                                              inStock:
                                                                typeInner.productToAddInStock,
                                                              manufacturer:
                                                                typeInner.productToAddManufacturer,
                                                              categoryId:
                                                                category._id,
                                                              subCategoryId:
                                                                subCategory._id,
                                                              subId: sub._id,
                                                              innerTypeId:
                                                                typeInner._id,
                                                            })
                                                          );
                                                        }}
                                                      >
                                                        ΠΡΟΣΘΗΚΗ
                                                      </Button>
                                                    </Box>
                                                  </Box>
                                                </Collapse>
                                              </Box>
                                            </Box>
                                            <Box
                                              sx={{
                                                padding: "0 15px",
                                                paddingBottom: "10px",
                                                display: "flex",
                                                flexWrap: "wrap",
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              {products?.map(
                                                (product, idxProduct) =>
                                                  product.innerTypeId ===
                                                    typeInner._id && (
                                                    <AdminProduct
                                                      key={idxProduct}
                                                      product={product}
                                                    />
                                                  )
                                              )}
                                            </Box>
                                          </Collapse>
                                        </Box>
                                      )
                                    )}
                                  </Collapse>
                                </Box>
                              ))}
                          </Collapse>
                        </Box>
                      ))}
                    </Collapse>
                  </Box>
                ))}
              </Card>
            </>
          )}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Επιβεβαίωση
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {`Πρόκειται να διαγραφεί ${
                    toDelete?.type === "subCategory" || toDelete?.type === "sub"
                      ? "η υποκατηγορία"
                      : toDelete?.type === "type" ||
                        toDelete?.type === "innerType"
                      ? " ο τύπος"
                      : "--"
                  } "${toDelete?.name}" και όλα ${
                    toDelete?.type === "subCategory" || toDelete?.type === "sub"
                      ? "της"
                      : "του"
                  } τα περιεχόμενα.`}
                </Typography>
                <Box
                  sx={{
                    marginTop: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    color="error"
                    sx={{ marginRight: "10px" }}
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    ΑΚΥΡΩΣΗ
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClose();
                      dispatch(
                        deleteById(
                          {
                            id: toDelete.id,
                            categoryId: toDelete.categoryId,
                            subCategoryId: toDelete.subCategoryId,
                            subId: toDelete.subId,
                            type: toDelete.type,
                          },
                          categoriesCopy,
                          setCategoriesCopy
                        )
                      );
                    }}
                  >
                    ΔΙΑΓΡΑΦΗ
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Modal>
          {(isLoadingDelete || isLoadingProducts) && (
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
          )}
        </Box>
      )}
    </Container>
  );
};

export default Admin;
