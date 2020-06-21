const sequelize = require('../config/sequelize.config');
const { Sequelize } = require('sequelize');

const CustomerModel = sequelize.define('customer', {
  customerId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  dob: Sequelize.DATE,
  phonenumber: Sequelize.STRING,
  avatar: Sequelize.STRING,
  creditCard: Sequelize.STRING,
  isBlocked: Sequelize.TINYINT,
  email: Sequelize.STRING,
  

},{
  timestamps: false,
  tableName: 'customer',
});

module.exports = CustomerModel;