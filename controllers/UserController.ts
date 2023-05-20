import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UserController = {
  getAllUsers: async (req: Request, res: Response) => {
    // Récupérez tous les utilisateurs dans la base de données
    try {
        const users = await prisma.user.findMany();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving users.' });
      }
  },

  getUserById: async (req: Request, res: Response) => {
    // Récupérez un utilisateur par son ID
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user) {
          return res.status(404).json({ error: 'User not found.' });
        }
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the user.' });
      }
  },

  createUser: async (req: Request, res: Response) => {
    // Créez un utilisateur
    try {
        const users = await prisma.user.findMany();
        const { name, pseudo, email, password } = req.body;
        if (users.length === 0){
            const isAdmin = true;
            const user = await prisma.user.create({ data: { name, pseudo, email, password, isAdmin } });
            res.json({user, message: 'User (Admin) successfully created.'});
        }else{
            const user = await prisma.user.create({ data: { name, pseudo, email, password } });
            res.json({user, message: 'User successfully created.'});
        }
      } catch (error: any) {
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            res.status(400).json({ error: 'This email is already used by another user.' });
          } else if (error.code === 'P2002' && error.meta?.target?.includes('pseudo')) {
            res.status(400).json({ error: 'This pseudo is already used by another user.' });
          } else {
            res.status(500).json({ error: 'An error occurred while creating the user.' });
          }
      }
  },

  updateUser: async (req: Request, res: Response) => {
    // Mettez à jour un utilisateur
  },

  deleteUser: async (req: Request, res: Response) => {
    // Supprimez un utilisateur
  },
};

export default UserController;
