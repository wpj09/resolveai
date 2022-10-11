"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const AuthController_1 = require("./app/controllers/AuthController");
const ProblemController_1 = require("./app/controllers/ProblemController");
const UserController_1 = require("./app/controllers/UserController");
const auth_1 = require("./middlewares/auth");
const userController = new UserController_1.UserController();
const problemController = new ProblemController_1.ProblemController();
const authController = new AuthController_1.AuthController();
const multer_2 = __importDefault(require("./config/multer"));
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default);
router.post("/user", userController.store);
router.get("/users", auth_1.authMiddleware, userController.index);
router.get("/user/:id", auth_1.authMiddleware, userController.show);
router.put("/user/:id", auth_1.authMiddleware, userController.update);
router.get("/", (req, res) => {
    return res.json({
        rota_acessivel: "/problems",
    });
});
router.post("/authenticate", authController.authenticate);
router.post("/problem/user/:id", auth_1.authMiddleware, upload.array("images"), problemController.store);
router.put("/problem/:id", auth_1.authMiddleware, problemController.update);
router.get("/problems/user/:id/:status", auth_1.authMiddleware, problemController.show);
router.get("/problem/:id", auth_1.authMiddleware, problemController.getProblem);
router.get("/problems", problemController.index);
router.delete("/problem/:id", auth_1.authMiddleware, problemController.delete);
