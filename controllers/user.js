const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  register : function (req,res) {
    User.findOne({ email: req.body.email })
      .then(function(dataUser) {
        if (dataUser) {
          res.status(201)
            .json({
              message: 'Email already exist'
            })
        } else {
          User.create({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password
            })
            .then(function(dataCreated) {
              res.status(200)
                .json({
                  message: "user sucessfully registered",
                  data: dataCreated
                })
            }).catch(function(err) {
              res.status(201)
                .json({
                  message: 'Internal server error sign up user',
                  err: err
                })
            })
        }
      })
      .catch(function(err) {
        res.status(201)
          .json({
            message: 'Internal server error finding user'
          })
      })
  },

  login : function (req,res) {
    User.findOne({ email: req.body.email })
      .then(dataUser => {
        if (dataUser) {
          let password = bcrypt.compareSync(req.body.password, dataUser.password)
          if (password) {
            let token = jwt.sign({ id: dataUser._id, name: dataUser.name, email: dataUser.email }, process.env.JWT_KEY)
            res.status(200)
              .json({
                message: "User successfully login",
                token: token
              })
          } else {
            res.status(201).json({
              message: 'Wrong password.'
            })
          }
        } else {
          res.status(201)
            .json({ message: 'wrong email or password' })
        }
      })
      .catch(err => {
        res.status(500)
          .json({
            message: 'Internal server error finding user', error : err
          })
      })
  }
}