const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;
const requireLogin = require("../middleware/requireLogin")

router.get('/protected',requireLogin, (req, res) => {
  res.send("hello user")
})

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body
  if (!email || !password || !username) {
    return res.status(422).json({ err: "please add all the fields" })
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ err: "user already exist with that email" })
      }

      bcrypt.hash(password, 12)
        .then(hashedpassword => {
          const user = new User({
            email,
            password: hashedpassword,
            username
          })

          user.save()
            .then(user => {
              res.json({ message: "saved succesfully" })
            })
            .catch(err => {
              console.log(err)
            })
        })

    })
    .catch(err => {
      console.log(err)
    })
})

router.post('/signin', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" })
  }

  User.findOne({ email })
    .then(savedUser => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid Email" })
      }
      bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
          if (doMatch) {
            //res.json({ message: "succesfully signed in" })
            const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
            res.json({token})
          } else {
            return res.status(422).json({ error: "Invalid password" })
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
})

module.exports = router