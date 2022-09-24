"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemController = void 0;
const client_1 = require("../../database/client");
class ProblemController {
    async index(req, res) {
        try {
            const problems = await client_1.prisma.problem.findMany({
                include: {
                    entity: true,
                    user: true,
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
            const { title, description, latitude, longitude, status, photos, entityId, userId, } = req.body;
            const problem = await client_1.prisma.problem.create({
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
        }
        catch (error) {
            return res.status(400).json(error);
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { title, description, latitude, longitude, status, photos, entityId, userId, } = req.body;
            const problem = await client_1.prisma.problem.update({
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
        }
        catch (error) {
            return res.status(400).json(error);
        }
    }
}
exports.ProblemController = ProblemController;
