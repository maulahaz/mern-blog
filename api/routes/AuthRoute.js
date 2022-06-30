const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");

//--REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//--LOGIN
router.post("/login", async (req, res) => {
  try {
    //--Find valida user:
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.status(400).json("Wrong credential: UserID");

    //--Check the Password of valid User:
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credential: Password");

    //--If User data is validated:
    //---To avoid getting user PASSWORD data, but get all except Password:
    const {password, ...others} = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
