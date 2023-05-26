// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";

const { Request, Response } = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const SubscriptionsController = {
  getAllSubscriptions: async (req, res) => {
    // Récupérez tous les Abonnées dans la base de données
  },

  getSubscriptionByUuid: async (req, res) => {
    // Récupérez un Abonnée par son UUID
  },

  createSubscription: async (req, res) => {
    // Créez un Abonnée
  },

  updateSubscription: async (req, res) => {
    // Mettez à jour un Abonnée
  },

  deleteSubscription: async (req, res) => {
    // Supprimez un Abonnée
  },
};

module.exports = SubscriptionsController;
