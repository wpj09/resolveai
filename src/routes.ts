import { Router } from "express";

const router = Router();

router.get("/create-user", (req, res) => {
  return res.json({
    hello: "world",
  });
});

export { router };
