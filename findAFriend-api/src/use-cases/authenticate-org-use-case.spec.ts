import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repositories";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateOrgUseCase } from "./authenticate-org-use-case";
import { makeOrg } from "@/tests/factories/make-org-factory";
import { hash } from "bcrypt";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Org Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let sut: AuthenticateOrgUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateOrgUseCase(orgsRepository);
  });

  it("should be able to authenticate an org", async () => {
    const password = "123456";

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 8) })
    );

    const { org: authenticatedOrg } = await sut.execute({
      email: org.email,
      password,
    });

    expect(authenticatedOrg).toEqual(org);
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const password = "123456";

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 8) })
    );

    await expect(() =>
      sut.execute({
        email: org.email,
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
