import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PlanController = {
  getAllPlans: async (req: Request, res: Response) => {
    // Récupérez tous les Plans dans la base de données
  },

  getPlanById: async (req: Request, res: Response) => {
    // Récupérez un Plan par son ID
  },

  createPlan: async (req: Request, res: Response) => {
    // Créez un Plan
  },

  updatePlan: async (req: Request, res: Response) => {
    // Mettez à jour un Plan
  },

  deletePlan: async (req: Request, res: Response) => {
    // Supprimez un Plan
  },
};

export default PlanController;
