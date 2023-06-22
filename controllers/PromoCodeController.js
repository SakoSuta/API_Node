const { Request, Response } = require("express");
const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

const PromoCodeController = {
  getAllPromoCodes: async (req, res) => {
    // Récupérez tous les Codes Promos dans la base de données
    try {
      const promoCodes = await prisma.promoCode.findMany();
      res.json(promoCodes);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving promo codes." });
    }
  },

  getPromoCodeByUuid: async (req, res) => {
    // Récupérez un Code Promo par son UUID
    try {
      const { uuid } = req.params;
      const promoUuid = await prisma.PromoCode.findUnique({ where: { uuid } });
      if (!promoUuid) {
        return res.status(404).json({ error: "Promo code not found." });
      }
      res.json(promoUuid);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the promo code." });
    }
  },

  createPromoCode: async (req, res) => {
    // Créez un Code Promo
    try {
      const { name, code, discount, startDate, endDate } = req.body;
      const uuid = uuidv4();
      const promoCode = await prisma.promoCode.create({
        data: { name, code, discount, startDate, endDate, uuid },
      });
      res.json({ promoCode, message: "Promo code successfully created." });
    } catch (error) {
      console.error(error);
      if (error.code === "P2002" && error.meta?.target?.includes("name")) {
        res
          .status(409)
          .json({ error: "This name is already used by another promo code." });
      } else if (
        error.code === "P2002" &&
        error.meta?.target?.includes("code")
      ) {
        res
          .status(409)
          .json({ error: "This code is already used by another promo code." });
      }
      res
        .status(500)
        .json({ error: "An error occurred while creating the promo code." });
    }
  },

  updatePromoCode: async (req, res) => {
    // Mettez à jour un Code Promo
    try {
      const { uuid } = req.params;
      const { name, code, discount, startDate, endDate } = req.body;
      const promoCodeUuid = await prisma.promoCode.findUnique({
        where: { uuid },
      });
      if (!promoCodeUuid) {
        return res.status(404).json({ error: "Promo code not found." });
      }
      const promoCode = await prisma.promoCode.update({
        where: { uuid },
        data: { name, code, discount, startDate, endDate },
      });
      res.json({ promoCode, message: "Promo code successfully updated." });
    } catch (error) {
      console.error(error);
      if (error.code === "P2002" && error.meta?.target?.includes("name")) {
        res
          .status(409)
          .json({ error: "This name is already used by another promo code." });
      } else if (
        error.code === "P2002" &&
        error.meta?.target?.includes("code")
      ) {
        res
          .status(409)
          .json({ error: "This code is already used by another promo code." });
      }
      res
        .status(500)
        .json({ error: "An error occurred while updating the promo code." });
    }
  },

  deletePromoCode: async (req, res) => {
    // Supprimez un Code Promo
    try {
      const { uuid } = req.params;
      const promoCodeUuid = await prisma.promoCode.findUnique({
        where: { uuid },
      });
      if (!promoCodeUuid) {
        return res.status(404).json({ error: "Promo code not found." });
      }
      const promoCode = await prisma.promoCode.delete({ where: { uuid } });
      res.json({ promoCode, message: "Promo code successfully deleted." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the promo code." });
    }
  },
};

module.exports = PromoCodeController;
