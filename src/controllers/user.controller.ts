// controllers/user.ts
import { hash } from "argon2";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user.service";

export const getAllUser = async (req, res) => {
  try {
    const users = await UserService.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({ errors: ["Server error"] });
  }
};

export const getByIdUser = async (req, res) => {
  try {
    const user: any = await UserService.findById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.send(user);
  } catch (err: any) {
    res.status(500).send({ errors: [err.message] });
  }
};

export const getByEmailUser = async (req, res) => {
  try {
    const user: any = await UserService.findByEmail(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.send(user);
  } catch (err: any) {
    res.status(500).send({ errors: [err.message] });
  }
};

export const createUser = async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await hash(req.body.password);

    // Create the user
    const user: any = {
      name: req.body.name,
      username: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    await UserService.create(user);

    // Generate the JWT
    const token = jwt.sign({ _id: user?._id }, process.env.JWT_SECRET);

    // Send the response
    res.send({ token });
  } catch (err) {
    res.status(500).send({ errors: ["Server error"] });
  }
};

export const updateUser = async (req, res) => {
  try {
    // Find the user
    const user: any = await UserService.findById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = { ...user };
    // Hash the new password if it was provided
    if (req.body.password) {
      user.password = await hash(req.body.password);
    }

    // Update the user
    updatedUser.name = req.body.name;
    updatedUser.email = req.body.email;
    updatedUser.username = req.body.username;
    await UserService.update(user, updatedUser);

    res.send(user);
  } catch (err: any) {
    res.status(500).send({ errors: [err.message] });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user: any = await UserService.findById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }

    if (req.user._id.toString() !== user._id.toString()) {
      throw new Error("Unauthorized");
    }

    await UserService.delete(user);

    res.send({ message: "User deleted successfully" });
  } catch (err: any) {
    res.status(401).send({ errors: [err.message] });
  }
};
