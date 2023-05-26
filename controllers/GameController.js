// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";

const { Request, Response } = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const GameController = {
  getAllGames: async (req, res) => {
    // Récupérez tous les Jeux dans la base de données
  },

  getGameBySlug: async (req, res) => {
    // Récupérez un Jeu par son Slug
  },

  createGame: async (req, res) => {
    // Créez un Jeu
  },

  updateGame: async (req, res) => {
    // Mettez à jour un Jeu
  },

  deleteGame: async (req, res) => {
    // Supprimez un Jeu
  },
};

module.exports = GameController;
