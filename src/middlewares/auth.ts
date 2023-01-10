// middlewares/auth.ts

import Elysia from "elysia";
import { verify } from "jsonwebtoken";
import * as argon2 from "argon2";
import User from "../models/User";

const auth = (app: Elysia) => app.use(async (req, res, next) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    // Get the token from the header
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("No token");
    }

    // Verify the token
    const decoded = verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error("Invalid token");
    }

    // Find the user
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the password has been changed
    if (!(await argon2.verify(token, user.password))) {
      throw new Error("Invalid token");
    }

    // Set the user in the request object
    req.user = user;

    // Call the next middleware
    next();
  } catch (err) {
    res.status(401).send({ errors: ["Unauthorized"] });
  }
});

export default auth;
