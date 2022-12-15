import * as api from "../../api";

export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: "START_LOADING_FETCH_CATEGORIES" });
  try {
    const { data } = await api.fetchCategories();
    dispatch({ type: "FETCH_CATEGORIES", payload: data.categories });
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: "STOP_LOADING_FETCH_CATEGORIES" });
};

export const deleteById =
  (item, categoriesCopy, setCategoriesCopy) => async (dispatch) => {
    dispatch({ type: "START_LOADING_UPDATE" });
    try {
      const { data } = await api.deleteById(item);
      const { id, categoryId, subCategoryId, subId, type } = data;

      let category = {};
      for (let categoryTemp of categoriesCopy) {
        if (categoryTemp._id === categoryId) {
          category = { ...categoryTemp };
        }
      }
      if (type === "subCategory") {
        category.subCategories = category.subCategories.filter(
          (subCategory) => String(subCategory._id) !== id
        );
      } else if (type === "type") {
        for (let subCategory of category.subCategories) {
          if (String(subCategory._id) === subCategoryId) {
            subCategory.types = subCategory.types.filter(
              (type) => String(type._id) !== id
            );
          }
        }
      } else if (type === "sub") {
        for (let subCategory of category.subCategories) {
          if (String(subCategory._id) === subCategoryId) {
            subCategory.subs = subCategory.subs.filter(
              (sub) => String(sub._id) !== id
            );
          }
        }
      } else if (type === "innerType") {
        for (let subCategory of category.subCategories) {
          if (String(subCategory._id) === subCategoryId) {
            for (let sub of subCategory.subs) {
              if (String(sub._id) === subId) {
                sub.types = sub.types.filter((type) => String(type._id) !== id);
              }
            }
          }
        }
      }
      setCategoriesCopy(
        categoriesCopy.map((categoryParam, idx) =>
          categoryParam._id === categoryId ? category : categoryParam
        )
      );
      dispatch({ type: "UPDATE", payload: data.updatedCategory });
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: "STOP_LOADING_UPDATE" });
  };

export const addSubCategory =
  (item, categoriesCopy, setCategoriesCopy) => async (dispatch) => {
    dispatch({ type: "START_LOADING_UPDATE" });
    try {
      const { data } = await api.addSubCategory(item);
      const { categoryId, subCategoryId, subId, name, type } = data;
      let newId;
      if (type === "subCategory") {
        for (let subCategory of data.updatedCategory.subCategories) {
          if (name === subCategory.name) newId = subCategory._id;
        }
      } else if (type === "type") {
        for (let subCategory of data.updatedCategory.subCategories) {
          if (subCategoryId === subCategory._id) {
            for (let type of subCategory.types) {
              if (name === type.name) {
                newId = type._id;
              }
            }
          }
        }
      } else if (type === "sub") {
        for (let subCategory of data.updatedCategory.subCategories) {
          if (subCategoryId === subCategory._id) {
            for (let sub of subCategory.subs) {
              if (name === sub.name) {
                newId = sub._id;
              }
            }
          }
        }
      } else if (type === "innerType") {
        for (let subCategory of data.updatedCategory.subCategories) {
          if (subCategoryId === subCategory._id) {
            for (let sub of subCategory.subs) {
              if (subId === sub._id) {
                for (let type of sub.types) {
                  if (name === type.name) {
                    newId = type._id;
                  }
                }
              }
            }
          }
        }
      }

      let category;
      for (let categoryTemp of categoriesCopy) {
        if (categoryTemp._id === categoryId) {
          category = { ...categoryTemp };
        }
      }
      if (type === "subCategory") {
        setCategoriesCopy(
          categoriesCopy.map((categoryParam, idx) =>
            categoryParam._id === categoryId
              ? {
                  ...categoryParam,
                  subCategories: !categoryParam.subCategories
                    ? [
                        {
                          name,
                          types:
                            item.subCategoryToAddType === "types"
                              ? []
                              : undefined,
                          subs:
                            item.subCategoryToAddType === "subs"
                              ? []
                              : undefined,
                          _id: newId,
                        },
                      ]
                    : [
                        ...categoryParam.subCategories,
                        {
                          name,
                          types:
                            item.subCategoryToAddType === "types"
                              ? []
                              : undefined,
                          subs:
                            item.subCategoryToAddType === "subs"
                              ? []
                              : undefined,
                          _id: newId,
                        },
                      ],
                  subCategoryToAddType: undefined,
                }
              : categoryParam
          )
        );
      } else if (type === "type") {
        setCategoriesCopy(
          categoriesCopy.map((categoryParam, idx) =>
            categoryParam._id === categoryId
              ? {
                  ...categoryParam,
                  subCategories: categoryParam.subCategories.map(
                    (subCategoryParam, idx2) =>
                      subCategoryParam._id === subCategoryId
                        ? {
                            ...subCategoryParam,
                            types: [
                              ...subCategoryParam.types,
                              { name, _id: newId },
                            ],
                          }
                        : subCategoryParam
                  ),
                  subCategoryToAddType: undefined,
                }
              : categoryParam
          )
        );
      } else if (type === "sub") {
        setCategoriesCopy(
          categoriesCopy.map((categoryParam, idx) =>
            categoryParam._id === categoryId
              ? {
                  ...categoryParam,
                  subCategories: categoryParam.subCategories.map(
                    (subCategoryParam, idx2) =>
                      subCategoryParam._id === subCategoryId
                        ? {
                            ...subCategoryParam,
                            subs: [
                              ...subCategoryParam.subs,
                              { name, types: [], _id: newId },
                            ],
                          }
                        : subCategoryParam
                  ),
                  subCategoryToAddType: undefined,
                }
              : categoryParam
          )
        );
      } else if (type === "innerType") {
        setCategoriesCopy(
          categoriesCopy.map((categoryParam, idx) =>
            categoryParam._id === categoryId
              ? {
                  ...categoryParam,
                  subCategories: categoryParam.subCategories.map(
                    (subCategoryParam, idx2) =>
                      subCategoryParam._id === subCategoryId
                        ? {
                            ...subCategoryParam,
                            subs: subCategoryParam.subs.map((subParam, idx3) =>
                              subParam._id === subId
                                ? {
                                    ...subParam,
                                    types: [
                                      ...subParam.types,
                                      { name, _id: newId },
                                    ],
                                  }
                                : subParam
                            ),
                          }
                        : subCategoryParam
                  ),
                  subCategoryToAddType: undefined,
                }
              : categoryParam
          )
        );
      }
      dispatch({ type: "UPDATE", payload: data.updatedCategory });
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: "STOP_LOADING_UPDATE" });
  };

