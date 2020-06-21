const sequelize = require('../config/sequelize.config');
const { Sequelize } = require('sequelize');

const OrderModel = sequelize.define('order', {
  orderId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  isDeleted: Sequelize.TINYINT,
  paymentId: Sequelize.STRING,
  dateOrder: Sequelize.DATE,
  message: Sequelize.STRING,
  orderStatus: Sequelize.TINYINT,
  customerId: Sequelize.STRING,
  addressId: Sequelize.STRING,

},{
  timestamps: false,
  tableName: 'order',
});

module.exports = OrderModel;