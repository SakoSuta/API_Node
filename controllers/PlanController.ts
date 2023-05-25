import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PlanController = {
  getAllPlans: async (req: Request, res: Response) => {
    // Récupérez tous les Plans dans la base de données
    try{
      const plans = await prisma.plan.findMany();
      res.json(plans);
    }catch (error){
      res.status(500).json({ error: 'An error occurred while retrieving plans.' });
    }
  },

  getPlanBySlug: async (req: Request, res: Response) => {
    // Récupérez un Plan par son Slug
    try{
      const { slug } = req.params;
      const plan = await prisma.plan.findUnique({ where: { slug } });
      if (!plan) {
        return res.status(404).json({ error: 'Plan not found.' });
      }
      res.json(plan);
    }catch (error){
      res.status(500).json({ error: 'An error occurred while retrieving the plan.' });
    }
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
