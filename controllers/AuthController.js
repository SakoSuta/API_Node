const { Request, Response } = require("express");
const { GenerateToken } = require("./SharedController");
const { PrismaClient } = require("@prisma/client");
const { hash, verify } = require("argon2");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

const AuthController = {
  Login: async (req, res) => {
    // Connection l'utilisateur
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findFirst({ where: { email: { equals: email } } });
      if (!user) {
        return res.status(401).json({ error: "User Invalid." });
      }
      const passwordMatch = await verify(user.password, password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Password Invalid." });
      }

      const token = await GenerateToken(user);
      
      console.log(token);
      return res
        .status(200)
        .json({ user, token, message: "Authentication successful." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while connected the user." });
    }
  },
  Logout: async (res) => {
    // Déconnectez l'utilisateur
    try {
      localStorage.removeItem("token");
      return res.status(204).json({ message: "Logout successful." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the user." });
    }
  },
  InfoUser: async (req, res) => {
    // Récupérez les informations de l'utilisateur
    try {
      const userId = req.user.UserId;
      const user = await prisma.user.findUnique({ 
        where: { id: userId },
        include: { subscriptions: {
          include: {
            plan: true 
            }
          }
        }, 
      });
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the user." });
    }
  },
  UpUser: async (req, res) => {
    // Récupérez les informations de l'utilisateur
    try {
      const { uuid } = req.params;
      const { name, pseudo, email } = req.body;

      const userUuid = await prisma.user.findFirst({ where: { uuid } });
      if (!userUuid) {
        return res.status(404).json({ error: "User not found." });
      }

      // const userEmail = await prisma.user.findFirst({ where: { email: email } });
      // console.log(userEmail);
      
      const user = await prisma.user.update({
        where: { uuid: userUuid.uuid },
        data: { name, pseudo, email },
      });
      res.json({ user, message: "User updated successfully." });

    } catch (error) {
      console.error(error);
      if (error.code === "P2002"){
        return res
          .status(409)
          .json({ error: "This email or pseudo is already used by another user." });
      }
      return res
        .status(500)
        .json({ error: "An error occurred while updating the user." });
    }
  },
  Register: async (req, res) => {
    // Créez un utilisateur
    try {
      const { name, pseudo, email, password } = req.body;
      const hashedPassword = await hash(password);
      const uuid = uuidv4();
      const user = await prisma.user.create({
        data: {
          uuid,
          name,
          pseudo,
          email,
          password: hashedPassword,
        },
      });
      const token = await GenerateToken(user);
      
      console.log(token);
      return res
        .status(201)
        .json({ user, token, message: "User created successfully." });
    } catch (error) {
      console.error(error);
      if (error.code === "P2002") {
        res
          .status(409)
          .json({ error: "This email is already used by another user." });
      } else {
        res
          .status(500)
          .json({ error: "An error occurred while creating the user." });
      }
    }
  }
};


module.exports = AuthController;
