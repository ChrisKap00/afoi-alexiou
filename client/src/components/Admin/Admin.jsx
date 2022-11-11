import {
  Backdrop,
  Box,
  Button,
  Card,
  Collapse,
  Container,
  Fade,
  IconButton,
  Modal,
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
import { sendCategories } from "../../api";
import { deleteById } from "../../store/actions/products";

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

const Admin = () => {
  const initialState = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [categoriesCopy, setCategoriesCopy] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toDelete, setToDelete] = useState({ id: "", name: "", type: "" });

  const [open, setOpen] = React.useState(false);
  const handleOpen = (toDeleteObj) => {
    setToDelete(toDeleteObj);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setToDelete({ id: "", categoryId: "", name: "", type: "" });
  };

  const { isLoading, admin } = useSelector((state) => state.admin);
  const { isLoadingCategories, categories } = useSelector(
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
    let categoriesCopyTemp = [];

    categoriesCopyTemp = [...categories];
    for (let i in categoriesCopyTemp) {
      // categoriesCopyTemp[i].expanded = false;
      // categoriesCopyTemp[i] = { ...categories[i], expanded: false };
      for (let j in categories[i].subCategories) {
        // categoriesCopyTemp[i].subCategories[j].expanded = false;
        // categoriesCopyTemp[i].subCategories[j] = {
        //   ...categories[i].subCategories[j],
        //   expanded: false,
        // };
        for (let k in categories[i].subCategories[j]?.subs) {
          // categoriesCopyTemp[i].subCategories[j].subs[k].expanded = false;
          // categoriesCopyTemp[i].subCategories[j].subs[k] = {
          //   ...categories[i].subCategories[j].subs[k],
          //   expanded: false,
          // };
          for (let l in categories[i].subCategories[j].subs[k].types) {
            // categoriesCopyTemp[i].subCategories[j].subs[k].types[
            //   l
            // ].expanded = false;
            // categoriesCopyTemp[i].subCategories[j].subs[k].types[l] = {
            //   ...categories[i].subCategories[j].subs[k].types[l],
            //   expanded: false,
            // };
          }
        }
        for (let k in categories[i].subCategories[j].types) {
          // categoriesCopyTemp[i].subCategories[j].types[k].expanded = false;
          // categoriesCopyTemp[i].subCategories[j].types[k] = {
          //   ...categories[i].subCategories[j].types[k],
          //   expanded: false,
          // };
        }
      }
    }
    console.log(categoriesCopyTemp);
    // console.log(!undefined);
    setCategoriesCopy(categoriesCopyTemp);
  }, [categories]);

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
                {categories &&
                  categories.map((category, idx) => (
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
                            setCategoriesCopy(
                              categoriesCopy.map((category, index) =>
                                index === idx
                                  ? {
                                      ...category,
                                      expanded: !category.expanded,
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
                        <Box>hello</Box>
                        {category?.subCategories.map((subCategory, idxSub) => (
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
                              in={
                                categoriesCopy[idx]?.subCategories[idxSub]
                                  ?.expanded
                              }
                              // timeout="auto"
                              unmountOnExit
                            >
                              {subCategory?.types &&
                                subCategory?.types.map((type, idxType) => (
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
                                        onClick={() => {}}
                                      >
                                        {type.name}
                                      </div>
                                    </Box>
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
                                        }}
                                      >
                                        {sub.name}
                                        <IconButton>
                                          <ExpandMore />
                                        </IconButton>
                                      </div>
                                    </Box>
                                    <Collapse
                                      in={
                                        categoriesCopy[idx]?.subCategories[
                                          idxSub
                                        ]?.subs[idxSub2]?.expanded
                                      }
                                      // timeout="auto"
                                      unmountOnExit
                                    >
                                      {sub?.types?.map((type2, idxType2) => (
                                        <Box key={idxType2}>
                                          <Box
                                            sx={{
                                              borderTop:
                                                idxType2 !== 0
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
                                              onClick={() => {}}
                                            >
                                              {type2.name}
                                            </div>
                                          </Box>
                                        </Box>
                                      ))}
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
                    toDelete?.type === "subCategory" ? "η υποκατηγορία" : "--"
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
                      dispatch(
                        deleteById({
                          id: toDelete.id,
                          categoryId: toDelete.categoryId,
                          type: toDelete.type,
                        })
                      );
                    }}
                  >
                    ΔΙΑΓΡΑΦΗ
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </Box>
      )}
    </Container>
  );
};

export default Admin;
