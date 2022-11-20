import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  images: { type: [String], required: true },
  inStock: { type: String, required: true },
  manufacturer: { type: String, required: true },
  categoryId: { type: String, required: true },
  subCategoryId: { type: String, required: false },
  typeId: { type: String, required: false },
  subId: { type: String, required: false },
  innerTypeId: { type: String, required: false },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
