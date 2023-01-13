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
      const { status, id } = req.params;
      const problems = await prisma.problem.findMany({
        where: {
          status,
          userId: Number(id),
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

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }

      const images = requestImages.map((image) => {
        return {
          path: `${process.env.UPLOAD_URL}/${image.filename}`,
        };
      });

      const problem = await prisma.problem.create({
        data: {
          title,
          description,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
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
      const { status, solution, entity } = req.body;

      const problem = await prisma.problem.findUnique({
        where: { id: Number(id) },
      });

      if (!problem) {
        return res.status(404).json({ error: "problem not found" });
      }

      const problemUpdated = await prisma.problem.update({
        where: { id: Number(id) },
        data: {
          status,
          solution,
          entity
        },
      });
      return res.status(200).json(problemUpdated);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getProblem(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const problem = await prisma.problem.findUnique({
        where: { id: Number(id) },
      });

      if (!problem) {
        return res.status(404).json({ error: "problem not found" });
      }

      const searchProblem = await prisma.problem.findUnique({
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

      return res.status(200).json(searchProblem);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const problem = await prisma.problem.findUnique({
        where: { id: Number(id) },
      });

      if (!problem) {
        return res.status(404).json({ error: "problem not found" });
      }

      await prisma.problem.delete({
        where: { id: Number(id) },
      });
      return res.status(204).json({ ok: true });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
