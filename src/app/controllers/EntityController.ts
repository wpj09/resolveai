import { Request, Response } from "express";
import { prisma } from "../../database/client";

export class EntityController {
  async index(req: Request, res: Response) {
    try {
      const entity = await prisma.entity.findMany({
        include: {
          address: true,
        },
      });
      return res.status(200).json(entity);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async store(req: Request, res: Response) {
    try {
      const { name, cnpj, description, phone, email } = req.body;
      const entity = await prisma.entity.create({
        data: {
          name,
          cnpj,
          description,
          phone,
          email,
        },
      });
      return res.status(201).json(entity);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
