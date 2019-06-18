"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserModel = require("../../models/user");
var transformUser = require("./merge").transformUser;
module.exports = {
    users: function () {
        return UserModel.find()
            .then(function (users) {
            return users.map(function (user) {
                console.log(user);
                return transformUser(user);
            });
        })
            .catch(function (err) {
            throw err;
        });
    }
};
