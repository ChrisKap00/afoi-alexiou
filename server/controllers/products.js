import Categories from "../models/categories.js";

export const fetchCategories = async (req, res) => {
  console.log("FETCHING CATEGORIES");
  try {
    const categories = await Categories.findOne();
    console.log(categories);
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const deleteById = async (req, res) => {
  console.log(req.body);
  // const { id } = req.body;
  try {
    // const item = await Categories.findById(id);
    // console.log(item);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
