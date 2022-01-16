const RateLimit = require('express-rate-limit');

const limiter = RateLimit({
  windowsMs: 15 * 60 * 100,
  max: 100,
  delayMs: 0,
  message: 'Too many reqs Please try again later :)',
});

module.exports = (limiter);
