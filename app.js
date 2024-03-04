const { PrismaClient } = require("@prisma/client");
const express = require("express");

const prisma = new PrismaClient();
const app = express();

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { username, email, password, country, gender } = req.body;

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
      country,
      gender,
    },
  });
  res.json(user);
});

const startServer = async () => {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

startServer();