export const addProduct = (item) => async (dispatch) => {
  dispatch({ type: "START_LOADING_FETCH_PRODUCTS" });
  try {
    const { data } = await api.addProduct(item);
    dispatch({
      type: "ADD_PRODUCT",
      payload: {
        ...item,
        images: item.images.map((image) => image.data),
        _id: data._id,
      },
    });
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: "STOP_LOADING_FETCH_PRODUCTS" });
};

export const fetchProducts = (params) => async (dispatch) => {
  dispatch({ type: "START_LOADING_FETCH_PRODUCTS" });
  try {
    const {
      data: { products },
    } = await api.fetchProducts(params);
    dispatch({ type: "FETCH_PRODUCTS", payload: products });
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: "STOP_LOADING_FETCH_PRODUCTS" });
};

export const fetchClientProducts =
  ({ ids, type }, setPages, setClientProducts, page) =>
  async (dispatch) => {
    dispatch({ type: "START_LOADING_FETCH_CLIENT_PRODUCTS" });
    try {
      const {
        data: { products, pages },
      } = await api.fetchProducts({ ids, type, page });
      setPages(pages);
      setClientProducts(products);
      dispatch({ type: "FETCH_CLIENT_PRODUCTS", payload: products });
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: "STOP_LOADING_FETCH_CLIENT_PRODUCTS" });
  };

export const fetchProduct = (id, setProduct) => async (dispatch) => {
  dispatch({ type: "START_LOADING_FETCH_ONE" });
  try {
    const { data } = await api.fetchProduct(id);
    setProduct(data);
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: "STOP_LOADING_FETCH_ONE" });
};

export const fetchRecommendedProducts =
  (ids, setRecommendedProducts) => async (dispatch) => {
    dispatch({ type: "START_LOADING_FETCH_RECOMMENDED" });
    try {
      const { data } = await api.fetchRecommendedProducts(ids);
      setRecommendedProducts(data);
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: "STOP_LOADING_FETCH_RECOMMENDED" });
  };

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: "START_LOADING_FETCH_PRODUCTS" });
  try {
    const { data } = await api.deleteProduct(id);
    dispatch({ type: "DELETE_PRODUCT", payload: data.id });
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: "STOP_LOADING_FETCH_PRODUCTS" });
};

export const editProduct = (productData) => async (dispatch) => {
  dispatch({ type: "START_LOADING_FETCH_PRODUCTS" });
  try {
    const { data } = await api.editProduct(productData);
    dispatch({ type: "EDIT_PRODUCT", payload: { id: data.id, productData } });
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: "STOP_LOADING_FETCH_PRODUCTS" });
};

export const searchProducts =
  ({ query, code, page }, setPages, setResults) =>
  async (dispatch) => {
    dispatch({ type: "START_LOADING_FETCH_RESULTS" });
    try {
      const {
        data: { products, pages },
      } = await api.searchProducts({ query, code, page });
      setPages(pages);
      setResults(products);
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: "STOP_LOADING_FETCH_RESULTS" });
  };
