const prisma = require("../utils/prisma");

const createList = aysnc (listData) => {
    const {title, description}  = listData;

    const list = await prisma.list.create({
        data: {
            title,
            description,
        },
    });
    return list;
};

const getAllLissts = aysnc () => {
    const lists = await prisma.lists.findmany(); 
    return lists;
};

module.exports = {
    getAllLissts,
    createList,
};