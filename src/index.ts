import { Elysia, t } from 'elysia'
import { compile } from '@elysiajs/trpc'
import { websocket } from '@elysiajs/websocket'
// import mongoose from "mongoose";
// import helmet from "helmet";
// import bodyParser from "body-parser";
import { cors } from '@elysiajs/cors'
import * as hpp from 'hpp';
import { initTRPC } from '@trpc/server'
import authMiddleware from "./middlewares/auth";
import errorHandler from "./middlewares/error-handler";
import dotenv from 'dotenv';
// Import routes
import { userRoutes } from "./routes/user";
// Load environment variables from .env file
dotenv.config();



const PORT = process.env.PORT || 4040;
const dbConnection: string = process.env.MONGO_URI || "connexion string";
const r = initTRPC.create()


const router = r.router({
  greet: r.procedure
    .input(compile(t.String()))
    .query((input: any) => input)
})

export type Router = typeof router;
// Connect to the database
// mongoose.connect(dbConnection, { useNewUrlParser: true });

const app = new Elysia().trpc(router);
// Set up middlewares
app.use(websocket());
app.use(cors());
// app.use(helmet());
// app.use(bodyParser.json());
app.use(hpp());
app.use(authMiddleware);
app.use(errorHandler);


// Set up routes
app.use(userRoutes);

// Set up tRPC
app.trpc(router)
// Start the server
app.listen(PORT, () => {
  console.info(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
});
