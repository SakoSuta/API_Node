const { Request, Response } = require("express");
const { PrismaClient } = require("@prisma/client");
const slugify = require("slugify");

const prisma = new PrismaClient();

const CategoryController = {
  getAllCategories: async (req, res) => {
    // Récupérez tous les Catégories dans la base de données
    try {
      const categories = await prisma.category.findMany({ include: { games: true }});
      res.json(categories);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving categories." });
    }
  },

  getCategoryBySlug: async (req, res) => {
    // Récupérez un Catégorie par son Slug
    try {
      const { slug } = req.params;
      const category = await prisma.category.findUnique({ where: { slug }, include: { games: true } });
      if (!category) {
        return res.status(404).json({ error: "Category not found." });
      }
      res.json(category);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the category." });
    }
  },

  createCategory: async (req, res) => {
    // Créez un Catégorie
    try {
      const { name } = req.body;
      const CreatSlug = slugify(name);
      const category = await prisma.category.create({
        data: { name, slug: CreatSlug },
      });
      res.json({ category, message: "Category successfully created." });
    } catch (error) {
      console.error(error);
      if (error.code === "P2002" && error.meta?.target?.includes("name")) {
        res
          .status(409)
          .json({ error: "This name is already used by another category." });
      }
      res
        .status(500)
        .json({ error: "An error occurred while creating the category." });
    }
  },

  updateCategory: async (req, res) => {
    // Mettez à jour un Catégorie
    try {
      const { name } = req.body;
      const { slug } = req.params;
      const CategorySlug = prisma.category.findUnique({ where: { slug } });
      if (!CategorySlug) {
        return res.status(404).json({ error: "Category not found." });
      }
      const CreatSlug = slugify(name);
      const category = await prisma.category.update({
        where: { slug },
        data: { name, slug: CreatSlug },
      });
      res.json({ category, message: "Category successfully updated." });
    } catch (error) {
      console.error(error);
      if (error.code === "P2002" && error.meta?.target?.includes("name")) {
        res
          .status(409)
          .json({ error: "This name is already used by another category." });
      }
      res
        .status(500)
        .json({ error: "An error occurred while updating the category." });
    }
  },

  deleteCategory: async (req, res) => {
    // Supprimez un Catégorie
    try {
      const { slug } = req.params;
      const categorySlug = await prisma.category.findUnique({
        where: { slug },
      });
      if (!categorySlug) {
        return res.status(404).json({ error: "Category not found." });
      }
      const category = await prisma.category.delete({ where: { slug } });
      res.json({ message: "Category successfully deleted." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the category." });
    }
  },
};

module.exports = CategoryController;
