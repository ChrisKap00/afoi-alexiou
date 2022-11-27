import mongoose from "mongoose";

const categoriesSchema = mongoose.Schema({
  name: { type: String, required: true },
  // pathname: { type: String, required: true },
  subCategories: {
    type: [
      {
        name: { type: String, required: true },
        // pathname: { type: String, required: true },
        types: {
          type: [
            {
              name: { type: String, required: true },
              // pathname: { type: String, required: true },
            },
          ],
          required: false,
          default: undefined,
        },
        subs: {
          type: [
            {
              name: { type: String, required: true },
              // pathname: { type: String, required: true },
              types: {
                type: [
                  {
                    name: { type: String, required: true },
                    // pathname: { type: String, required: true },
                  },
                ],
                required: false,
              },
            },
          ],
          required: false,
          default: undefined,
        },
      },
    ],
    required: false,
    default: undefined,
  },
});

const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
