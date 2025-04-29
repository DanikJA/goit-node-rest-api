import express from "express";
import isValidId from "../middleware.js";
import schemas from "../models/user.js";
import validateBody from "../helpers/validateBody.js";
import { register, login } from "../controllers/authController.js";

const router = express.Router();
router.post("/register", validateBody(schemas.registerSchema), register);
router.post("/login", validateBody(schemas.loginSchema), login);

export default router;
