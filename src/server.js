const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./api/middlewares/rateLimiter');
const sequelize = require('./configs/db');
require('dotenv').config();

const userRoutes = require('./api/routes/user');
const User = require('./api/models/user.model');

const csrfProtection = csrf({ cookie: true, maxAge: 60 * 60 * 8 });
const parseForm = bodyParser.urlencoded({ extended: false });
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(limiter);

sequelize.authenticate().then(() => {
  sequelize.sync({ force: true }).then(() => {
    User.create({
      name: 'tester',
      email: 'test@gmail.com',
      password: 'test',
    });
  }).catch((err) => console.log(err));
}).catch((err) => {
  console.log('error', err);
});

app.use(userRoutes);

const port = process.env.SERVER_PORT;

app.get('/form', csrfProtection, (req, res) => {
  res.send({ csrfToken: req.csrfToken() });
});

app.post('/process', parseForm, csrfProtection, (req, res) => {
  res.send('data is being processed');
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
