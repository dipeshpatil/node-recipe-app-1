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

  async delete(req, res) {}
}

module.exports = RecipeController;
