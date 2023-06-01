const { ConfimeSub, ConfimeUnsub } = require('./ContactController');
const { Request, Response } = require("express");
const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

const SubscriptionsController = {
  getAllSubscriptions: async (req, res) => {
    // Récupérez tous les Abonnées dans la base de données
    try { 
      const subscriptions = await prisma.subscriptions.findMany();
      res.json(subscriptions);
    }catch(error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving subscriptions.' });
    }
  },

  getSubscriptionByUuid: async (req, res) => {
    // Récupérez un Abonnée par son UUID
    try {
      const { uuid } = req.params;
      const subscription = await prisma.subscriptions.findUnique({ where: { uuid } });
      if (!subscription) {
        return res.status(404).json({ error: 'Subscription not found.' });
      }
      res.json(subscription);
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving the subscription.' });
    }
  },

  createSubscription: async (req, res) => {
    // Créez un Abonnée
    try {
      const { user, plan, endDate } = req.body;
      const Creatuuid = uuidv4();
      const subscription = await prisma.subscriptions.create({
        data: {
          user: {  connect: { id: parseInt(user) } },
          plan: {  connect: { id: parseInt(plan) } },
          endDate,
          uuid: Creatuuid,
        },
        include: {
          user: true,
          plan: true,
        },
      });
      await ConfimeSub(subscription);
      res.json({subscription, message: 'Subscription successfully created.'});
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the subscription.' });
    }
  },

  updateSubscription: async (req, res) => {
    // Mettez à jour un Abonnée
    try {
      const { user, plan } = req.body;
      const { uuid } = req.params;
      const SubUuid = await prisma.subscriptions.findUnique({ where: { uuid } });
      if (!SubUuid) {
        return res.status(404).json({ error: 'Subscription not found.' });
      }
      const Creatuuid = uuidv4();
      const subscription = await prisma.subscriptions.update({
        where: { uuid },
        data: {
          user: {  connect: { id: parseInt(user) } },
          plan: {  connect: { id: parseInt(plan) } },
          uuid: Creatuuid,
        },
      });
      res.json({subscription, message: 'Subscription successfully updated.'});
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the subscription.' });
    }
  },

  deleteSubscription: async (req, res) => {
    // Supprimez un Abonnée
    try {
      const { uuid } = req.params;
      const SubUuid = await prisma.subscriptions.findUnique({ where: { uuid }, include: { user: true, plan: true } });
      if (!SubUuid) {
        res.status(404).json({ error: 'Subscription not found.' });
      }
      const mail = await ConfimeUnsub(SubUuid);
      if(mail)
      {
        const subscription = await prisma.subscriptions.delete({ where: { uuid } });
        res.json({subscription, message: 'Subscription successfully deleted.' });
      }
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the subscription.' });
    }
  },
};

module.exports = SubscriptionsController;
