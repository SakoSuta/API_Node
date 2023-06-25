const { Request, Response } = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const PostController = {
  getAllPosts: async (req, res) => {
    // Récupérez tous les Posts dans la base de données
  },

  getPostBySlug: async (req, res) => {
    // Récupérez un Post par son Slug
  },

  createPost: async (req, res) => {
    // Créez un Post
  },

  updatePost: async (req, res) => {
    // Mettez à jour un Post
  },

  deletePost: async (req, res) => {
    // Supprimez un Post
  },
};

module.exports = PostController;
