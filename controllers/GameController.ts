import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const GameController = {
  getAllGames: async (req: Request, res: Response) => {
    // Récupérez tous les Jeux dans la base de données
  },

  getGameById: async (req: Request, res: Response) => {
    // Récupérez un Jeu par son ID
  },

  createGame: async (req: Request, res: Response) => {
    // Créez un Jeu
  },

  updateGame: async (req: Request, res: Response) => {
    // Mettez à jour un Jeu
  },

  deleteGame: async (req: Request, res: Response) => {
    // Supprimez un Jeu
  },
};

export default GameController;
