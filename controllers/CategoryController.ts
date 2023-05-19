import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CategoryController = {
  getAllCategories: async (req: Request, res: Response) => {
    // Récupérez tous les Catégories dans la base de données
  },

  getCategoryById: async (req: Request, res: Response) => {
    // Récupérez un Catégorie par son ID
  },

  createCategory: async (req: Request, res: Response) => {
    // Créez un Catégorie
  },

  updateCategory: async (req: Request, res: Response) => {
    // Mettez à jour un Catégorie
  },

  deleteCategory: async (req: Request, res: Response) => {
    // Supprimez un Catégorie
  },
};

export default CategoryController;
