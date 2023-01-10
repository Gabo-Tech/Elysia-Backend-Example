// routes/user.ts

import { Elysia } from "elysia";
// import { validateBody, validateParams } from "../middlewares/validate";
// import auth from "../middlewares/auth";
import {
  getAllUser,
  getByIdUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

export const userRoutes = (app: Elysia) => app.get('/users', () => getAllUser)
  .get('/users/:id', () => getByIdUser)
  .post('/users/', () => createUser)
  .put('/users/:id', () => updateUser)
  .delete('/users/:id', () => deleteUser);


