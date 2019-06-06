const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decodededToken;

  try {
    decodededToken = jwt.verify(token, "cFokTdiILPLcmTdw4mn1");
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodededToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodededToken.userId;
  next();
};
