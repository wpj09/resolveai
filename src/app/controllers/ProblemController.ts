import { Request, Response } from "express";
import { prisma } from "../../database/client";

export class ProblemController {
  async index(req: Request, res: Response) {
    try {
      const problems = await prisma.problem.findMany({
        include: {
          entity: true,
          user: true,
        },
      });
      return res.status(200).json(problems);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async store(req: Request, res: Response) {
    try {
      const {
        title,
        description,
        latitude,
        longitude,
        status,
        photos,
        entityId,
        userId,
      } = req.body;
      const problem = await prisma.problem.create({
        data: {
          title,
          description,
          latitude,
          longitude,
          status,
          photos,
          entityId,
          userId,
        },
      });
      return res.status(201).json(problem);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        latitude,
        longitude,
        status,
        photos,
        entityId,
        userId,
      } = req.body;

      const problem = await prisma.problem.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          latitude,
          longitude,
          status,
          photos,
          entityId,
          userId,
        },
      });
      return res.status(200).json(problem);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
