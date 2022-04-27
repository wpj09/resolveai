import { Router } from "express";

import { UserController } from "./app/controllers/UserController";
import { EntityController } from "./app/controllers/EntityController";
import { ProblemController } from "./app/controllers/ProblemController";

const userController = new UserController();
const entityController = new EntityController();
const problemController = new ProblemController();

const router = Router();

router.post("/create-user", userController.store);
router.get("/list-user", userController.index);

router.post("/create-entity", entityController.store);
router.get("/list-entity", entityController.index);

router.post("/create-problem", problemController.store);
router.get("/list-problem", problemController.index);

export { router };
