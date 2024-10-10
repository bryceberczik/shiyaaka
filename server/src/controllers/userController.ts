import { User } from "../models/user.js";
import { Response, Request } from "express";

export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] }
      });
        res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

export const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user)
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, password } = req.body;
    try {
      const user = await User.findByPk(id);
      if (user) {
        user.email = email;
        user.password = password;
        await user.save();
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
  

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        res.json({ message: 'User deleted' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };