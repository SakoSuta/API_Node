const { Request, Response } = require("express");
const { PrismaClient } = require("@prisma/client");
const slugify = require("slugify");

const prisma = new PrismaClient();

const PostController = {
  getAllPosts: async (req, res) => {
    // Récupérez tous les Posts dans la base de données
    try {
      const post = await prisma.post.findMany();
      res.json(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving post." });
    }
  },

  getPostBySlug: async (req, res) => {
    // Récupérez un Post par son Slug
    try {
      const { slug } = req.params;
      const post = await prisma.post.findUnique({ where: { slug }, include: { author: true } });
      if (!post) {
        return res.status(404).json({ error: "Post not found." });
      }
      res.json(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the plan." });
    }
  },

  createPost: async (req, res) => {
    // Créez un Post
    try {
      const userId = req.user.UserId;
      const user = await prisma.user.findUnique({ where: { id: userId }});
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      } else if (user.isAdmin !== true) {
        return res.status(403).json({ error: "You are not authorized to create a post." });
      }
      const { title, body, image } = req.body;
      const CreatSlug = slugify(title, { lower: true });
      const post = await prisma.post.create({
        data: {
          author: { connect: { id: userId } },
          title,
          slug: CreatSlug,
          body,
          image,
        },
      });
      res.json({ post, message: "Post successfully created." });
    } catch (error) {
      console.error(error);
      if (error.code === "P2002") {
        res
          .status(409)
          .json({ error: "This title is already used by another post." });
      } else {
        res.status(500).json({ error: "An error occurred while creating post." });
      }
    }
  },

  updatePost: async (req, res) => {
    // Mettez à jour un Post
    try {
      const userId = req.user.UserId;
      const user = await prisma.user.findUnique({ where: { id: userId }});
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      } else if (user.isAdmin !== true) {
        return res.status(403).json({ error: "You are not authorized to create a post." });
      }

      const { slug } = req.params;
      const postSlug = await prisma.post.findUnique({ where: { slug } });
      if (!postSlug) {
        return res.status(404).json({ error: "Post not found." });
      }
      const { title, body, image, publishedAt } = req.body;
      const CreatSlug = slugify(title, { lower: true });
      const post = await prisma.post.update({
        where: { slug },
        data: {
          author: { connect: { id: userId } },
          title,
          slug: CreatSlug,
          body,
          image,
          publishedAt,
        },
      });
      res.json({ post, message: "Post successfully created." });
    } catch (error) {
      console.error(error);
      if (error.code === "P2002") {
        res
          .status(409)
          .json({ error: "This title is already used by another post." });
      } else {
        return res.status(500).json({ error: "An error occurred while creating post." });
      }
    }
  },

  deletePost: async (req, res) => {
    // Supprimez un Post
    try {
      const userId = req.user.UserId;
      const user = await prisma.user.findUnique({ where: { id: userId }});
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      const { slug } = req.params;
      const post = await prisma.post.delete({ where: { slug } });
      res.json({ post, message: "Post successfully deleted." });
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while deleting post." });
    }
  },
};

module.exports = PostController;
