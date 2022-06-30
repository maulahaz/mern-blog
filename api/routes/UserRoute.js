const router = require("express").Router();
const User = require("../models/Users");
const PostModel = require("../models/Posts");
const bcrypt = require("bcrypt");

//--GET USER ID
router.get("/:id", async (req, res) => {
    try {
        const dtUser = await User.findById(req.params.id);
        //
        //---To avoid getting user PASSWORD data, but get all except Password:
        const {password, ...dtUserExceptPassword} = dtUser._doc;
        res.status(200).json(dtUserExceptPassword);
      } catch (error) {
        res.status(500).json(error);
      }
});

//--UPDATE USER
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

//--DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//--DELETE USER AND ALL POST:
router.delete("/user-post/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    //--Find the User data:
    const dtUser = await User.findById(req.params.id);
    if (dtUser) {
      try {
        //--Delete Data Post:
        await PostModel.deleteMany({ username: dtUser.username });
        //--Delete Data User:
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted!");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

module.exports = router;
