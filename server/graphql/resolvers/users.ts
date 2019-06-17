export {};
const UserModel = require("../../models/user");
const { transformUser } = require("./merge");

module.exports = {
  users: () => {
    return UserModel.find()
      .then((users: any) => {
        return users.map((user: any) => {
          console.log(user);
          return transformUser(user);
        });
      })
      .catch((err: string) => {
        throw err;
      });
  }
};
