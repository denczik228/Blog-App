const User = require('../models/userModel');
const bcrypt = require ('bcrypt');

const UserRegistration = async (req, res) => {
  const { fullname, password, email, avatarUrl } = req.body;
     const findUser = await User.findOne({ email: email });
    if (!findUser) {
      //create a new user
      const salt = bcrypt.genSaltSync(4);
      const hashpassword = bcrypt.hashSync(password, salt);

      const newUser = await User.create({ fullname:fullname, email: email, password: hashpassword , avatarUrl: avatarUrl});
      res.json({ msg: `Registration was succesfull for ${newUser.fullname}!`, newUser });
    } else {
      //user already exist
      throw new Error("User already exist");
    }
}

module.exports = { UserRegistration }