import express from "express";
import authenticate from "../middlewares/authenticate.js";
import schemas from "../models/user.js";
import validateBody from "../helpers/validateBody.js";
import upload from "../middlewares/upload.js";
import {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/register", validateBody(schemas.registerSchema), register);
router.post("/login", validateBody(schemas.loginSchema), login);
router.get("/current", authenticate, getCurrent);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);
router.post("/logout", authenticate, logout);
export default router;
