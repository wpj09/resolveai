import { Request, Response } from "express";
import { prisma } from "../../database/client";

export class ProblemController {
  async index(req: Request, res: Response) {
    try {
      const problems = await prisma.problem.findMany({
        include: {
          Image: true,
        },
      });
      return res.status(200).json(problems);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async show(req: Request, res: Response) {
    try {
      const { status } = req.params;
      const problems = await prisma.problem.findMany({
        where: {
          status,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          Image: {
            select: {
              id: true,
              path: true,
            },
          },
        },
      });
      return res.status(200).json(problems);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async store(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, latitude, longitude, status } = req.body;
      const requestImages = req.files as Express.Multer.File[];

      const images = requestImages.map((image) => {
        return { path: image.filename };
      });

      const problem = await prisma.problem.create({
        data: {
          title,
          description,
          latitude: Number(latitude),
          longitude: Number(longitude),
          status,
          userId: Number(id),
          Image: {
            create: images,
          },
        },
      });
      return res.status(201).json(problem);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status, solution } = req.body;

      const problem = await prisma.problem.update({
        where: { id: Number(id) },
        data: {
          status,
          solution,
        },
      });
      return res.status(200).json(problem);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getProblem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const problem = await prisma.problem.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          Image: {
            select: {
              id: true,
              path: true,
            },
          },
        },
      });
      return res.status(200).json(problem);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
