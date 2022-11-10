import {
  Box,
  Button,
  Card,
  Collapse,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../store/actions/admin";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import LoadingGear from "../LoadingGear/LoadingGear";
import { ExpandMore } from "@mui/icons-material";
import { useEffect } from "react";
import { sendCategories } from "../../api";

const Admin = () => {
  const initialState = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  // const [expandedCategories, setExpandedCategories] = useState([]);
  // const [expandedSubCategories, setExpandedSubCategories] = useState([]);
  // const [expandedTypes, setExpandedTypes] = useState([]);
  // const [expandedProducts, setExpandedProducts] = useState([]);
  const [categoriesCopy, setCategoriesCopy] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    // let tempExpandedCategories = [];
    // for (let i in categories) {
    //   tempExpandedCategories.push(false);
    // }
    // setExpandedCategories(tempExpandedCategories);
    // let tempExpandedSubCategories = [];
    // for (let i in categories) {
    //   tempExpandedSubCategories.push([]);
    // }
    // for (let i in categories) {
    //   for (let j in categories[i].subCategories) {
    //     tempExpandedSubCategories[i].push(false);
    //   }
    // }
    // setExpandedSubCategories(tempExpandedSubCategories);
    let categoriesCopyTemp = [];

    categoriesCopyTemp = [...categories];
    for (let i in categories) {
      categoriesCopyTemp[i].expanded = false;
      for (let j in categories[i].subCategories) {
        categoriesCopyTemp[i].subCategories[j].expanded = false;
        for (let k in categoriesCopyTemp[i].subCategories[j]?.subs) {
          categoriesCopyTemp[i].subCategories[j].subs[k].expanded = false;
          for (let l in categoriesCopyTemp[i].subCategories[j].subs[k].types) {
            categoriesCopyTemp[i].subCategories[j].subs[k].types[
              l
            ].expanded = false;
          }
        }
        for (let k in categoriesCopyTemp[i].subCategories[j].types) {
          categoriesCopyTemp[i].subCategories[j].types[k].expanded = false;
        }
      }
    }
    console.log(categoriesCopyTemp);
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
                        in={categoriesCopy[idx]?.expanded}
                        // timeout="auto"
                        unmountOnExit
                        // sx={{ position: "relative" }}
                      >
                        {category?.subCategories.map((subCategory, idxSub) => (
                          <Box key={idxSub}>
                            <Box
                              key={idxSub}
                              sx={{
                                borderTop:
                                  idxSub !== 0
                                    ? "1px solid rgba(0, 0, 0, 0.2)"
                                    : "none",
                                cursor: "pointer",
                                backgroundColor: "rgb(230, 230, 230)",
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
                                <IconButton>
                                  <ExpandMore />
                                </IconButton>
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
        </Box>
        // <>
        //   <DropdownMenu
        //     choices={modes}
        //     modeIndex={modeIndex}
        //     setModeIndex={setModeIndex}
        //   />
        //   <hr style={{ marginBlock: "50px" }}></hr>
        //   {modeIndex === 0 ? (
        //     <Box>
        //       <Box
        //         sx={{
        //           display: "flex",
        //           alignItems: "center",
        //           marginBottom: "50px",
        //         }}
        //       >

        //       </Box>
        //       {/* <Box
        //         sx={{
        //           display: "flex",
        //           alignItems: "center",
        //           marginBottom: "50px",
        //         }}
        //       >
        //         <Typography
        //           sx={{
        //             fontSize: "1.2rem",
        //             fontWeight: "600",
        //             marginRight: "50px",
        //           }}
        //         >
        //           Κατηγορία
        //         </Typography>
        //         <DropdownMenu
        //           choices={categoryChoices}
        //           modeIndex={categoryIndex}
        //           setModeIndex={setCategoryIndex}
        //         />
        //         <TextField
        //           sx={{
        //             backgroundColor: "white",
        //             borderRadius: "4px",
        //             marginLeft: "50px",
        //             display: categoryIndex === 4 ? "block" : "none",
        //           }}
        //           id="outlined-basic"
        //           variant="outlined"
        //         />
        //       </Box>
        //       <Box
        //         sx={{
        //           display: "flex",
        //           alignItems: "center",
        //           marginBottom: "50px",
        //         }}
        //       >
        //         <Typography
        //           sx={{
        //             fontSize: "1.2rem",
        //             fontWeight: "600",
        //             marginRight: "50px",
        //           }}
        //         >
        //           Υποκατηγορία
        //         </Typography>
        //         <TextField
        //           sx={{ backgroundColor: "white", borderRadius: "4px" }}
        //           id="outlined-basic"
        //           variant="outlined"
        //         />
        //       </Box>
        //       <Box
        //         sx={{
        //           display: "flex",
        //           alignItems: "center",
        //           marginBottom: "50px",
        //         }}
        //       >
        //         <Typography
        //           sx={{
        //             fontSize: "1.2rem",
        //             fontWeight: "600",
        //             marginRight: "50px",
        //           }}
        //         >
        //           Κωδικός
        //         </Typography>
        //         <TextField
        //           sx={{ backgroundColor: "white", borderRadius: "4px" }}
        //           id="outlined-basic"
        //           variant="outlined"
        //         />
        //       </Box> */}
        //     </Box>
        //   ) : null}
        // </>
      )}
    </Container>
  );
};

export default Admin;
