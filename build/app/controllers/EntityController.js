"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityController = void 0;
const client_1 = require("../../database/client");
class EntityController {
    async index(req, res) {
        try {
            const entity = await client_1.prisma.entity.findMany({
                include: {
                    address: true,
                },
            });
            return res.status(200).json(entity);
        }
        catch (error) {
            return res.status(400).json(error);
        }
    }
    async store(req, res) {
        try {
            const { name, cnpj, description, phone, email } = req.body;
            const entity = await client_1.prisma.entity.create({
                data: {
                    name,
                    cnpj,
                    description,
                    phone,
                    email,
                },
            });
            return res.status(201).json(entity);
        }
        catch (error) {
            return res.status(400).json(error);
        }
    }
}
exports.EntityController = EntityController;
