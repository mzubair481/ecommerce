/* eslint-disable linebreak-style */
const User = require('../models/user');

exports.signUp = (req, res) => {
  console.log('result', req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.json({
      user,
    });
    return user;
  });
};
