const sequelize = require('../config/sequelize.config');
const { Sequelize } = require('sequelize');

const CustomerAccountModel = sequelize.define('customeraccount', {
  email: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  password: Sequelize.STRING,
  resetToken: Sequelize.STRING,
  resetTokenExpire: Sequelize.DATE,
  

},{
  timestamps: false,
  tableName: 'customeraccount',
});

module.exports = CustomerAccountModel;