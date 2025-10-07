import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { createPetController } from "./create-pet.controller";
import { searchPetsController } from "./search-pets.controller";
import { getPetController } from "./get-pet.controller";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/orgs/pets", { onRequest: [verifyJwt] }, createPetController);
  app.get("/orgs/pets", searchPetsController);
  app.get("/orgs/pets/:id", getPetController);
}
