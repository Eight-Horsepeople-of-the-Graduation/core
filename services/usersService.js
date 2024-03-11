const prisma = require("../utils/prisma");

const getAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

const createUser = async (userData) => {
  const { username, email, password, country, gender } = userData;

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
      country,
      gender,
    },
  });

  return user;
};

module.exports = {
  getAllUsers,
  createUser,
};