import { Request, Response } from "express";
import { prisma } from "../../database/client";
import bcrypt from "bcryptjs";

export class UserController {
  async index(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async store(req: Request, res: Response) {
    try {
      const { name, email, endereco, password } = req.body;

      const password_hash = await bcrypt.hash(password, 8);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          endereco,
          password: password_hash,
        },
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
