import { FastifyInstance } from "fastify";

import { verifyJwt } from "../../middlewares/verity-jwt";

import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { register } from "./register";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);

  app.post("/sessions", authenticate);

  app.patch('/token/refresh', refresh);



  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
