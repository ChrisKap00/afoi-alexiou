import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/admin.js";
import Categories from "../models/categories.js";

export const signin = async (req, res) => {
  const { username, password } = req.body;


  try {
    const existingUser = await Admin.findOne({ username });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { username: existingUser.username, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const postCategories = async (req, res) => {
  const { categories } = req.body;
  const result = [];
  try {
    // const result = await Categories.create(req.body);
    for (let category of categories) {
      const res = await Categories.create(category);
      result.push(res);
    }
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const deleteAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    for (let category of categories) {
      await Categories.findByIdAndDelete(category._id);
    }
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};