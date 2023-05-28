const { MailNew } = require('./ContactController');
const { Request, Response } = require('express');
const { PrismaClient } = require('@prisma/client');
const { hash } = require('argon2');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

const UserController = {
  getAllUsers: async (req, res) => {
    // Récupérez tous les utilisateurs dans la base de données
    try {
        const users = await prisma.user.findMany();
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving users.' });
      }
  },

  getUserByUuid: async (req, res) => {
    // Récupérez un utilisateur par son UUID
    try {
      const { uuid } = req.params;
      const user = await prisma.user.findUnique({ where: { uuid } });
        if (!user) {
          return res.status(404).json({ error: 'User not found.' });
        }
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the user.' });
      }
  },

  createUser: async (req, res) => {
    // Créez un utilisateur
    try {
        const users = await prisma.user.findMany();
        const { name, pseudo, email, password } = req.body;
        const hashedPassword = await hash(password);
        const uuid = uuidv4();
        if (users.length === 0){
            const isAdmin = true;
            const user = await prisma.user.create({ data: { name, pseudo, email, password:hashedPassword, uuid, isAdmin } });
            const mail = await MailNew(user);
            res.json({user, message: 'User (Admin) successfully created.'});
        }else{
            const user = await prisma.user.create({ data: { name, pseudo, email, password:hashedPassword, uuid } });
            res.json({user, message: 'User successfully created.'});
        }
      } catch (error) {
        console.error(error);
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            res.status(400).json({ error: 'This email is already used by another user.' });
          } else if (error.code === 'P2002' && error.meta?.target?.includes('pseudo')) {
            res.status(400).json({ error: 'This pseudo is already used by another user.' });
          } else {
            res.status(500).json({ error: 'An error occurred while creating the user.' });
          }
      }
  },

  updateUser: async (req, res) => {
    // Mettez à jour un utilisateur
    try {
        const { uuid } = req.params;
        const { name, pseudo, email, password, isAdmin } = req.body;
        const hashedPassword = await hash(password);
        const userUuid = await prisma.user.findUnique({ where: { uuid } });
        if (!userUuid) {
          return res.status(404).json({ error: 'User not found.' });
        }
        const user = await prisma.user.update({
          where: { uuid },
          data: { name, pseudo, email, password:hashedPassword, isAdmin },
        });
        res.json({user, message: 'User updated successfully.' });
      }catch (error) {
        console.error(error);
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            res.status(400).json({ error: 'This email is already used by another user.' });
          } else if (error.code === 'P2002' && error.meta?.target?.includes('pseudo')) {
            res.status(400).json({ error: 'This pseudo is already used by another user.' });
          } else {
            res.status(500).json({ error: 'An error occurred while updating the user.' });
          }
      }
  },

  deleteUser: async (req, res) => {
    // Supprimez un utilisateur
    try {
        const { uuid } = req.params;
        const userDb = await prisma.user.findUnique({ where: { uuid } });
        if (!userDb) {
            return res.status(404).json({ error: 'User not found.' });
        }else if (userDb.isAdmin){
            const userAdmin = await prisma.user.findMany({where: {isAdmin: true}});
            if (userAdmin.length === 1){
                return res.status(400).json({ error: 'You cannot delete the last admin user.' });
            }else{
                const user = await prisma.user.delete({ where: { uuid } });
                res.json({user, message: 'User (admin) deleted successfully.' });
            }
        }else{
            const user = await prisma.user.delete({ where: { uuid } });
            res.json({user, message: 'User deleted successfully.' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the user.' });
      }
  },
};

module.exports = UserController;
