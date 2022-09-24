"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const ProblemController_1 = require("./app/controllers/ProblemController");
const UserController_1 = require("./app/controllers/UserController");
const userController = new UserController_1.UserController();
const problemController = new ProblemController_1.ProblemController();
const router = (0, express_1.Router)();
exports.router = router;
router.post("/user", userController.store);
router.get("/user", userController.index);
router.get("/", (req, res) => {
    return res.json({
        rota_acessivel: "/problems",
    });
});
router.post("/problem", problemController.store);
router.get("/problems", problemController.index);
