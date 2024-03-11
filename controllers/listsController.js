const listService = require("../services/listsServices");

const createList = async (req, res) => {
  const listData = req.body;
  const list = await listService.createList(listData);

  return res.send(list);
};

const listAllLists = async (req, res) => {
  const lists = await listService.getAllLists();

  return res.send(lists);
};

module.exports = {
  createList,
  listAllLists,
};
