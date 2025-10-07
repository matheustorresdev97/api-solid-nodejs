import { FastifyInstance } from "fastify";

import { createOrgController } from "@/http/controllers/orgs/create-org.controller";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrgController);
}
