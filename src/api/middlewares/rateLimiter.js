const RateLimit = require('express-rate-limit');

const limitReached = (req, res) => {
  console.log({ ip: req.ip });
  res.status(429).json({ msg: 'Requests limit reached please try again later :)' });
};

const limiter = RateLimit({
  windowsMs: 15 * 60 * 100,
  max: 100,
  delayMs: 0,
  handler: limitReached,
});

module.exports = (limiter);
