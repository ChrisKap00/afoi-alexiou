import mongoose from "mongoose";
import Categories from "../models/categories.js";
import Product from "../models/product.js";

export const fetchCategories = async (req, res) => {
  console.log("FETCHING CATEGORIES");
  try {
    const categories = await Categories.find();
    console.log(categories);
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const deleteById = async (req, res) => {
  console.log(req.body);
  const { id, categoryId, subCategoryId, subId, type } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) console.log("INVALID ID");

    const category = await Categories.findById(categoryId);
    // console.log(category);
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
    // console.log(category);
    const updatedCategory = await Categories.findByIdAndUpdate(
      categoryId,
      category,
      { new: true }
    );
    res
      .status(200)
      .json({ updatedCategory, id, categoryId, subCategoryId, subId, type });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const addSubCategory = async (req, res) => {
  console.log(req.body);
  const { categoryId, subCategoryId, subId, name, type, subCategoryToAddType } =
    req.body;
  try {
    const category = await Categories.findById(categoryId);
    // console.log(category);
    if (type === "subCategory") {
      category.subCategories.push({
        name,
        types: subCategoryToAddType === "types" ? [] : undefined,
        subs: subCategoryToAddType === "subs" ? [] : undefined,
      });
    } else if (type === "type") {
      for (let subCategory of category.subCategories) {
        if (String(subCategory._id) === subCategoryId) {
          subCategory.types.push({ name });
        }
      }
    } else if (type === "sub") {
      for (let subCategory of category.subCategories) {
        if (String(subCategory._id) === subCategoryId) {
          subCategory.subs.push({ name, types: [] });
        }
      }
    } else if (type === "innerType") {
      for (let subCategory of category.subCategories) {
        if (String(subCategory._id) === subCategoryId) {
          for (let sub of subCategory.subs) {
            if (String(sub._id) === subId) {
              sub.types.push({ name });
            }
          }
        }
      }
    }
    const updatedCategory = await Categories.findByIdAndUpdate(
      categoryId,
      category,
      { new: true }
    );
    res.status(200).json({
      updatedCategory,
      categoryId,
      subCategoryId,
      subId,
      name,
      type,
      subCategoryToAddType,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const addProduct = async (req, res) => {
  try {
    console.log(req.body);
    const productToAdd = req.body;
    const result = await Product.create({
      ...productToAdd,
      images: productToAdd.images.map((image) => image.data),
    });
    res.status(200).json({ _id: result._id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const fetchProducts = async (req, res) => {
  console.log(req.query);
  const {
    ids: { categoryId, subCategoryId, typeId, subId, innerTypeId },
    type,
  } = req.query;
  try {
    if (type === "category") {
      if (!mongoose.Types.ObjectId.isValid(categoryId))
        return res.status(404).send("Invalid category");

      const products = await Product.find({
        categoryId,
      });
      console.log(products);
      res.status(200).json({ products });
    } else if (type === "type") {
      if (!mongoose.Types.ObjectId.isValid(categoryId))
        return res.status(404).send("Invalid category");
      if (!mongoose.Types.ObjectId.isValid(subCategoryId))
        return res.status(404).send("Invalid sub-category");
      if (!mongoose.Types.ObjectId.isValid(typeId))
        return res.status(404).send("Invalid type");

      const products = await Product.find({
        categoryId,
        subCategoryId,
        typeId,
      });
      console.log(products);
      res.status(200).json({ products });
    }
    if (type === "innerType") {
      if (!mongoose.Types.ObjectId.isValid(categoryId))
        return res.status(404).send("Invalid category");
      if (!mongoose.Types.ObjectId.isValid(subCategoryId))
        return res.status(404).send("Invalid sub-category");
      if (!mongoose.Types.ObjectId.isValid(subId))
        return res.status(404).send("Invalid sub-category");
      if (!mongoose.Types.ObjectId.isValid(innerTypeId))
        return res.status(404).send("Invalid type");

      const products = await Product.find({
        categoryId,
        subCategoryId,
        subId,
        innerTypeId,
      });
      console.log(products);
      res.status(200).json({ products });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteProduct = async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("Invalid product id");

    const result = await Product.findByIdAndDelete(id);
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const editProduct = async (req, res) => {
  console.log(req.body);
  try {
    const data = req.body;
    if (!mongoose.Types.ObjectId.isValid(data._id))
      return res.status(404).send("Invalid product id");

    const result = await Product.findByIdAndUpdate(data._id, data, {
      new: true,
    });
    console.log(data);
    console.log(result);
    res.status(200).json({ id: data._id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
