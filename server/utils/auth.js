const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET_KEY;
const expirationMax = "2h"; // 2 hours

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expirationMax });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },

  // added flexible variable for expiration
  signToken: function ({ email, _id, isAdmin, isLocked }, expiration) {
    const payload = { email, _id, isAdmin, isLocked };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
