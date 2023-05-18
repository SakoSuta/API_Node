import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UserController = {
  getAllUsers: async (req: Request, res: Response) => {
    // Récupérez tous les utilisateurs dans la base de données
  },

  getUserById: async (req: Request, res: Response) => {
    // Récupérez un utilisateur par son ID
  },

  createUser: async (req: Request, res: Response) => {
    // Créez un utilisateur
  },

  updateUser: async (req: Request, res: Response) => {
    // Mettez à jour un utilisateur
  },

  deleteUser: async (req: Request, res: Response) => {
    // Supprimez un utilisateur
  },
};

export default UserController;
