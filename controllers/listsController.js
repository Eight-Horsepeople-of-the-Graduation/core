const listServices = require("../services/listsServices");

const createList = async (req, res) => {
    const listData = req.body;
    const list = await listServices.createList(listData);

    return res.send(list);
};

const listAllLists = async (req, res) => {
    const lists = await listServices.getAllLissts();
    return res.send(lists); 
}