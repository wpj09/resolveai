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

    const token = sign(
      { id: user.id },
      "5ce871d20f253fce72e833df98a8924c08854cd3",
      {
        algorithm: "HS256",
        expiresIn: "1d",
      }
    );

    const { id } = user;

    return res.json({ user: { id, email }, token });
  }
}
