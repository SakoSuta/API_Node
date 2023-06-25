const { Request, Response } = require("express");
const { PrismaClient } = require("@prisma/client");
const slugify = require("slugify");

const prisma = new PrismaClient();

const GameController = {
  getAllGames: async (req, res) => {
    // Récupérez tous les Jeux dans la base de données
    try {
      const games = await prisma.game.findMany();
      res.json(games);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving games." });
    }
  },

  getGameBySlug: async (req, res) => {
    // Récupérez un Jeu par son Slug
    try {
      const { slug } = req.params;
      const gameSlug = await prisma.game.findUnique({ where: { slug } });
      if (!gameSlug) {
        return res.status(404).json({ error: "Game not found." });
      }
      res.json(gameSlug);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the game." });
    }
  },

  createGame: async (req, res) => {
    // Créez un Jeu
    try {
      const { name, image, dateSortie, developpement, edition, description } = req.body;
      const CreatSlug = slugify(name);
      const game = await prisma.game.create({
        data: {
          name,
          image,
          dateSortie,
          developpement,
          edition,
          description,
          slug: CreatSlug,
        },
      });
      res.json({ game, message: "Game successfully created." });
    } catch (error) {
      console.error(error);
      if (error.code === "P2002" && error.meta?.target?.includes("name")) {
        res
          .status(409)
          .json({ error: "This name is already used by another game." });
      }
      res
        .status(500)
        .json({ error: "An error occurred while creating the game." });
    }
  },

  updateGame: async (req, res) => {
    // Mettez à jour un Jeu
    try {
      const { slug } = req.params;
      const { name, image, dateSortie, developpement, edition, description } = req.body;
      CreatSlug = slugify(name);

      const gameSlug = await prisma.game.findUnique({ where: { slug } });
      if (!gameSlug) {
        return res.status(404).json({ error: "Game not found." });
      }
      const game = await prisma.game.update({
        where: { slug },
        data: {
          name,
          image,
          dateSortie,
          developpement,
          edition,
          description,
          slug: CreatSlug,
        },
      });
      res.json({ game, message: "Game successfully updated." });
    } catch (error) {
      console.error(error);
      if (error.code === "P2002" && error.meta?.target?.includes("name")) {
        res
          .status(409)
          .json({ error: "This name is already used by another game." });
      }
      res
        .status(500)
        .json({ error: "An error occurred while updating the game." });
    }
  },

  deleteGame: async (req, res) => {
    // Supprimez un Jeu
    try {
      const { slug } = req.params;
      const gameSlug = await prisma.game.findUnique({ where: { slug } });
      if (!gameSlug) {
        return res.status(404).json({ error: "Game not found." });
      }
      const game = await prisma.game.delete({ where: { slug } });
      res.json({ game, message: "Game successfully deleted." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the game." });
    }
  },
};

module.exports = GameController;
