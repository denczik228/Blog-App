const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded?._id;
        //const user = req.userId;
        console.log(req.userId);
        next();
      }
    } catch (error) {
      throw new Error(
        `Unsuccessful authorization, session is timeout - please login`
      );
    }
  } else {
    throw new Error(`No token attached to the header`);
  }
});

module.exports = { authMiddleware };
