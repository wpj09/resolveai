import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authorization.split(" ");

  const secret = process.env.JWT_SECRET_KEY;

  if (secret === null || secret === undefined) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decoded = verify(token, "5ce871d20f253fce72e833df98a8924c08854cd3");
    const { id } = decoded as TokenPayload;

    req.userId = id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }
}
