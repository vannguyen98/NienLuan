const sequelize = require('../config/sequelize.config');
const { Sequelize } = require('sequelize');

const AddressModel = sequelize.define('address', {
  addressId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  address: Sequelize.STRING,
  name: Sequelize.STRING,
  phonenumber: Sequelize.STRING,
  isDeleted: Sequelize.TINYINT,
  customerId: Sequelize.STRING,
  

},{
  timestamps: false,
  tableName: 'address',
});

module.exports = AddressModel;