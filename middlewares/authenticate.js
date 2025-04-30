import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;
import { User } from "../models/user.js";

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      return next(HttpError(401));
    }
    next();
  } catch {
    next(HttpError(401));
  }
};

export default authenticate;
