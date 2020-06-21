const sequelize = require('../config/sequelize.config');
const { Sequelize } = require('sequelize');

const OrderDetailModel = sequelize.define('orderdetail', {
  orderDetailId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
  unitPrice: Sequelize.FLOAT,
  discount: Sequelize.INTEGER,
  productId: Sequelize.STRING,
  orderId: Sequelize.STRING,
  

},{
  timestamps: false,
  tableName: 'orderdetail',
});

module.exports = OrderDetailModel;