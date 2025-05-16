import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs/promises";
import { Jimp } from "jimp";

dotenv.config();
const { SECRET_KEY } = process.env;

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashPassword,
    });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

export const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
};

const avatarsDir = path.resolve("public", "avatars");

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Bad Request" });
    }

    const { _id } = req.user;
    const { path: tempUploadPath, originalname } = req.file;

    const filename = `${_id}_${originalname}`;
    const finalPath = path.join(avatarsDir, filename);

    const image = await Jimp.read(tempUploadPath);

    image.resize({ w: 250, h: 250 });

    await image.write(finalPath);
    await fs.unlink(tempUploadPath);

    const avatarURL = `/avatars/${filename}`;
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};
