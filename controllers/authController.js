import { User } from "../models/user.js";

export const register = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      email: newUser.email,
      name: newUser.name,
    });
  } catch (error) {
    next(error);
  }
};
