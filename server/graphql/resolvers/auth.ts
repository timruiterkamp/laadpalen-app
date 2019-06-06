export {};
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

interface Login {
  email: string;
  password: string;
}
module.exports = {
  createUser: (args: any, req: any) => {
    return User.findOne({
      email: args.userInput.email
    })
      .then((user: any) => {
        if (user) {
          throw new Error("User exist already.");
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then((hashedPassword: string) => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        });
        return user.save();
      })
      .then((result: any) => {
        return { ...result._doc, password: null, _id: result.id };
      })
      .catch((err: string) => {
        throw err;
      });
  },
  login: async ({ email, password }: { email: string; password: string }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User does not exist.");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect.");
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "cFokTdiILPLcmTdw4mn1",
      { expiresIn: "1h" }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  }
};
