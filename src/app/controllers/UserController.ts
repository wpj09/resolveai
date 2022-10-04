import bcrypt, { compare } from "bcryptjs";
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

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        return res.json({ error: "password invalid" });
      }

      const userUpdated = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          email,
        },
      });

      return res.status(200).json(userUpdated);
    } catch (error) {
      return res.status(400).json("Algo deu errado! ");
    }
  }
}
