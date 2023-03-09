const User = require('../models/userModel');
const bcrypt = require ('bcrypt');
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const UserRegistration = asyncHandler(async (req, res) => {
  const { fullname, password, email, avatarUrl } = req.body;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //create a new user
    const salt = bcrypt.genSaltSync(4);
    const hashpassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({ fullname: fullname, email: email, password: hashpassword, avatarUrl: avatarUrl });
    const token = jwt.sign(
      {
        _id: newUser._id,
      },process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ msg: `Registration was succesfull for ${newUser.fullname}!`, newUser, token });
  } else {
    //user already exist
    throw new Error("User already exist");
  }
});

const getLoggedIn = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body
    
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res.status(404).json({
        msg:'User wasnt found'
      })
    }
    const isVadlidPassword = await bcrypt.compare(password, findUser.password);
    if (!isVadlidPassword) {
      return res.status(404).json({
        msg: 'incorrect login or password'
      })
    }

    const token = jwt.sign(
      {
        _id: findUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({ msg: `User ${findUser.fullname} succesfully logged In`, findUser, token });
  } catch (error) {
    console.log(error)
    res.status(500).json({msg:`Unsuccesfull loggin proccess`})
  }
})

module.exports = { UserRegistration, getLoggedIn }