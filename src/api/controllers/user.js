/* eslint-disable linebreak-style */
const User = require('../models/user.model');

exports.signUp = async (req, res) => {
  try {
    const record = await User.create(req.body);
    return res.status(200).json({ record, msg: 'Success' });
  } catch (error) {
    return res.status(409).json({ error, msg: 'fail' });
  }
};
