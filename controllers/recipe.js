const logger = require("../logger");

const { Recipe } = require("../models/recipe");

class RecipeController {
  constructor() {}

  async getAll(req, res) {
    try {
      const userId = req.user.id;
      const recipes = await Recipe.find({ createdBy: userId }).populate(
        "createdBy",
        "_id name email"
      );
      return res.json(recipes);
    } catch (error) {
      logger.error(`[RECIPE FETCH ERROR]: ${error.message}`);
      return res.json(error.message);
    }
  }

  async create(req, res) {
    try {
      const recipeBody = req.body;
      const userId = req.user.id;

      const recipe = new Recipe({
        ...recipeBody,
        createdBy: userId,
      });

      await recipe.save();

      return res.json({ ...recipeBody, userId });
    } catch (error) {
      logger.error(`[RECIPE CREATE ERROR]: ${err.message}`);
      return res.json(err.message);
    }
  }

  async edit(req, res) {}

  async delete(req, res) {
    try {
      const recipe = await Recipe.findOne({
        _id: req.params.recipeId,
      });

      if (!recipe) {
        return res.status(404).send("Recipe Not Found");
      }

      const deletedRecipe = await Recipe.findOneAndDelete({
        _id: req.params.recipeId,
      });

      return res.json({
        recipe: deletedRecipe,
        msg: "Recipe Deleted Successfully",
      });
    } catch (error) {
      logger.error(`[RECIPE DELETE ERROR]: ${error.message}`);
      return res.json(error.message);
    }
  }
}

module.exports = RecipeController;
