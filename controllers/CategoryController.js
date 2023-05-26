// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";

const { Request, Response } = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const CategoryController = {
  getAllCategories: async (req, res) => {
    // Récupérez tous les Catégories dans la base de données
  },

  getCategoryBySlug: async (req, res) => {
    // Récupérez un Catégorie par son Slug
  },

  createCategory: async (req, res) => {
    // Créez un Catégorie
  },

  updateCategory: async (req, res) => {
    // Mettez à jour un Catégorie
  },

  deleteCategory: async (req, res) => {
    // Supprimez un Catégorie
  },
};

module.exports = CategoryController;
