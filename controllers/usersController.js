const usersService = require("../services/usersService");

const listUsers = async (req, res) => {
  const users = await usersService.getAllUsers();

  return res.send(users);
};

const createUser = async (req, res) => {
  const userData = req.body;

  console.log(`------------
  ${userData}
  ---------------`);

  const user = await usersService.createUser(userData);

  return res.send(user);
};

module.exports = {
  listUsers,
  createUser,
};
