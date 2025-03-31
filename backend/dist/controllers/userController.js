"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getUsers = void 0;
const users_1 = require("../data/users");
const getUsers = (req, res) => {
    res.status(200).json(users_1.users);
};
exports.getUsers = getUsers;
const addUser = (req, res) => {
    const newUser = {
        id: users_1.users.length + 1,
        name: req.body.name,
        email: req.body.email,
        createdAt: new Date(),
    };
    users_1.users.push(newUser);
    res.status(201).json(newUser);
};
exports.addUser = addUser;
