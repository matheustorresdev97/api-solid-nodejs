import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repositories";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repositories";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetUseCase } from "./create-pet-use-case";
import { makeOrg } from "@/tests/factories/make-org-factory";
import { makePet } from "@/tests/factories/make-pet.factory";
import { OrgNotFoundError } from "./errors/org-not-found-error";

describe("Create Pet Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let petsRepository: InMemoryPetsRepository;
  let sut: CreatePetUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new CreatePetUseCase(orgsRepository, petsRepository);
  });

  it("should be able to create a new pet", async () => {
    const org = await orgsRepository.create(makeOrg());
    const { pet } = await sut.execute(makePet({ org_id: org.id }));

    expect(petsRepository.items).toHaveLength(1);
    expect(pet.id).toEqual(expect.any(String));
  });

  it("should not be able to create a new pet with a non-existing org", async () => {
    const pet = makePet();

    await petsRepository.create(pet);

    await expect(sut.execute(pet)).rejects.toBeInstanceOf(OrgNotFoundError);
  });
});
