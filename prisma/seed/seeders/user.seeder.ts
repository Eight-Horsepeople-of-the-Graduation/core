import { faker } from "@faker-js/faker";
import { Gender } from "../../../src/modules/users/user-gender.enum";
import { signUp } from "../../../src/modules/auth/auth.service";
export async function seedUsers(num: number) {
  console.log(
    "-----------------------------Seeding Users-----------------------------"
  );

  for (let i = 0; i < num; i++) {
    signUp(createRandomUser());
  }

  console.log(`Added ${num} users..`);
}

function createRandomUser() {
  const gender = faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE]);
  const firstName = faker.person.firstName(
    gender.toLowerCase() as "male" | "female"
  );
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const username = faker.internet.userName({ firstName, lastName });

  return {
    name: `${firstName.toLowerCase()} ${lastName.toLowerCase()}`,
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: "password",
    country: faker.location.country(),
    gender,
    birthDate: faker.date.birthdate(),
    joinDate: faker.date.recent({ days: 365, refDate: new Date() }),
    profilePicture: faker.image.avatar(),
    isAdmin: faker.helpers.arrayElement([true, false]),
  };
}
