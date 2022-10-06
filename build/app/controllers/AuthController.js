"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcryptjs_1 = require("bcryptjs");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = require("jsonwebtoken");
dotenv_1.default.config();
const authConfig_1 = __importDefault(require("../../config/authConfig"));
const client_1 = require("../../database/client");
class AuthController {
    async authenticate(req, res) {
        const { email, password } = req.body;
        const user = await client_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.json({ error: "user not found" });
        }
        const isPasswordValid = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isPasswordValid) {
            return res.json({ error: "password invalid" });
        }
        if (authConfig_1.default.secret === null || authConfig_1.default.secret === undefined) {
            return res.status(401).json({ error: "Secret not provided" });
        }
        const token = (0, jsonwebtoken_1.sign)({ id: user.id }, authConfig_1.default.secret, {
            expiresIn: authConfig_1.default.expiresIn,
        });
        const { id } = user;
        return res.json({ user: { id, email }, token });
    }
}
exports.AuthController = AuthController;
