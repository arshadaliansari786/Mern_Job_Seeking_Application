import { User } from "../models/users.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";


export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  console.log(process.env.JWT_SECRET_KEY)
  const { token } = req.cookies;
  console.log(token)
  console.log(process.env.JWT_SECRET_KEY)
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
console.log(decoded)
  req.user = await User.findById(decoded.id);

  next();
});
