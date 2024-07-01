import { faker } from "@faker-js/faker";
import { Gender } from "@prisma/client";
import prismaClient from "../../../utils/prisma";
import {hashSync, genSaltSync} from "bcrypt";


export async function seedUsers(num: number) {
  console.log("-----------------------------Seeding Users-----------------------------");

  for (let i = 0; i < num; i++) {
    await prismaClient.user.create({
      data: createRandomUser(),
    });
  }

  console.log(`Added ${num} users..`);
}



function createRandomUser() {
  const gender = faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE]);
  const firstName = faker.person.firstName(gender.toLowerCase() as "male" | "female");
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
    joinDate: faker.date.recent({ days: 365, refDate: new Date()}),
    profilePicture: faker.image.avatar(),
    isAdmin: faker.helpers.arrayElement([true, false]),
  };
}