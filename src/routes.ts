import { Router } from "express";

import { ProblemController } from "./app/controllers/ProblemController";
import { UserController } from "./app/controllers/UserController";

const userController = new UserController();
const problemController = new ProblemController();

const router = Router();

router.post("/user", userController.store);
router.get("/user", userController.index);

router.post("/problem", problemController.store);
router.get("/problems", problemController.index);

export { router };
