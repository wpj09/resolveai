import { Request, Response, Router } from "express";
import multer from "multer";

import { AuthController } from "./app/controllers/AuthController";
import { ProblemController } from "./app/controllers/ProblemController";
import { UserController } from "./app/controllers/UserController";
import { authMiddleware } from "./middlewares/auth";

const userController = new UserController();
const problemController = new ProblemController();
const authController = new AuthController();

import uploadConfig from "./config/multer";

const router = Router();
const upload = multer(uploadConfig);

router.post("/user", userController.store);
router.get("/user", userController.index);

router.get("/", (req: Request, res: Response) => {
  return res.json({
    rota_acessivel: "/problems",
  });
});

router.post("/authenticate", authController.authenticate);

router.post(
  "/problem/user/:id",
  authMiddleware,
  upload.array("images"),
  problemController.store
);

router.put("/problem/:id", problemController.update);
router.get("/problems/:status", problemController.show);
router.get("/problem/:id", problemController.getProblem);
router.get("/problems", problemController.index);

export { router };
