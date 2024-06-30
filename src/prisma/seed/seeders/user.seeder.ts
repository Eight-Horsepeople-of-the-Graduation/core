import { faker } from "@faker-js/faker";
import { Gender } from "@prisma/client";
import prismaClient from "../../../utils/prisma";
import {hashSync, genSaltSync} from "bcrypt";

function createRandomUser() {
  const gender = faker.helpers.arrayElement([Gender.male, Gender.female]);
  const firstName = faker.person.firstName(gender);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const username = faker.internet.userName({ firstName, lastName });

  return {
    username,
    email,
    password: hashSync("password", genSaltSync(10)),
    country: faker.location.country(),
    gender,
    birthDate: faker.date.birthdate(),
    joinDate: faker.date.recent(),
    profilePicture: faker.image.avatar(),
    isAdmin: faker.helpers.arrayElement([true, false]),
  };
}

export async function seedUsers(num: number) {
  console.log("-----------------------------Seeding users-----------------------------");
  await prismaClient.user.deleteMany();
  console.log("Deleted records in Users table...");

  await prismaClient.$queryRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
  console.log("Reset AUTO_INCREMENT in Users table...");

  for (let i = 0; i < num; i++) {
    await prismaClient.user.create({
      data: createRandomUser(),
    });
  }

  console.log(`Added ${num} user data..`);
}
