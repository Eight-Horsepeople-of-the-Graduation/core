const prisma = require("../utils/prisma");

const createList = async (listData) => {
  const { title, description } = listData;

  const list = await prisma.list.create({
    data: {
      title,
      description,
    },
  });

  return list;
};

const getAllLists = async () => {
  const lists = await prisma.list.findMany();

  return lists;
};

module.exports = {
  getAllLists,
  createList,
};
