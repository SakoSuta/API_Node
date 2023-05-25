import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

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
        const hashedPassword = await hash(password);
        if (users.length === 0){
            const isAdmin = true;
            const user = await prisma.user.create({ data: { name, pseudo, email, password:hashedPassword, isAdmin } });
            res.json({user, message: 'User (Admin) successfully created.'});
        }else{
            const user = await prisma.user.create({ data: { name, pseudo, email, password:hashedPassword } });
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
    try {
        const { id } = req.params;
        const { name, pseudo, email, password, isAdmin } = req.body;
        const hashedPassword = await hash(password);
        const userId = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (!userId) {
          return res.status(404).json({ error: 'User not found.' });
        }
        const user = await prisma.user.update({
          where: { id: Number(id) },
          data: { name, pseudo, email, password:hashedPassword, isAdmin },
        });
        res.json({user, message: 'User updated successfully.' });
      }catch (error: any) {
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            res.status(400).json({ error: 'This email is already used by another user.' });
          } else if (error.code === 'P2002' && error.meta?.target?.includes('pseudo')) {
            res.status(400).json({ error: 'This pseudo is already used by another user.' });
          } else {
            res.status(500).json({ error: 'An error occurred while updating the user.' });
          }
      }
  },

  deleteUser: async (req: Request, res: Response) => {
    // Supprimez un utilisateur
    try {
        const { id } = req.params;
        const userDb = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (!userDb) {
            return res.status(404).json({ error: 'User not found.' });
        }else if (userDb.isAdmin){
            const userAdmin = await prisma.user.findMany({where: {isAdmin: true}});
            if (userAdmin.length === 1){
                return res.status(400).json({ error: 'You cannot delete the last admin user.' });
            }else{
                const user = await prisma.user.delete({ where: { id: Number(id) } });
                res.json({user, message: 'User (admin) deleted successfully.' });
            }
        }else{
            const user = await prisma.user.delete({ where: { id: Number(id) } });
            res.json({user, message: 'User deleted successfully.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the user.' });
      }
  },
};

export default UserController;
