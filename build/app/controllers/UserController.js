"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const client_1 = require("../../database/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserController {
    async index(req, res) {
        try {
            const users = await client_1.prisma.user.findMany({
                include: {
                    address: true,
                },
            });
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(400).json(error);
        }
    }
    async store(req, res) {
        try {
            const { name, email, password } = req.body;
            const password_hash = await bcryptjs_1.default.hash(password, 8);
            const user = await client_1.prisma.user.create({
                data: {
                    name,
                    email,
                    password: password_hash,
                },
            });
            return res.status(201).json(user);
        }
        catch (error) {
            return res.status(400).json(error);
        }
    }
}
exports.UserController = UserController;
