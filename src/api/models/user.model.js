const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../configs/db');

const User = sequelize.define('user', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Email already in use',
    },
  },
  about: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set(value) {
      // deepcode ignore HardcodedSecret
      const hash = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hash);
      console.log(hash);
    },
  },
});

module.exports = (User);
