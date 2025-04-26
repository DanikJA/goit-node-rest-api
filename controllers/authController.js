import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
export const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "This email is already in use");
    }
    const newUser = await User.create(req.body);
    res.status(201).json({
      email: newUser.email,
      name: newUser.name,
    });
  } catch (error) {
    next(error);
  }
};
