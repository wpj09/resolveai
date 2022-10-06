import { compare } from "bcryptjs";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

dotenv.config();

import authConfig from "../../config/authConfig";

import { prisma } from "../../database/client";

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.json({ error: "user not found" });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ error: "password invalid" });
    }

    if (authConfig.secret === null || authConfig.secret === undefined) {
      return res.status(401).json({ error: "Secret not provided" });
    }

    const token = sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const { id } = user;

    return res.json({ user: { id, email }, token });
  }
}
