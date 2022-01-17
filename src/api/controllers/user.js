/* eslint-disable linebreak-style */
const User = require('../models/user.model');

exports.signUp = (req, res) => {
  console.log('result', req.body);
  const user = new User(req.body);
  user.save((err) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.status(200).json({
      user,
    });
    return user;
  });
};
