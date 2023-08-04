const express = require("express");

const RecipeController = require("../../controllers/recipe");

// const { basicUserLoginValidator } = require("../../validators/auth");

const { authenticationMiddleware } = require("../../middlewares/auth");

const router = express.Router();
const recipeController = new RecipeController();

/**
 * @route   GET api/recipe
 * @desc    Get all Recipes
 * @access  Private
 */
router.get(
  "/",
  [authenticationMiddleware],
  recipeController.getAll.bind(recipeController)
);

/**
 * @route   POST api/recipe
 * @desc    Create Recipe
 * @access  Private
 */
router.post(
  "/",
  [authenticationMiddleware],
  recipeController.create.bind(recipeController)
);

/**
 * @route   DELETE api/recipe
 * @desc    Create Recipe
 * @access  Private
 */
router.delete(
  "/:recipeId",
  [authenticationMiddleware],
  recipeController.delete.bind(recipeController)
);

module.exports = router;
