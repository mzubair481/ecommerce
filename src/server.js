const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');
require('dotenv').config();

const userRoutes = require('./api/routes/user');

const csrfProtection = csrf({ cookie: true, maxAge: 60 * 60 * 8 });
const parseForm = bodyParser.urlencoded({ extended: false });
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(morgan);

app.use(userRoutes);

const port = process.env.PORT;

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  // eslint-disable-next-line comma-dangle
  useUnifiedTopology: true
}).then(() => console.log('db connected'))
  .catch((err) => {
    console.log(err);
  });

app.get('/form', csrfProtection, (req, res) => {
  res.send({ csrfToken: req.csrfToken() });
});

app.post('/process', parseForm, csrfProtection, (req, res) => {
  res.send('data is being processed');
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
