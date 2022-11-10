import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/admin.js";
import Categories from "../models/categories.js";

export const signin = async (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);

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
      console.log(bcrypt.decodeBase64(existingUser.password));
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
  // console.log(req.body);
  // try {
  //   const result = await Categories.create(req.body);
  //   res.status(200).json({ result });
  // } catch (error) {
  //   res.status(500).json({ message: "Something went wrong." });
  // }
};

// export const signup = async (req, res) => {
//   console.log(req.body);
//   const { username, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 12);

//     const result = await Admin.create({
//       username,
//       password: hashedPassword,
//     });

//     const token = jwt.sign({ id: result._id }, "test", {
//       expiresIn: "1h",
//     });
//     res.status(200).json({ result: result, token: token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// };
