import { faker } from "@faker-js/faker";
import { Gender } from "../../../src/modules/users/user-gender.enum";
import { signUp } from "../../../src/modules/auth/auth.service";
export async function seedUsers(num: number) {
  console.log(
    "-----------------------------Seeding Users-----------------------------"
  );

  for (let i = 0; i < num; i++) {
    signUp(createRandomUser(i == 0));
  }

  console.log(`Added ${num} users..`);
}

function createRandomUser(test?: boolean) {
  const gender = faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE]);
  const firstName = test
    ? "Test"
    : faker.person.firstName(gender.toLowerCase() as "male" | "female");
  const lastName = test ? "User" : faker.person.lastName();
  const email = test
    ? "test@test.com"
    : faker.internet.email({ firstName, lastName });
  const username = test
    ? "TestUsername"
    : faker.internet.userName({ firstName, lastName });

  return {
    name: `${firstName.toLowerCase()} ${lastName.toLowerCase()}`,
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: test ? "Password$2001" : "password",
    country: test ? "Egypt" : faker.location.country(),
    gender,
    birthDate: faker.date.birthdate(),
    joinDate: faker.date.recent({ days: 365, refDate: new Date() }),
    profilePicture: test
      ? "https://avatars.githubusercontent.com/u/33458793"
      : faker.image.avatar(),
    isAdmin: test ? true : faker.helpers.arrayElement([true, false]),
  };
}
