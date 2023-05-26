// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";

const { Request, Response } = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const PromoCodeController = {
  getAllPromoCodes: async (req, res) => {
    // Récupérez tous les Codes Promos dans la base de données
  },

  getPromoCodeById: async (req, res) => {
    // Récupérez un Code Promo par son ID
  },

  createPromoCode: async (req, res) => {
    // Créez un Code Promo
  },

  updatePromoCode: async (req, res) => {
    // Mettez à jour un Code Promo
  },

  deletePromoCode: async (req, res) => {
    // Supprimez un Code Promo
  },
};

module.exports = PromoCodeController;
