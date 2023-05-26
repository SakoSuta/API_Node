// import { Request, Response } from 'express';
// import { PrismaClient} from '@prisma/client';
// import slugify from 'slugify';

const { Request, Response } = require('express');
const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');
const { subscribe } = require('diagnostics_channel');

const prisma = new PrismaClient();

const PlanController = {
  getAllPlans: async (req, res) => {
    // Récupérez tous les Plans dans la base de données
    try{
      const plans = await prisma.plan.findMany();
      res.json(plans);
    }catch (error){
      res.status(500).json({ error: 'An error occurred while retrieving plans.' });
    }
  },

  getPlanBySlug: async (req, res) => {
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

  createPlan: async (req, res) => {
    try {
      const { name, price, category } = req.body;
      console.log(req.body);
      const slug = slugify(name, { lower: true });
      console.log(slug);
      const plan = await prisma.plan.create({
        data: {
          name,
          slug,
          price,
          category: { 
            connect: {id: parseInt(category)}
          }
      }
    });
      res.json({ plan, message: 'Plan successfully created.' });
    } catch (error) {
      // Gérer les erreurs
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the plan.' });
    }
  },

  updatePlan: async (req, res) => {
    // Mettez à jour un Plan
  },

  deletePlan: async (req, res) => {
    // Supprimez un Plan
  },
};

module.exports = PlanController;
