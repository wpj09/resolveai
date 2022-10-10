"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcryptjs_1 = __importStar(require("bcryptjs"));
const client_1 = require("../../database/client");
class UserController {
    async show(req, res) {
        try {
            const { id } = req.params;
            const user = await client_1.prisma.user.findUnique({
                where: { id: Number(id) },
                select: {
                    name: true,
                    email: true,
                    address: true,
                },
            });
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(400).json(error);
        }
    }
    async index(req, res) {
        try {
            const users = await client_1.prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
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
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });
            return res.status(201).json(user);
        }
        catch (error) {
            return res.status(400).json(error);
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;
            const user = await client_1.prisma.user.findUnique({ where: { id: Number(id) } });
            if (!user) {
                return res.status(404).json({ error: "user not found" });
            }
            const isPasswordValid = await (0, bcryptjs_1.compare)(password, user.password);
            if (!isPasswordValid) {
                return res.json({ error: "password invalid" });
            }
            const userUpdated = await client_1.prisma.user.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name,
                    email,
                },
            });
            return res.status(200).json(userUpdated);
        }
        catch (error) {
            return res.status(400).json("Algo deu errado! ");
        }
    }
}
exports.UserController = UserController;
