const mongoose = require("mongoose");

// Define the schema for the recipe
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
      },
    ],
    instructions: {
      type: String,
      required: true,
    },
    // preparationTime: {
    //   type: Number,
    //   required: true,
    // },
    // cookingTime: {
    //   type: Number,
    //   required: true,
    // },
    // servings: {
    //   type: Number,
    //   required: true,
    // },
    // cuisine: {
    //   type: String,
    //   required: true,
    // },
    image: {
      type: String,
    },
    difficultyLevel: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Replace 'User' with the name of your User schema, if applicable
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "recipes" }
);

module.exports = {
  Recipe: mongoose.model("recipe", recipeSchema),
};
