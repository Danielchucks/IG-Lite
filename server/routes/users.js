const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

const User = require("../models/User");
const Post = require("../models/Post");

// @route      POST api/users
// @desc       Register a user
// @access     Public

router.post("/signup", async (req, res) => {
   const { name, email, password } = req.body;
   if (!name || !email || !password) {
      console.log(req.body);
      return res.status(422).json({ error: "Please fill all the fields" });
   }
   // console.log(req.body);

   try {
      let user = await User.findOne({ email });

      if (user) {
         return res
            .status(400)
            .json({ message: "User with the email already exists" });
      }

      // Send verification link or code to the unique provided during registeration

      // create a new instance of a User in the database but have not been save yet
      user = new User({
         name,
         email,
         password,
      });

      // Hashing the  password before saving it
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // save the user in the database
      await user.save();
   } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
   }

   res.status(200).json({ message: "Signed up successfully" });
});

// @route      GET api/users/user/:id
// @desc       To see a particular user's post
// @access     Private

router.get("/user/:id", auth, (req, res) => {
   User.findOne({ _id: req.params.id })
      .select("-password")
      .then((user) => {
         Post.find({ postedBy: req.params.id })
            .populate("postedBy", "_id name")
            .exec((err, posts) => {
               if (err) {
                  return res.status(422).json({ error: err });
               }
               res.json({ user, posts });
            });
      })
      .catch((err) => {
         return res.status(404).json({ error: "User not found" });
      });
});

// @route      PUT api/users/uploadpic
// @desc       To upload a profile picture
// @access     Private
router.put("/uploadpic", auth, (req, res) => {
   User.findByIdAndUpdate(
      req.user._id,
      { $set: { pic: req.body.pic } },
      { new: true },
      (err, result) => {
         if (err) {
            return res
               .status(422)
               .json({ error: "Picture cannot be uploaded" });
         }
         res.json(result);
      }
   );
});

module.exports = router;
