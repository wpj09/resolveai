"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemController = void 0;
const client_1 = require("../../database/client");
class ProblemController {
    async index(req, res) {
        try {
            const problems = await client_1.prisma.problem.findMany({
                include: {
                    Image: true,
                },
            });
            return res.status(200).json(problems);
        }
        catch (error) {
            return res.status(400).json(error);
        }
    }
    async show(req, res) {
        try {
            const { status } = req.params;
            const problems = await client_1.prisma.problem.findMany({
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
        }
        catch (error) {
            return res.status(400).json(error);
        }
    }
    async store(req, res) {
        try {
            const { id } = req.params;
            const { title, description, latitude, longitude, status } = req.body;
            const requestImages = req.files;
            const images = requestImages.map((image) => {
                return { path: image.filename };
            });
            const problem = await client_1.prisma.problem.create({
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
        }
        catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { status, solution } = req.body;
            const problem = await client_1.prisma.problem.update({
                where: { id: Number(id) },
                data: {
                    status,
                    solution,
                },
            });
            return res.status(200).json(problem);
        }
        catch (error) {
            return res.status(400).json(error);
        }
    }
    async getProblem(req, res) {
        try {
            const { id } = req.params;
            const problem = await client_1.prisma.problem.findUnique({
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
        }
        catch (error) {
            return res.status(400).json(error);
        }
    }
}
exports.ProblemController = ProblemController;
