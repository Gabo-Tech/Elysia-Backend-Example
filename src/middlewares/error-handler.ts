// middlewares/error-handler.ts

import { Elysia } from "elysia";

const errorHandler = (app: Elysia) => app.use((err, req, res, next) => {
  // Log the error to the console
  console.error(err);

  if (err.name === "ValidationError") {
    // Return a response with a status code of 400 (Bad Request) and the validation errors
    return res.status(400).send({ errors: err.errors });
  }
  if (err.name === "UnauthorizedError") {
    // Return a response with a status code of 401 (Unauthorized) and an error message
    return res.status(401).send({ errors: ["Invalid token"] });
  }
  if (err.name === "NotFoundError") {
    // Return a response with a status code of 404 (Not Found) and an error message
    return res.status(404).send({ errors: [err.message] });
  }

  // Return a response with a status code of 500 (Internal Server Error) and an error message
  res.status(500).send({ errors: ["Server error"] });
});

export default errorHandler;
