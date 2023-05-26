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
      const CreatSlug = slugify(name, { lower: true });
      const plan = await prisma.plan.create({
        data: {
          name,
          slug: CreatSlug,
          price: parseFloat(price),
          category: { 
            connect: category.map((categoryId) => ({
              id: parseInt(categoryId),
            }))
          }
      }
    });
      res.json({ plan, message: 'Plan successfully created.' });
    } catch (error) {
      // Gérer les erreurs
      console.error(error);
      if(error.code === 'P2002' && error.meta?.target?.includes('name')){
        res.status(400).json({ error: 'This name is already used by another plan.' });
      }
      res.status(500).json({ error: 'An error occurred while creating the plan.' });
    }
  },

  updatePlan: async (req, res) => {
    // Mettez à jour un Plan
    try {
      const { slug } = req.params;
      const { name, price, category } = req.body;
      const planSlug = await prisma.plan.findUnique({ where: { slug } });
      if (!planSlug) {
        res.status(404).json({ error: 'Plan not found.' });
      }
      const CreatSlug = slugify(name);
      const plan = await prisma.plan.update({
        where: { slug },
        data: {
          name,
          slug: CreatSlug,
          price: parseFloat(price),
          category: { 
            connect: category.map((categoryId) => ({
              id: parseInt(categoryId),
            }))
          }
        }
      });
      res.json({ plan, message: 'Plan successfully updated.' });
    } catch (error) {
      // Gérer les erreurs
      console.error(error);
      if(error.code === 'P2002' && error.meta?.target?.includes('name')){
        res.status(400).json({ error: 'This name is already used by another plan.' });
      }
      res.status(500).json({ error: 'An error occurred while creating the plan.' });
    }
  },

  deletePlan: async (req, res) => {
    // Supprimez un Plan
    try {
      const { slug } = req.params;
      const planSlug = await prisma.plan.findUnique({ where: { slug } });
      if (!planSlug) {
        res.status(404).json({ error: 'Plan not found.' });
      }
      const plan = await prisma.plan.delete({ where: { slug } });
      res.json({ plan, message: 'Plan successfully deleted.' });
    }catch (error) {
      // Gérer les erreurs
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the plan.' });
    }
  },
};

module.exports = PlanController;
