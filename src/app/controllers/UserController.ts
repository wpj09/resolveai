import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { prisma } from "../../database/client";

export class UserController {
  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
          name: true,
          email: true,
          address: true,
        },
      });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async index(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
        },
      });

      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async store(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const password_hash = await bcrypt.hash(password, 8);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: password_hash,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
